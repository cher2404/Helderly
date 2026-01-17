import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Folder, FolderColor } from '../types';
import { dummyFolders } from '../data/dummy';

const FREE_FOLDER_LIMIT = 3;

interface FolderStore {
  folders: Folder[];
  isLoading: boolean;
  userPlan: 'free' | 'pro' | 'together'; // TODO: haal uit user context
  
  // Actions
  updateUserPlan: (plan: 'free' | 'pro' | 'together') => void;
  addFolder: (name: string, color: FolderColor, teamId?: string) => boolean;
  updateFolder: (id: string, updates: Partial<Folder>) => void;
  deleteFolder: (id: string) => void;
  shareFolder: (id: string, teamId: string) => void;
  unshareFolder: (id: string) => void;
  
  // Helpers
  getFolderById: (id: string) => Folder | undefined;
  getAllFolders: () => Folder[];
  getSharedFolders: (teamId?: string) => Folder[];
  getMyFolders: () => Folder[];
  canAddFolder: () => boolean;
  getFolderCount: () => number;
}

export const useFolderStore = create<FolderStore>()(
  persist(
    (set, get) => ({
      folders: dummyFolders,
      isLoading: false,
      userPlan: 'free', // TODO: haal uit auth/user context

      updateUserPlan: (plan) => {
        set({ userPlan: plan });
      },

      addFolder: (name, color, teamId) => {
        if (!get().canAddFolder()) {
          return false;
        }
        
        const newFolder: Folder = {
          id: `folder-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name,
          color,
          isShared: !!teamId,
          teamId: teamId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        set((state) => ({
          folders: [...state.folders, newFolder],
        }));
        
        return true;
      },

      shareFolder: (id, teamId) => {
        set((state) => ({
          folders: state.folders.map((folder) =>
            folder.id === id
              ? { ...folder, isShared: true, teamId, updatedAt: new Date().toISOString() }
              : folder
          ),
        }));
      },

      unshareFolder: (id) => {
        set((state) => ({
          folders: state.folders.map((folder) =>
            folder.id === id
              ? { ...folder, isShared: false, teamId: undefined, updatedAt: new Date().toISOString() }
              : folder
          ),
        }));
      },

      updateFolder: (id, updates) => {
        set((state) => ({
          folders: state.folders.map((folder) =>
            folder.id === id
              ? { ...folder, ...updates, updatedAt: new Date().toISOString() }
              : folder
          ),
        }));
      },

      deleteFolder: (id) => {
        set((state) => ({
          folders: state.folders.filter((folder) => folder.id !== id),
        }));
      },

      getFolderById: (id) => {
        return get().folders.find((folder) => folder.id === id);
      },

      getAllFolders: () => {
        return get().folders;
      },

      canAddFolder: () => {
        const plan = get().userPlan;
        if (plan === 'free') {
          // Bij free plan tellen alleen niet-gedeelde mappen mee
          const myFolders = get().getMyFolders();
          return myFolders.length < FREE_FOLDER_LIMIT;
        }
        return true; // Pro en Together hebben onbeperkt
      },

      getFolderCount: () => {
        return get().folders.length;
      },

      getSharedFolders: (teamId) => {
        const folders = get().folders.filter((f) => f.isShared);
        if (teamId) {
          return folders.filter((f) => f.teamId === teamId);
        }
        return folders;
      },

      getMyFolders: () => {
        return get().folders.filter((f) => !f.isShared);
      },
    }),
    {
      name: 'helderly-folders-storage',
    }
  )
);

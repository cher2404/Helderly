import { create } from 'zustand';
import { Folder, FolderColor } from '../types';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from './authStore';

const FREE_FOLDER_LIMIT = 3;

interface FolderStore {
  folders: Folder[];
  isLoading: boolean;
  isInitialized: boolean;
  userPlan: 'free' | 'pro' | 'together';
  
  // Actions
  loadFolders: () => Promise<void>;
  updateUserPlan: (plan: 'free' | 'pro' | 'together') => Promise<void>;
  addFolder: (name: string, color: FolderColor, teamId?: string) => Promise<boolean>;
  updateFolder: (id: string, updates: Partial<Folder>) => Promise<void>;
  deleteFolder: (id: string) => Promise<void>;
  shareFolder: (id: string, teamId: string) => Promise<void>;
  unshareFolder: (id: string) => Promise<void>;
  
  // Helpers
  getFolderById: (id: string) => Folder | undefined;
  getAllFolders: () => Folder[];
  getSharedFolders: (teamId?: string) => Folder[];
  getMyFolders: () => Folder[];
  canAddFolder: () => boolean;
  getFolderCount: () => number;
}

// Helper to convert database row to Folder
const rowToFolder = (row: any): Folder => {
  return {
    id: row.id,
    name: row.name,
    color: row.color as FolderColor,
    isShared: row.is_shared || false,
    teamId: row.team_id || undefined,
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
  };
};

export const useFolderStore = create<FolderStore>((set, get) => ({
  folders: [],
  isLoading: false,
  isInitialized: false,
  userPlan: 'free',

  loadFolders: async () => {
    const { user } = useAuthStore.getState();
    if (!user) {
      set({ folders: [], isInitialized: true });
      return;
    }

    set({ isLoading: true });
    
    try {
      // Load folders (own + shared)
      const { data, error } = await supabase
        .from('folders')
        .select('*')
        .or(`user_id.eq.${user.id},is_shared.eq.true`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const folders = data ? data.map(rowToFolder) : [];
      
      // Load user profile for plan
      const { data: profile } = await (supabase
        .from('profiles') as any)
        .select('plan')
        .eq('id', user.id)
        .single();

      set({
        folders,
        userPlan: (profile?.plan as 'free' | 'pro' | 'together') || 'free',
        isLoading: false,
        isInitialized: true,
      });
    } catch (error) {
      console.error('Error loading folders:', error);
      set({ isLoading: false, isInitialized: true });
    }
  },

  updateUserPlan: async (plan) => {
    const { user } = useAuthStore.getState();
    if (!user) return;

    try {
      await (supabase
        .from('profiles') as any)
        .update({ plan })
        .eq('id', user.id);
      
      set({ userPlan: plan });
    } catch (error) {
      console.error('Error updating plan:', error);
    }
  },

  addFolder: async (name, color, teamId) => {
    const { user } = useAuthStore.getState();
    if (!user) {
      console.error('Cannot add folder: user not authenticated');
      return false;
    }

    if (!get().canAddFolder()) {
      return false;
    }

    set({ isLoading: true });
    
    try {
      const { data, error } = await (supabase
        .from('folders') as any)
        .insert({
          user_id: user.id,
          name,
          color,
          is_shared: !!teamId,
          team_id: teamId || null,
        })
        .select()
        .single();

      if (error) throw error;

      const newFolder = rowToFolder(data);
      
      set((state) => ({
        folders: [newFolder, ...state.folders],
        isLoading: false,
      }));
      
      return true;
    } catch (error) {
      console.error('Error adding folder:', error);
      set({ isLoading: false });
      return false;
    }
  },

  shareFolder: async (id, teamId) => {
    const { user } = useAuthStore.getState();
    if (!user) return;

    set({ isLoading: true });
    
    try {
      const { data, error } = await (supabase
        .from('folders') as any)
        .update({ is_shared: true, team_id: teamId })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      const updatedFolder = rowToFolder(data);
      
      set((state) => ({
        folders: state.folders.map((folder) =>
          folder.id === id ? updatedFolder : folder
        ),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error sharing folder:', error);
      set({ isLoading: false });
    }
  },

  unshareFolder: async (id) => {
    const { user } = useAuthStore.getState();
    if (!user) return;

    set({ isLoading: true });
    
    try {
      const { data, error } = await (supabase
        .from('folders') as any)
        .update({ is_shared: false, team_id: null })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      const updatedFolder = rowToFolder(data);
      
      set((state) => ({
        folders: state.folders.map((folder) =>
          folder.id === id ? updatedFolder : folder
        ),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error unsharing folder:', error);
      set({ isLoading: false });
    }
  },

  updateFolder: async (id, updates) => {
    const { user } = useAuthStore.getState();
    if (!user) return;

    set({ isLoading: true });
    
    try {
      const row: any = {};
      if (updates.name !== undefined) row.name = updates.name;
      if (updates.color !== undefined) row.color = updates.color;
      if (updates.isShared !== undefined) row.is_shared = updates.isShared;
      if (updates.teamId !== undefined) row.team_id = updates.teamId || null;

      const { data, error } = await (supabase
        .from('folders') as any)
        .update(row)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      const updatedFolder = rowToFolder(data);
      
      set((state) => ({
        folders: state.folders.map((folder) =>
          folder.id === id ? updatedFolder : folder
        ),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error updating folder:', error);
      set({ isLoading: false });
    }
  },

  deleteFolder: async (id) => {
    const { user } = useAuthStore.getState();
    if (!user) return;

    set({ isLoading: true });
    
    try {
      const { error } = await supabase
        .from('folders')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      set((state) => ({
        folders: state.folders.filter((folder) => folder.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error deleting folder:', error);
      set({ isLoading: false });
    }
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
}));

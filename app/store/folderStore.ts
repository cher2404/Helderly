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
      let folders: Folder[] = [];
      
      // Try to load own folders
      try {
        const ownFoldersQuery = supabase.from('folders' as any);
        const ownFoldersResult = await (ownFoldersQuery as any)
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        // Only log if there's actually an error with content (not empty object {})
        const error = ownFoldersResult?.error;
        // Check if error has any enumerable properties - skip empty objects
        if (error && Object.keys(error).length > 0) {
          // Only log if error has message, code, or details
          if (error.message || error.code || error.details) {
            console.error('Own folders query error:', {
              message: error?.message,
              code: error?.code,
              details: error?.details,
              hint: error?.hint,
              fullError: error
            });
          }
        }
        // If empty object {} or no properties, silently ignore (not a real error)
        
        // Use data if available, otherwise empty array (which is fine for new users)
        if (ownFoldersResult?.data) {
          folders = ownFoldersResult.data.map(rowToFolder);
        }
        // If no data, folders stays empty array (initialized above)
      } catch (err: any) {
        console.error('Exception loading own folders:', {
          message: err?.message,
          stack: err?.stack,
          name: err?.name,
          fullError: err
        });
      }
      
      // Try to load shared folders
      try {
        const sharedFoldersQuery = supabase.from('folders' as any);
        const sharedFoldersResult = await (sharedFoldersQuery as any)
          .select('*')
          .eq('is_shared', true)
          .neq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        // Only log if there's actually an error with content (not empty object {})
        const sharedError = sharedFoldersResult?.error;
        // Check if error has any enumerable properties - skip empty objects
        if (sharedError && Object.keys(sharedError).length > 0) {
          // Only log if error has message, code, or details
          if (sharedError.message || sharedError.code || sharedError.details) {
            console.error('Shared folders query error:', {
              message: sharedError?.message,
              code: sharedError?.code,
              details: sharedError?.details,
              hint: sharedError?.hint,
              fullError: sharedError
            });
          }
        }
        // If empty object {} or no properties, silently ignore (not a real error)
        
        // Use data if available
        if (sharedFoldersResult?.data) {
          const sharedFolders = sharedFoldersResult.data.map(rowToFolder);
          folders = [...folders, ...sharedFolders];
        }
        // If no data, that's fine - just continue with existing folders
      } catch (err: any) {
        console.error('Exception loading shared folders:', {
          message: err?.message,
          stack: err?.stack,
          name: err?.name,
          fullError: err
        });
      }
      
      // Load user profile for plan
      const profileQuery = (supabase
        .from('profiles') as any)
        .select('plan')
        .eq('id', user.id)
        .single();
      
      const { data: profile, error: profileError } = await profileQuery;
      
      if (profileError && profileError.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Profile query error:', {
          message: profileError.message,
          details: profileError.details,
          hint: profileError.hint,
          code: profileError.code,
          fullError: profileError
        });
      }

      set({
        folders,
        userPlan: (profile?.plan as 'free' | 'pro' | 'together') || 'free',
        isLoading: false,
        isInitialized: true,
      });
    } catch (error: any) {
      console.error('Error loading folders:', {
        message: error?.message,
        details: error?.details,
        hint: error?.hint,
        code: error?.code,
        errorType: typeof error,
        errorName: error?.name,
        errorStack: error?.stack,
        errorKeys: error ? Object.keys(error) : [],
        fullError: error,
        stringifiedError: JSON.stringify(error, null, 2)
      });
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

import { create } from 'zustand';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';

interface AuthStore {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  initialized: boolean;
  
  // Actions
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
  updateProfile: (updates: { full_name?: string; plan?: 'free' | 'pro' | 'together' }) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  session: null,
  isLoading: false,
  initialized: false,

  initialize: async () => {
    if (get().initialized) return;
    
    set({ isLoading: true });
    
    try {
      // Get current session
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      set({
        user: session?.user ?? null,
        session: session,
        initialized: true,
        isLoading: false,
      });

      // Listen for auth changes
      supabase.auth.onAuthStateChange((_event, session) => {
        set({
          user: session?.user ?? null,
          session: session,
        });
      });
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({ isLoading: false, initialized: true });
    }
  },

  signIn: async (email: string, password: string) => {
    set({ isLoading: true });
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        set({ isLoading: false });
        return { error };
      }

      set({
        user: data.user,
        session: data.session,
        isLoading: false,
      });

      return { error: null };
    } catch (error) {
      set({ isLoading: false });
      return { error: error as Error };
    }
  },

  signUp: async (email: string, password: string, name: string) => {
    set({ isLoading: true });
    
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (authError) {
        set({ isLoading: false });
        return { error: authError };
      }

      if (authData.user) {
        // Create profile
        const profileData = {
          id: authData.user.id,
          email: authData.user.email ?? email,
          full_name: name,
          plan: 'free' as 'free' | 'pro' | 'together',
        };
        const { error: profileError } = await supabase
          .from('profiles')
          .insert(profileData);

        if (profileError) {
          console.error('Profile creation error:', profileError);
          // Continue anyway, profile might already exist
        }

        set({
          user: authData.user,
          session: authData.session,
          isLoading: false,
        });
      }

      return { error: null };
    } catch (error) {
      set({ isLoading: false });
      return { error: error as Error };
    }
  },

  signOut: async () => {
    set({ isLoading: true });
    
    try {
      await supabase.auth.signOut();
      
      set({
        user: null,
        session: null,
        isLoading: false,
      });
    } catch (error) {
      console.error('Sign out error:', error);
      set({ isLoading: false });
    }
  },

  updateProfile: async (updates: { full_name?: string; plan?: 'free' | 'pro' | 'together' }) => {
    const { user } = get();
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  },
}));

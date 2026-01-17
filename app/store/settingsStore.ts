import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';

function applyTheme(theme: Theme) {
  if (typeof window === 'undefined') return;
  
  const root = window.document.documentElement;
  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    root.classList.remove('light', 'dark');
    root.classList.add(systemTheme);
  } else {
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }
}

interface SettingsStore {
  theme: Theme;
  notificationsEnabled: boolean;
  defaultView: 'today' | 'tasks' | 'calendar';
  autoFocus: boolean;
  showCompletedTasks: boolean;
  
  // Actions
  setTheme: (theme: Theme) => void;
  toggleNotifications: () => void;
  setDefaultView: (view: 'today' | 'tasks' | 'calendar') => void;
  setAutoFocus: (enabled: boolean) => void;
  setShowCompletedTasks: (show: boolean) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      theme: 'system',
      notificationsEnabled: true,
      defaultView: 'today',
      autoFocus: false,
      showCompletedTasks: true,

      setTheme: (theme) => {
        set({ theme });
        applyTheme(theme);
      },

      toggleNotifications: () => {
        set((state) => ({ notificationsEnabled: !state.notificationsEnabled }));
      },

      setDefaultView: (view) => {
        set({ defaultView: view });
      },

      setAutoFocus: (enabled) => {
        set({ autoFocus: enabled });
      },

      setShowCompletedTasks: (show) => {
        set({ showCompletedTasks: show });
      },
    }),
    {
      name: 'helderly-settings-storage',
      onRehydrateStorage: () => (state) => {
        // Apply theme after rehydration
        if (state && typeof window !== 'undefined') {
          applyTheme(state.theme);
        }
      },
    }
  )
);

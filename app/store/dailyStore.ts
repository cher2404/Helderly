import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DailyState {
  date: string; // ISO date string (YYYY-MM-DD)
  dailyQuestion: string | null; // Answer to "Wat maakt vandaag geslaagd?"
  selectedFocusTasks: string[]; // Array of task IDs (max 3)
  completedToday: string[]; // Array of completed task IDs today
}

interface DailyStore {
  currentState: DailyState | null;
  
  // Actions
  initDailyState: (date: string) => void;
  setDailyQuestion: (answer: string) => void;
  setSelectedFocusTasks: (taskIds: string[]) => void;
  addCompletedTask: (taskId: string) => void;
  resetDailyState: () => void;
  
  // Helpers
  getCurrentDailyState: () => DailyState | null;
  isTodaySet: () => boolean;
  hasCompletedQuestion: () => boolean;
  hasSelectedFocusTasks: () => boolean;
}

const getTodayDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const useDailyStore = create<DailyStore>()(
  persist(
    (set, get) => ({
      currentState: null,
      
      initDailyState: (date: string) => {
        const today = getTodayDate();
        const currentState = get().currentState;
        
        // If it's a new day or no state exists, reset
        if (!currentState || currentState.date !== today) {
          set({
            currentState: {
              date: today,
              dailyQuestion: null,
              selectedFocusTasks: [],
              completedToday: [],
            },
          });
        }
      },
      
      setDailyQuestion: (answer: string) => {
        const today = getTodayDate();
        const currentState = get().currentState;
        
        // Initialize if needed
        if (!currentState || currentState.date !== today) {
          get().initDailyState(today);
        }
        
        set((state) => ({
          currentState: state.currentState
            ? { ...state.currentState, dailyQuestion: answer, date: today }
            : {
                date: today,
                dailyQuestion: answer,
                selectedFocusTasks: [],
                completedToday: [],
              },
        }));
      },
      
      setSelectedFocusTasks: (taskIds: string[]) => {
        const today = getTodayDate();
        const currentState = get().currentState;
        
        // Initialize if needed
        if (!currentState || currentState.date !== today) {
          get().initDailyState(today);
        }
        
        // Max 3 focus tasks
        const limitedIds = taskIds.slice(0, 3);
        
        set((state) => ({
          currentState: state.currentState
            ? { ...state.currentState, selectedFocusTasks: limitedIds, date: today }
            : {
                date: today,
                dailyQuestion: null,
                selectedFocusTasks: limitedIds,
                completedToday: [],
              },
        }));
      },
      
      addCompletedTask: (taskId: string) => {
        const today = getTodayDate();
        const currentState = get().currentState;
        
        // Initialize if needed
        if (!currentState || currentState.date !== today) {
          get().initDailyState(today);
        }
        
        set((state) => {
          const currentState = state.currentState || {
            date: today,
            dailyQuestion: null,
            selectedFocusTasks: [],
            completedToday: [],
          };
          
          if (!currentState.completedToday.includes(taskId)) {
            return {
              currentState: {
                ...currentState,
                completedToday: [...currentState.completedToday, taskId],
                date: today,
              },
            };
          }
          return state;
        });
      },
      
      resetDailyState: () => {
        set({
          currentState: {
            date: getTodayDate(),
            dailyQuestion: null,
            selectedFocusTasks: [],
            completedToday: [],
          },
        });
      },
      
      getCurrentDailyState: () => {
        const state = get().currentState;
        const today = getTodayDate();
        
        if (!state || state.date !== today) {
          return null;
        }
        
        return state;
      },
      
      isTodaySet: () => {
        const state = get().getCurrentDailyState();
        return state !== null;
      },
      
      hasCompletedQuestion: () => {
        const state = get().getCurrentDailyState();
        return state !== null && state.dailyQuestion !== null && state.dailyQuestion.trim() !== '';
      },
      
      hasSelectedFocusTasks: () => {
        const state = get().getCurrentDailyState();
        return state ? state.selectedFocusTasks.length > 0 : false;
      },
    }),
    {
      name: 'helderly-daily-storage',
    }
  )
);

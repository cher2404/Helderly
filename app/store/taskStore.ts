import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, TaskStatus, TimeOfDay } from '../types';
import { dummyTasks } from '../data/dummy';

interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  
  // Actions
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  
  // Helpers
  getTaskById: (id: string) => Task | undefined;
  getTasksForToday: () => Task[];
  getFocusTasks: () => Task[];
  getAllTasks: () => Task[];
  searchTasks: (query: string) => Task[];
  getTasksByFolder: (folderId: string) => Task[];
  getTasksByDate: (date: Date | string) => Task[];
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: dummyTasks,
      isLoading: false,

      addTask: (taskData) => {
        const newTask: Task = {
          ...taskData,
          id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          tasks: [...state.tasks, newTask],
        }));
      },

      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, ...updates, updatedAt: new Date().toISOString() }
              : task
          ),
        }));
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },

      toggleTaskStatus: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  status: task.status === 'done' ? 'todo' : 'done',
                  updatedAt: new Date().toISOString(),
                }
              : task
          ),
        }));
      },

      getTaskById: (id) => {
        return get().tasks.find((task) => task.id === id);
      },

      getTasksForToday: () => {
        const today = new Date().toISOString().split('T')[0];
        return get().tasks.filter((task) => {
          if (!task.dueDate) return true;
          const taskDate = new Date(task.dueDate).toISOString().split('T')[0];
          return taskDate === today;
        });
      },

      getFocusTasks: () => {
        return get().tasks.filter(
          (task) => task.status === 'todo' || task.status === 'in-progress'
        );
      },

      getAllTasks: () => {
        return get().tasks;
      },

      searchTasks: (query) => {
        const lowerQuery = query.toLowerCase();
        return get().tasks.filter((task) =>
          task.title.toLowerCase().includes(lowerQuery) ||
          task.description?.toLowerCase().includes(lowerQuery) ||
          task.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
        );
      },

      getTasksByFolder: (folderId) => {
        return get().tasks.filter((task) => task.folderId === folderId);
      },

      getTasksByDate: (date) => {
        const targetDate = typeof date === 'string' ? date : date.toISOString().split('T')[0];
        return get().tasks.filter((task) => {
          if (!task.dueDate) return false;
          const taskDate = new Date(task.dueDate).toISOString().split('T')[0];
          return taskDate === targetDate;
        });
      },
    }),
    {
      name: 'helderly-tasks-storage',
    }
  )
);

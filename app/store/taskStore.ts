import { create } from 'zustand';
import { Task, TaskStatus, TimeOfDay } from '../types';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from './authStore';

interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  isInitialized: boolean;
  
  // Actions
  loadTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskStatus: (id: string) => Promise<void>;
  
  // Helpers
  getTaskById: (id: string) => Task | undefined;
  getTasksForToday: () => Task[];
  getFocusTasks: () => Task[];
  getAllTasks: () => Task[];
  searchTasks: (query: string) => Task[];
  getTasksByFolder: (folderId: string) => Task[];
  getTasksByDate: (date: Date | string) => Task[];
}

// Helper to convert database row to Task
const rowToTask = (row: any): Task => {
  return {
    id: row.id,
    title: row.title,
    description: row.description || undefined,
    status: row.status as TaskStatus,
    timeOfDay: row.time_of_day as TimeOfDay,
    dueDate: row.due_date ? new Date(row.due_date).toISOString() : undefined,
    folderId: row.folder_id || undefined,
    priority: row.priority || undefined,
    energy: row.energy || undefined,
    recurrence: row.recurrence ? JSON.parse(JSON.stringify(row.recurrence)) : undefined,
    tags: row.tags || undefined,
    estimatedMinutes: row.estimated_minutes || undefined,
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
  };
};

// Helper to convert Task to database insert/update
const taskToRow = (task: Partial<Task>, userId: string) => {
  return {
    user_id: userId,
    title: task.title,
    description: task.description || null,
    status: task.status || 'todo',
    due_date: task.dueDate ? new Date(task.dueDate).toISOString() : null,
    time_of_day: task.timeOfDay || null,
    folder_id: task.folderId || null,
    priority: task.priority || null,
    energy: task.energy || null,
    recurrence: task.recurrence ? task.recurrence : null,
    tags: task.tags || null,
    estimated_minutes: task.estimatedMinutes || null,
  };
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  isLoading: false,
  isInitialized: false,

  loadTasks: async () => {
    const { user } = useAuthStore.getState();
    if (!user) {
      set({ tasks: [], isInitialized: true });
      return;
    }

    set({ isLoading: true });
    
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const tasks = data ? data.map(rowToTask) : [];
      
      set({
        tasks,
        isLoading: false,
        isInitialized: true,
      });
    } catch (error) {
      console.error('Error loading tasks:', error);
      set({ isLoading: false, isInitialized: true });
    }
  },

  addTask: async (taskData) => {
    const { user } = useAuthStore.getState();
    if (!user) {
      console.error('Cannot add task: user not authenticated');
      return;
    }

    set({ isLoading: true });
    
    try {
      const row = taskToRow(taskData, user.id);
      
      const { data, error } = await supabase
        .from('tasks')
        .insert(row)
        .select()
        .single();

      if (error) throw error;

      const newTask = rowToTask(data);
      
      set((state) => ({
        tasks: [newTask, ...state.tasks],
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error adding task:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  updateTask: async (id, updates) => {
    const { user } = useAuthStore.getState();
    if (!user) return;

    set({ isLoading: true });
    
    try {
      const row: any = {};
      
      if (updates.title !== undefined) row.title = updates.title;
      if (updates.description !== undefined) row.description = updates.description || null;
      if (updates.status !== undefined) row.status = updates.status;
      if (updates.dueDate !== undefined) row.due_date = updates.dueDate ? new Date(updates.dueDate).toISOString() : null;
      if (updates.timeOfDay !== undefined) row.time_of_day = updates.timeOfDay || null;
      if (updates.folderId !== undefined) row.folder_id = updates.folderId || null;
      if (updates.priority !== undefined) row.priority = updates.priority || null;
      if (updates.energy !== undefined) row.energy = updates.energy || null;
      if (updates.recurrence !== undefined) row.recurrence = updates.recurrence || null;
      if (updates.tags !== undefined) row.tags = updates.tags || null;
      if (updates.estimatedMinutes !== undefined) row.estimated_minutes = updates.estimatedMinutes || null;

      const { data, error } = await supabase
        .from('tasks')
        .update(row)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      const updatedTask = rowToTask(data);
      
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? updatedTask : task
        ),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error updating task:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  deleteTask: async (id) => {
    const { user } = useAuthStore.getState();
    if (!user) return;

    set({ isLoading: true });
    
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error deleting task:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  toggleTaskStatus: async (id) => {
    const task = get().getTaskById(id);
    if (!task) return;

    const newStatus: TaskStatus = task.status === 'done' ? 'todo' : 'done';
    await get().updateTask(id, { status: newStatus });
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
}));

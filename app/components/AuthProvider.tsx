'use client';

import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useTaskStore } from '../store/taskStore';
import { useFolderStore } from '../store/folderStore';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { initialize, user } = useAuthStore();
  const { loadTasks, isInitialized: tasksInitialized } = useTaskStore();
  const { loadFolders } = useFolderStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  // Load data when user logs in
  useEffect(() => {
    if (user) {
      if (!tasksInitialized) {
        loadTasks();
      }
      loadFolders();
    }
  }, [user, loadTasks, loadFolders, tasksInitialized]);

  return <>{children}</>;
}

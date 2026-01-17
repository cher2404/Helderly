'use client';

import { useEffect } from 'react';
import { useTaskStore } from '../store/taskStore';
import { useNotificationStore } from '../store/notificationStore';

export function useTaskNotifications() {
  const { getAllTasks } = useTaskStore();
  const { addNotification, notifications } = useNotificationStore();

  useEffect(() => {
    const checkTaskDeadlines = () => {
      const tasks = getAllTasks();
      const now = new Date();
      const oneDayFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

      tasks.forEach((task) => {
        if (!task.dueDate || task.status === 'done') return;

        const dueDate = new Date(task.dueDate);
        const timeDiff = dueDate.getTime() - now.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        // Check if we should create a notification by looking at task title in existing notifications
        const existingNotification3d = notifications.find(
          (n) => n.taskId === task.id && n.message.includes('over 3 dagen')
        );
        const existingNotification1d = notifications.find(
          (n) => n.taskId === task.id && n.message.includes('is morgen')
        );
        const existingOverdue = notifications.find(
          (n) => n.taskId === task.id && n.type === 'task_due' && n.title === 'Deadline verstreken'
        );

        // Notify 3 days before
        if (daysDiff === 3 && daysDiff > 0 && !existingNotification3d) {
          addNotification({
            type: 'deadline_approaching',
            title: 'Deadline nadert',
            message: `"${task.title}" is over ${daysDiff} dagen`,
            taskId: task.id,
          });
        }

        // Notify 1 day before
        if (daysDiff === 1 && daysDiff > 0 && !existingNotification1d) {
          addNotification({
            type: 'deadline_approaching',
            title: 'Deadline morgen',
            message: `"${task.title}" is morgen`,
            taskId: task.id,
          });
        }

        // Notify if overdue (only once per day)
        if (timeDiff < 0 && daysDiff < 0 && !existingOverdue) {
          addNotification({
            type: 'task_due',
            title: 'Deadline verstreken',
            message: `"${task.title}" was ${Math.abs(daysDiff)} dag(en) geleden`,
            taskId: task.id,
          });
        }
      });
    };

    // Check immediately
    checkTaskDeadlines();

    // Check every hour
    const interval = setInterval(checkTaskDeadlines, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [getAllTasks, addNotification, notifications]);
}

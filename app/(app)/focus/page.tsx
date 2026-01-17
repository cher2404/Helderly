'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTaskStore } from '../../store/taskStore';
import { useDailyStore } from '../../store/dailyStore';
import LaterSheet from '../../components/LaterSheet';

export default function FocusPage() {
  const router = useRouter();
  const { getFocusTasks, updateTask, toggleTaskStatus, getTaskById } = useTaskStore();
  const { getCurrentDailyState, addCompletedTask } = useDailyStore();
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [isLaterSheetOpen, setIsLaterSheetOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get daily selected focus tasks, or fallback to all focus tasks
  const dailyState = mounted ? getCurrentDailyState() : null;
  const allFocusTasks = mounted ? getFocusTasks() : [];
  
  // If user has selected focus tasks for today, use those; otherwise use all focus tasks
  const focusTasks = mounted && dailyState && dailyState.selectedFocusTasks.length > 0
    ? dailyState.selectedFocusTasks
        .map((taskId) => getTaskById(taskId))
        .filter((task): task is NonNullable<typeof task> => task !== undefined && task.status !== 'done')
    : allFocusTasks;

  // Ensure currentTaskIndex is within bounds and redirect if no tasks
  useEffect(() => {
    if (!mounted) return;
    
    if (focusTasks.length === 0) {
      router.push('/today');
      return;
    }
    
    if (currentTaskIndex >= focusTasks.length) {
      // Index out of bounds, go back to today
      router.push('/today');
    }
  }, [mounted, focusTasks.length, currentTaskIndex, router]);

  if (focusTasks.length === 0) {
    return (
      <div className="app-bg">
        <div className="min-h-screen max-w-2xl mx-auto px-4 py-6 pb-24 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-500">Geen focus taken beschikbaar</p>
        </div>
      </div>
    );
  }

  // Ensure we have a valid task
  const currentTask = focusTasks[currentTaskIndex];
  const hasNextTask = currentTaskIndex < focusTasks.length - 1;

  // Safety check - should not happen but prevents crash
  if (!currentTask) {
    return (
      <div className="app-bg">
        <div className="min-h-screen max-w-2xl mx-auto px-4 py-6 pb-24 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-500">Taak niet gevonden</p>
        </div>
      </div>
    );
  }

  const handleDone = () => {
    if (!currentTask) return;
    
    toggleTaskStatus(currentTask.id);
    addCompletedTask(currentTask.id);
    
    // When task is marked done, it's removed from focusTasks
    // So we stay on the same index (next task moves up)
    // The useEffect will handle index adjustments if needed
    
    // If this was the last selected focus task, go back to today
    if (dailyState && dailyState.selectedFocusTasks.length === 1) {
      setTimeout(() => {
        router.push('/today');
      }, 500);
    }
  };

  const handleLaterToday = () => {
    if (!currentTask) return;
    
    const now = new Date();
    
    // If it's already past 18:00, move to tomorrow instead
    const targetDate = now.getHours() >= 18 
      ? new Date(now.getTime() + 24 * 60 * 60 * 1000)
      : now;

    updateTask(currentTask.id, {
      dueDate: targetDate.toISOString(),
      timeOfDay: 'evening',
    });

    // When task is moved, it might be removed from today's focus tasks
    // The useEffect will handle if we need to adjust or redirect
  };

  const handleTomorrow = () => {
    if (!currentTask) return;
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0); // 09:00 tomorrow

    updateTask(currentTask.id, {
      dueDate: tomorrow.toISOString(),
      timeOfDay: 'morning',
    });

    // When task is moved to tomorrow, it's removed from today's focus tasks
    // The useEffect will handle if we need to adjust or redirect
  };

  return (
    <div className="app-bg">
      <div className="min-h-screen max-w-2xl mx-auto px-4 py-6 pb-24 flex flex-col">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => router.push('/today')}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            aria-label="Terug"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {currentTaskIndex + 1} / {focusTasks.length}
          </div>
        </div>

        {/* Task */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-md">
            <div className="mb-12 text-center">
              <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 leading-tight">
                {currentTask.title}
              </h1>
              {currentTask.description && (
                <p className="text-base text-gray-600 dark:text-gray-400 mt-4">
                  {currentTask.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2 mt-8">
          <button
            onClick={handleDone}
            className="w-full px-5 py-3 rounded-lg bg-[#8C46E0] text-white text-base font-medium hover:bg-[#7B3FD0] transition-colors"
          >
            Klaar
          </button>
          <button
            onClick={() => setIsLaterSheetOpen(true)}
            className="w-full px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-foreground text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          >
            Later
          </button>
        </div>
      </div>

      {/* Later Sheet */}
      <LaterSheet
        isOpen={isLaterSheetOpen}
        onClose={() => setIsLaterSheetOpen(false)}
        onLaterToday={handleLaterToday}
        onTomorrow={handleTomorrow}
      />
    </div>
  );
}

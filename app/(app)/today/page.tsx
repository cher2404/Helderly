'use client';

import { useState, useEffect } from 'react';
import { useTaskStore } from '../../store/taskStore';
import { useAuthStore } from '../../store/authStore';
import QuickAdd from '../../components/QuickAdd';
import TaskList from '../../components/TaskList';
import FocusCTA from '../../components/FocusCTA';
import TaskEditPanel from '../../components/TaskEditPanel';
import NotificationBell from '../../components/NotificationBell';
import { useTaskNotifications } from '../../hooks/useTaskNotifications';
import Onboarding from '../../components/Onboarding';
import DailyStart from '../../components/DailyStart';
import { useDailyStore } from '../../store/dailyStore';

export default function TodayPage() {
  const { tasks, addTask, getTasksForToday, getFocusTasks, isLoading, loadTasks, isInitialized } = useTaskStore();
  const { user } = useAuthStore();
  const { initDailyState, hasCompletedQuestion, hasSelectedFocusTasks, getCurrentDailyState } = useDailyStore();
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showDailyStart, setShowDailyStart] = useState(false);

  // Prevent hydration mismatch by only rendering client-side
  useEffect(() => {
    setMounted(true);
    
    // Load tasks if user is logged in and tasks not yet loaded
    if (user && !isInitialized && !isLoading) {
      loadTasks();
    }
    // Check if onboarding should be shown
    const hasCompletedOnboarding = localStorage.getItem('helderly-onboarding-completed');
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
      return;
    }
    
    // Initialize daily state for today
    const today = new Date().toISOString().split('T')[0];
    initDailyState(today);
    
    // Check if daily start flow should be shown
    const dailyState = getCurrentDailyState();
    if (!dailyState || !hasCompletedQuestion() || !hasSelectedFocusTasks()) {
      setShowDailyStart(true);
    }
  }, [initDailyState, hasCompletedQuestion, hasSelectedFocusTasks, getCurrentDailyState]);

  // Setup task notifications
  useTaskNotifications();

  const todayTasks = mounted ? getTasksForToday() : [];
  const dailyState = mounted ? getCurrentDailyState() : null;
  
  // Get selected focus tasks if available, otherwise use all focus tasks
  const selectedFocusTaskIds = dailyState?.selectedFocusTasks || [];
  const selectedFocusTasks = mounted && selectedFocusTaskIds.length > 0
    ? selectedFocusTaskIds
        .map((id) => todayTasks.find((t) => t.id === id))
        .filter((task): task is NonNullable<typeof task> => task !== undefined && task.status !== 'done')
    : mounted ? getFocusTasks().filter((task) => 
        todayTasks.some((t) => t.id === task.id)
      ) : [];
  
  // Tasks that are not in focus (for visual fading)
  const nonFocusTasks = todayTasks.filter(
    (task) => !selectedFocusTaskIds.includes(task.id) && task.status !== 'done'
  );

  const handleAddTask = (title: string) => {
    addTask({
      title,
      status: 'todo',
      timeOfDay: null,
    });
  };

  const handleTaskClick = (taskId: string) => {
    setEditingTaskId(taskId);
  };

  if (!mounted || isLoading) {
    return (
      <div className="app-bg">
        <div className="min-h-screen max-w-2xl mx-auto px-4 py-6 pb-24 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-500">Laden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-bg">
      {showOnboarding && <Onboarding onComplete={() => setShowOnboarding(false)} />}
      {!showOnboarding && showDailyStart && (
        <DailyStart onComplete={() => setShowDailyStart(false)} />
      )}
      {!showOnboarding && !showDailyStart && (
      <div className="min-h-screen max-w-2xl mx-auto px-4 py-8 pb-32">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-6 relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8C46E0] to-[#7B3FD0] flex items-center justify-center shadow-md shadow-[#8C46E0]/20">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-semibold text-foreground tracking-tight">Vandaag</h1>
              </div>
              <NotificationBell />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 ml-[52px]">
              {todayTasks.length === 0
                ? 'Geen taken gepland'
                : `${todayTasks.filter((t) => t.status !== 'done').length} open • ${todayTasks.filter((t) => t.status === 'done').length} voltooid`}
            </p>
          </div>
          
          {/* Progress bar */}
          {todayTasks.length > 0 && (
            <div className="mb-6 relative">
              <div className="h-2 bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-[#8C46E0] via-[#A569F0] to-[#8C46E0] rounded-full transition-all duration-500 ease-out shadow-sm relative overflow-hidden"
                  style={{ 
                    width: `${(todayTasks.filter((t) => t.status === 'done').length / todayTasks.length) * 100}%` 
                  }}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 text-center">
                {Math.round((todayTasks.filter((t) => t.status === 'done').length / todayTasks.length) * 100)}% voltooid
              </p>
            </div>
          )}
        </header>

        {/* Quick Add */}
        <div className="mb-6">
          <QuickAdd onAdd={handleAddTask} />
        </div>

        {/* Daily Question Reminder */}
        {dailyState?.dailyQuestion && dailyState.dailyQuestion.trim() && (
          <div className="mb-6 p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/50 dark:border-purple-900/30">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Vandaag:</p>
            <p className="text-base font-medium text-foreground">{dailyState.dailyQuestion}</p>
          </div>
        )}

        {/* Focus CTA */}
        {selectedFocusTasks.length > 0 && (
          <div className="mb-10">
            <FocusCTA focusTaskCount={selectedFocusTasks.length} />
          </div>
        )}

        {/* Task List */}
        {todayTasks.length === 0 ? (
          <div className="w-full p-12 rounded-2xl bg-gradient-to-br from-gray-50 to-purple-50/30 dark:from-gray-950 dark:to-purple-950/10 border border-gray-200 dark:border-gray-800 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#8C46E0]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-400/5 rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#8C46E0]/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#8C46E0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-base font-medium mb-2">
                Geen taken gepland voor vandaag
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm">
                Voeg een taak toe om te beginnen
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Selected Focus Tasks - Prominent */}
            {selectedFocusTasks.length > 0 && (
              <div>
                <h2 className="text-sm font-medium text-foreground mb-3">Focus voor vandaag</h2>
                <TaskList tasks={selectedFocusTasks} onTaskClick={handleTaskClick} />
              </div>
            )}
            
            {/* Other Tasks - Visually faded if focus tasks exist */}
            {nonFocusTasks.length > 0 && (
              <div className={selectedFocusTasks.length > 0 ? 'opacity-40' : ''}>
                {selectedFocusTasks.length > 0 && (
                  <h2 className="text-sm font-medium text-gray-500 dark:text-gray-500 mb-3">Andere taken</h2>
                )}
                <TaskList tasks={nonFocusTasks} onTaskClick={handleTaskClick} />
              </div>
            )}
            
            {/* Completed Tasks */}
            {todayTasks.filter((t) => t.status === 'done').length > 0 && (
              <div className="opacity-50">
                <h2 className="text-sm font-medium text-gray-500 dark:text-gray-500 mb-3">Voltooid</h2>
                <TaskList 
                  tasks={todayTasks.filter((t) => t.status === 'done')} 
                  onTaskClick={handleTaskClick} 
                />
              </div>
            )}
          </div>
        )}
      </div>
      )}

      {/* Edit Panel */}
      <TaskEditPanel
        taskId={editingTaskId}
        isOpen={editingTaskId !== null}
        onClose={() => setEditingTaskId(null)}
      />
    </div>
  );
}

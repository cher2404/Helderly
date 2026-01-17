'use client';

import { useState, useEffect } from 'react';
import { useTaskStore } from '../../store/taskStore';
import { useRouter } from 'next/navigation';
import { Task } from '../../types';
import TaskEditPanel from '../../components/TaskEditPanel';
import QuickAddSheet from '../../components/QuickAddSheet';
import DayDetailSheet from '../../components/DayDetailSheet';

type ViewMode = 'week' | 'month';

export default function CalendarPage() {
  const router = useRouter();
  const { getAllTasks, getTasksByDate, addTask, updateTask } = useTaskStore();
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [isDayDetailOpen, setIsDayDetailOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getWeekDates = (date: Date) => {
    const week: Date[] = [];
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Maandag als eerste dag
    const monday = new Date(date.setDate(diff));
    
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      week.push(d);
    }
    
    return week;
  };

  const getMonthDates = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const adjustedStart = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1; // Maandag = 0
    
    const days: (Date | null)[] = [];
    
    // Lege dagen voor de eerste week
    for (let i = 0; i < adjustedStart; i++) {
      days.push(null);
    }
    
    // Dagen van de maand
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date | null) => {
    if (!date) return false;
    return date.getMonth() === currentDate.getMonth();
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsDayDetailOpen(true);
  };

  const handleTaskInCalendarClick = (task: Task, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingTaskId(task.id);
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' });
  };

  const formatWeekRange = (dates: Date[]) => {
    const first = dates[0];
    const last = dates[dates.length - 1];
    if (first.getMonth() === last.getMonth()) {
      return `${first.getDate()} - ${last.getDate()} ${first.toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' })}`;
    }
    return `${first.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })} - ${last.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' })}`;
  };

  if (!mounted) {
    return (
      <div className="app-bg">
        <div className="min-h-screen max-w-2xl mx-auto px-4 py-8 pb-32 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-500">Laden...</p>
        </div>
      </div>
    );
  }

  const weekDates = getWeekDates(new Date(currentDate));
  const monthDates = getMonthDates(currentDate);
  const dayNames = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];

  return (
    <div className="app-bg">
      <div className="min-h-screen max-w-2xl mx-auto px-4 py-8 pb-32">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8C46E0] to-[#7B3FD0] flex items-center justify-center shadow-md shadow-[#8C46E0]/20">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-semibold text-foreground tracking-tight">Kalender</h1>
            </div>
            <button
              onClick={goToToday}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:border-[#8C46E0] hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-colors shadow-sm"
            >
              Vandaag
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2 mb-6">
            {(['week', 'month'] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === mode
                    ? 'bg-[#8C46E0] text-white hover:bg-[#7B3FD0]'
                    : 'bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:border-gray-400 dark:hover:border-gray-600'
                }`}
              >
                {mode === 'week' ? 'Week' : 'Maand'}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => viewMode === 'week' ? navigateWeek('prev') : navigateMonth('prev')}
              className="touch-target p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              aria-label="Vorige"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-lg font-semibold text-foreground">
              {viewMode === 'week' ? formatWeekRange(weekDates) : formatMonthYear(currentDate)}
            </h2>
            <button
              onClick={() => viewMode === 'week' ? navigateWeek('next') : navigateMonth('next')}
              className="touch-target p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              aria-label="Volgende"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </header>

        {/* Week View */}
        {viewMode === 'week' && (
          <div className="space-y-3">
            <div className="grid grid-cols-7 gap-2 mb-3">
              {dayNames.map((day, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-2">
                    {day}
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {weekDates.map((date, index) => {
                const tasks = getTasksByDate(date);
                const isTodayDate = isToday(date);
                
                return (
                  <button
                    key={index}
                    onClick={() => handleDayClick(date)}
                    className={`min-h-[120px] p-3 rounded-lg border transition-colors text-left hover:border-gray-300 dark:hover:border-gray-700 cursor-pointer ${
                      isTodayDate
                        ? 'bg-purple-50 dark:bg-purple-950/20 border-[#8C46E0] dark:border-purple-800'
                        : 'bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`text-sm font-semibold ${isTodayDate ? 'text-[#8C46E0]' : 'text-foreground'}`}>
                        {date.getDate()}
                      </div>
                      {tasks.length > 0 && (
                        <span className="text-xs font-medium text-[#8C46E0] bg-purple-100 dark:bg-purple-950/30 px-2 py-0.5 rounded-full">
                          {tasks.length}
                        </span>
                      )}
                    </div>
                    <div className="space-y-1">
                      {tasks.slice(0, 3).map((task) => (
                        <div
                          key={task.id}
                          onClick={(e) => handleTaskInCalendarClick(task, e)}
                          className={`text-xs px-2 py-1 rounded-md truncate cursor-pointer hover:opacity-80 transition-opacity ${
                            task.status === 'done'
                              ? 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 line-through'
                              : 'bg-purple-100 dark:bg-purple-950/30 text-[#8C46E0] dark:text-purple-300'
                          }`}
                        >
                          {task.title}
                        </div>
                      ))}
                      {tasks.length > 3 && (
                        <div className="text-xs text-gray-500 dark:text-gray-500">
                          +{tasks.length - 3} meer
                        </div>
                      )}
                      {tasks.length === 0 && (
                        <div className="text-xs text-gray-400 dark:text-gray-600 mt-2">
                          Klik om te plannen
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Month View */}
        {viewMode === 'month' && (
          <div className="space-y-3">
            <div className="grid grid-cols-7 gap-1.5 mb-2">
              {dayNames.map((day, index) => (
                <div key={index} className="text-center py-2">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider">
                    {day}
                  </span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {monthDates.map((date, index) => {
                if (!date) {
                  return <div key={index} className="min-h-[80px]" />;
                }
                
                const tasks = getTasksByDate(date);
                const isTodayDate = isToday(date);
                const isCurrentMonthDate = isCurrentMonth(date);
                
                return (
                  <button
                    key={index}
                    onClick={() => handleDayClick(date)}
                    className={`min-h-[80px] p-2 rounded-lg border transition-colors text-left hover:border-gray-300 dark:hover:border-gray-700 cursor-pointer ${
                      isTodayDate
                        ? 'bg-purple-50 dark:bg-purple-950/20 border-[#8C46E0] dark:border-purple-800'
                        : isCurrentMonthDate
                        ? 'bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800'
                        : 'bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-900 opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className={`text-sm font-semibold ${isTodayDate ? 'text-[#8C46E0]' : isCurrentMonthDate ? 'text-foreground' : 'text-gray-400'}`}>
                        {date.getDate()}
                      </div>
                      {tasks.length > 0 && (
                        <span className="text-[10px] font-medium text-[#8C46E0] bg-purple-100 dark:bg-purple-950/30 px-1.5 py-0.5 rounded-full">
                          {tasks.length}
                        </span>
                      )}
                    </div>
                    <div className="space-y-0.5">
                      {tasks.slice(0, 2).map((task) => (
                        <div
                          key={task.id}
                          onClick={(e) => handleTaskInCalendarClick(task, e)}
                          className={`text-[10px] px-1.5 py-0.5 rounded truncate cursor-pointer hover:opacity-80 transition-opacity ${
                            task.status === 'done'
                              ? 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                              : 'bg-purple-100 dark:bg-purple-950/30 text-[#8C46E0] dark:text-purple-300'
                          }`}
                        >
                          {task.title}
                        </div>
                      ))}
                      {tasks.length > 2 && (
                        <div className="text-[10px] text-gray-500 dark:text-gray-500">
                          +{tasks.length - 2}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Day Detail Sheet */}
      <DayDetailSheet
        isOpen={isDayDetailOpen}
        date={selectedDate}
        onClose={() => {
          setIsDayDetailOpen(false);
          setSelectedDate(null);
        }}
        onTaskClick={setEditingTaskId}
      />

      {/* Edit Panel */}
      <TaskEditPanel
        taskId={editingTaskId}
        isOpen={editingTaskId !== null}
        onClose={() => setEditingTaskId(null)}
      />
    </div>
  );
}

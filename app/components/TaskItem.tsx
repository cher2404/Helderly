'use client';

import { Task } from '../types';
import { useTaskStore } from '../store/taskStore';
import { useFolderStore } from '../store/folderStore';

interface TaskItemProps {
  task: Task;
  onTaskClick: (id: string) => void;
}

const timeOfDayLabels: Record<string, string> = {
  morning: 'Ochtend',
  afternoon: 'Middag',
  evening: 'Avond',
};

const FOLDER_COLORS: Record<string, { bg: string; text: string }> = {
  blue: { bg: 'bg-blue-100 dark:bg-blue-950/30', text: 'text-blue-700 dark:text-blue-300' },
  purple: { bg: 'bg-purple-100 dark:bg-purple-950/30', text: 'text-purple-700 dark:text-purple-300' },
  green: { bg: 'bg-green-100 dark:bg-green-950/30', text: 'text-green-700 dark:text-green-300' },
  orange: { bg: 'bg-orange-100 dark:bg-orange-950/30', text: 'text-orange-700 dark:text-orange-300' },
  pink: { bg: 'bg-pink-100 dark:bg-pink-950/30', text: 'text-pink-700 dark:text-pink-300' },
  gray: { bg: 'bg-gray-100 dark:bg-gray-950/30', text: 'text-gray-700 dark:text-gray-300' },
};

export default function TaskItem({ task, onTaskClick }: TaskItemProps) {
  const { toggleTaskStatus } = useTaskStore();
  const { getFolderById } = useFolderStore();
  const isDone = task.status === 'done';
  const folder = task.folderId ? getFolderById(task.folderId) : null;
  const folderColor = folder ? FOLDER_COLORS[folder.color] : null;

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleTaskStatus(task.id);
  };

  const handleContentClick = () => {
    onTaskClick(task.id);
  };

  return (
    <div className="relative flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:border-[#8C46E0]/30 dark:hover:border-purple-800/50 hover:shadow-md hover:shadow-[#8C46E0]/5 transition-all duration-300 group cursor-pointer overflow-hidden">
      {/* Left accent bar */}
      {!isDone && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#8C46E0] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#8C46E0]/0 via-[#8C46E0]/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="flex-shrink-0 mt-0.5 relative z-10">
        <button
          onClick={handleCheckboxClick}
          className={`relative w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
            isDone
              ? 'bg-[#8C46E0] border-[#8C46E0] shadow-md shadow-[#8C46E0]/30'
              : 'border-gray-300 dark:border-gray-600 hover:border-[#8C46E0] hover:bg-[#8C46E0]/5 group-hover:scale-110'
          }`}
          aria-label={isDone ? 'Taak ongedaan maken' : 'Taak voltooien'}
        >
          {isDone && (
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>
      </div>

      <div
        className="flex-1 min-w-0 cursor-pointer relative z-10"
        onClick={handleContentClick}
      >
        <h3
          className={`text-sm font-medium transition-colors duration-200 ${
            isDone
              ? 'line-through text-gray-400 dark:text-gray-600'
              : 'text-foreground group-hover:text-[#8C46E0] dark:group-hover:text-purple-400'
          }`}
        >
          {task.title}
        </h3>
        {task.description && (
          <p
            className={`text-xs mt-1.5 leading-relaxed ${
              isDone
                ? 'text-gray-400 dark:text-gray-600'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            {task.description}
          </p>
        )}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {task.timeOfDay && (
            <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-900/50 shadow-sm">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {timeOfDayLabels[task.timeOfDay]}
            </span>
          )}
          {folder && folderColor && (
            <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md ${folderColor.bg} ${folderColor.text} border border-current/10 shadow-sm`}>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              {folder.name}
            </span>
          )}
          {task.recurrence && task.recurrence.type && (
            <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950/30 dark:to-pink-950/30 text-[#8C46E0] dark:text-purple-300 border border-purple-200/50 dark:border-purple-900/50 shadow-sm">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {task.recurrence.type === 'daily' && 'Dagelijks'}
              {task.recurrence.type === 'weekly' && 'Wekelijks'}
              {task.recurrence.type === 'monthly' && 'Maandelijks'}
              {task.recurrence.type === 'yearly' && 'Jaarlijks'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

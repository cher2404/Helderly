'use client';

import { useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import { Task } from '../types';
import TaskEditPanel from './TaskEditPanel';
import QuickAdd from './QuickAdd';

interface DayDetailSheetProps {
  isOpen: boolean;
  date: Date | null;
  onClose: () => void;
  onTaskClick: (taskId: string) => void;
}

export default function DayDetailSheet({ isOpen, date, onClose, onTaskClick }: DayDetailSheetProps) {
  const { getTasksByDate, addTask } = useTaskStore();
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  if (!isOpen || !date) return null;

  const tasks = getTasksByDate(date);
  const formattedDate = date.toLocaleDateString('nl-NL', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  const handleAddTask = async (title: string) => {
    const dateStr = date.toISOString().split('T')[0];
    await addTask({
      title,
      status: 'todo',
      timeOfDay: null,
      dueDate: dateStr,
    });
  };

  const handleTaskClick = (taskId: string) => {
    onTaskClick(taskId);
    setEditingTaskId(taskId);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-950 rounded-t-2xl shadow-2xl z-50 max-h-[85vh] overflow-y-auto pb-safe">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2 sticky top-0 bg-white dark:bg-gray-950">
          <div className="w-12 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700" />
        </div>

        {/* Content */}
        <div className="px-4 pb-6">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-1">{formattedDate}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {tasks.length === 0
                ? 'Geen taken gepland'
                : `${tasks.filter((t) => t.status !== 'done').length} open • ${tasks.filter((t) => t.status === 'done').length} voltooid`}
            </p>
          </div>

          {/* Quick Add */}
          <div className="mb-6">
            <QuickAdd onAdd={handleAddTask} />
          </div>

          {/* Task List */}
          {tasks.length === 0 ? (
            <div className="p-8 rounded-xl bg-purple-50/30 dark:bg-purple-950/10 border border-purple-100 dark:border-purple-900/30 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Geen taken gepland voor deze dag
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {tasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => handleTaskClick(task.id)}
                  className="w-full text-left p-3 rounded-xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-900 hover:border-purple-200 dark:hover:border-purple-900/50 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      task.status === 'done'
                        ? 'bg-[#8C46E0] border-transparent'
                        : 'border-gray-300 dark:border-gray-700'
                    }`}>
                      {task.status === 'done' && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${task.status === 'done' ? 'line-through text-gray-400 dark:text-gray-600' : 'text-foreground'}`}>
                        {task.title}
                      </p>
                      {task.timeOfDay && (
                        <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/30 text-[#8C46E0] dark:text-purple-300">
                          {task.timeOfDay === 'morning' ? 'Ochtend' : task.timeOfDay === 'afternoon' ? 'Middag' : 'Avond'}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Panel */}
      <TaskEditPanel
        taskId={editingTaskId}
        isOpen={editingTaskId !== null}
        onClose={() => setEditingTaskId(null)}
      />
    </>
  );
}

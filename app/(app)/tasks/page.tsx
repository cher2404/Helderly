'use client';

import { useState, useEffect } from 'react';
import { useTaskStore } from '../../store/taskStore';
import QuickAdd from '../../components/QuickAdd';
import TaskList from '../../components/TaskList';
import TaskEditPanel from '../../components/TaskEditPanel';
import NotificationBell from '../../components/NotificationBell';
import { Task, TaskStatus } from '../../types';

type FilterStatus = 'all' | 'todo' | 'done';

export default function TasksPage() {
  const { addTask, getAllTasks, searchTasks, isLoading } = useTaskStore();
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const allTasks = mounted ? getAllTasks() : [];

  // Combine search and filter
  let filteredTasks = searchQuery
    ? searchTasks(searchQuery)
    : allTasks;

  filteredTasks = filteredTasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'todo') return task.status !== 'done';
    if (filter === 'done') return task.status === 'done';
    return true;
  });

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
      <div className="min-h-screen max-w-2xl mx-auto px-4 py-8 pb-32">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-semibold text-foreground tracking-tight">Taken</h1>
              <NotificationBell />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {allTasks.length === 0
                ? 'Geen taken'
                : filter === 'all' 
                ? `${filteredTasks.length} ${filteredTasks.length === 1 ? 'taak' : 'taken'} • ${allTasks.filter((t) => t.status !== 'done').length} open`
                : filter === 'todo'
                ? `${filteredTasks.length} openstaande ${filteredTasks.length === 1 ? 'taak' : 'taken'}`
                : `${filteredTasks.length} voltooide ${filteredTasks.length === 1 ? 'taak' : 'taken'}`}
            </p>
          </div>
        </header>

        {/* Search */}
        {allTasks.length > 0 && (
          <div className="mb-5">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Zoek taken..."
                  className="w-full px-4 py-2.5 pl-11 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-foreground placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8C46E0] focus:border-transparent text-sm"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 touch-target p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="mb-6 flex gap-2">
          {(['all', 'todo', 'done'] as FilterStatus[]).map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === filterOption
                  ? 'bg-[#8C46E0] text-white'
                  : 'bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900'
              }`}
            >
              {filterOption === 'all' && 'Alle'}
              {filterOption === 'todo' && 'Te doen'}
              {filterOption === 'done' && 'Klaar'}
            </button>
          ))}
        </div>

        {/* Quick Add */}
        <div className="mb-6">
          <QuickAdd onAdd={handleAddTask} />
        </div>

        {/* Task List */}
        {filteredTasks.length === 0 ? (
          <div className="w-full p-12 rounded-lg bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {filter === 'all'
                ? 'Geen taken'
                : filter === 'todo'
                ? 'Geen openstaande taken'
                : 'Geen voltooide taken'}
            </p>
          </div>
        ) : (
          <TaskList tasks={filteredTasks} onTaskClick={handleTaskClick} />
        )}
      </div>

      {/* Edit Panel */}
      <TaskEditPanel
        taskId={editingTaskId}
        isOpen={editingTaskId !== null}
        onClose={() => setEditingTaskId(null)}
      />
    </div>
  );
}


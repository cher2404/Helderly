'use client';

import { Task } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onTaskClick: (id: string) => void;
}

export default function TaskList({ tasks, onTaskClick }: TaskListProps) {
  if (tasks.length === 0) {
    return null;
  }

  // Sorteer: todo/in-progress eerst, dan done, en daarbinnen op tijd
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.status === 'done' && b.status !== 'done') return 1;
    if (a.status !== 'done' && b.status === 'done') return -1;
    
    // Sorteer op tijd binnen status: ochtend > middag > avond > geen
    const timeOrder = { morning: 1, afternoon: 2, evening: 3, null: 4 };
    const aTime = a.timeOfDay || null;
    const bTime = b.timeOfDay || null;
    if (timeOrder[aTime as keyof typeof timeOrder] !== timeOrder[bTime as keyof typeof timeOrder]) {
      return timeOrder[aTime as keyof typeof timeOrder] - timeOrder[bTime as keyof typeof timeOrder];
    }
    
    return 0;
  });

  const doneCount = tasks.filter((t) => t.status === 'done').length;
  const activeCount = tasks.filter((t) => t.status !== 'done').length;

  return (
    <div className="w-full space-y-3">
      {/* Quick stats bar */}
      {tasks.length > 1 && (
        <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-purple-50/60 to-blue-50/60 dark:from-purple-950/20 dark:to-blue-950/20 border border-purple-200/50 dark:border-purple-900/30 mb-4 shadow-sm backdrop-blur-sm">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-700 dark:text-gray-300">
              <span className="font-bold text-[#8C46E0]">{activeCount}</span> actief
            </span>
            {doneCount > 0 && (
              <span className="text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-gray-600 dark:text-gray-500">{doneCount}</span> voltooid
              </span>
            )}
          </div>
          <div className="px-3 py-1 rounded-lg bg-white/60 dark:bg-gray-900/60 text-xs font-semibold text-[#8C46E0] shadow-sm">
            {Math.round((doneCount / tasks.length) * 100)}%
          </div>
        </div>
      )}
      
      <div className="space-y-2.5">
        {sortedTasks.map((task, index) => (
          <div key={task.id} className="animate-fade-in" style={{ animationDelay: `${index * 30}ms` }}>
            <TaskItem task={task} onTaskClick={onTaskClick} />
          </div>
        ))}
      </div>
    </div>
  );
}

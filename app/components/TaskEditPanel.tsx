'use client';

import { useEffect, useState } from 'react';
import { Task, TimeOfDay, Recurrence, RecurrenceType } from '../types';
import { useTaskStore } from '../store/taskStore';
import { useFolderStore } from '../store/folderStore';

interface TaskEditPanelProps {
  taskId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const timeOfDayOptions: { value: TimeOfDay; label: string }[] = [
  { value: null, label: 'Geen tijd' },
  { value: 'morning', label: 'Ochtend' },
  { value: 'afternoon', label: 'Middag' },
  { value: 'evening', label: 'Avond' },
];

const recurrenceOptions: { value: RecurrenceType; label: string }[] = [
  { value: null, label: 'Geen herhaling' },
  { value: 'daily', label: 'Dagelijks' },
  { value: 'weekly', label: 'Wekelijks' },
  { value: 'monthly', label: 'Maandelijks' },
  { value: 'yearly', label: 'Jaarlijks' },
];

export default function TaskEditPanel({ taskId, isOpen, onClose }: TaskEditPanelProps) {
  const { getTaskById, updateTask, deleteTask } = useTaskStore();
  const { getAllFolders } = useFolderStore();
  const task = taskId ? getTaskById(taskId) : null;
  const folders = getAllFolders();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(null);
  const [dueDate, setDueDate] = useState('');
  const [folderId, setFolderId] = useState<string | undefined>(undefined);
  const [recurrenceType, setRecurrenceType] = useState<RecurrenceType>(null);
  const [recurrenceInterval, setRecurrenceInterval] = useState(1);
  const [recurrenceEndDate, setRecurrenceEndDate] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setTimeOfDay(task.timeOfDay || null);
      setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
      setFolderId(task.folderId);
      setRecurrenceType(task.recurrence?.type || null);
      setRecurrenceInterval(task.recurrence?.interval || 1);
      setRecurrenceEndDate(task.recurrence?.endDate ? new Date(task.recurrence.endDate).toISOString().split('T')[0] : '');
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const handleSave = async () => {
    if (!title.trim()) return;

    const recurrence: Recurrence | undefined = recurrenceType
      ? {
          type: recurrenceType,
          interval: recurrenceInterval,
          endDate: recurrenceEndDate ? new Date(recurrenceEndDate).toISOString() : undefined,
        }
      : undefined;

    await updateTask(task.id, {
      title: title.trim(),
      description: description.trim() || undefined,
      timeOfDay,
      dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
      folderId: folderId || undefined,
      recurrence,
    });

    onClose();
  };

  const handleDelete = async () => {
    if (confirm('Weet je zeker dat je deze taak wilt verwijderen?')) {
      await deleteTask(task.id);
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed bottom-0 left-0 right-0 md:fixed md:right-0 md:top-0 md:bottom-0 md:w-96 md:left-auto bg-white dark:bg-gray-950 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-900 rounded-t-2xl md:rounded-none shadow-2xl z-50 max-h-[85vh] md:max-h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-900">
          <h2 className="text-lg font-semibold text-foreground">Taak bewerken</h2>
          <button
            onClick={onClose}
            className="touch-target p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Titel */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Titel *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Taak titel..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-foreground placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#8C46E0] focus:border-transparent text-base touch-target"
              autoFocus
            />
          </div>

          {/* Notitie */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Notitie
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optionele notitie..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-foreground placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#8C46E0] focus:border-transparent text-base resize-none"
            />
          </div>

          {/* Dagdeel */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Dagdeel
            </label>
            <select
              value={timeOfDay || ''}
              onChange={(e) => setTimeOfDay(e.target.value === '' ? null : (e.target.value as TimeOfDay))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-foreground focus:outline-none focus:ring-2 focus:ring-[#8C46E0] focus:border-transparent text-base touch-target"
            >
              {timeOfDayOptions.map((option) => (
                <option key={option.value || 'none'} value={option.value || ''}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Datum */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Datum (optioneel)
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-foreground focus:outline-none focus:ring-2 focus:ring-[#8C46E0] focus:border-transparent text-base touch-target"
            />
          </div>

          {/* Map */}
          {folders.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Map (optioneel)
              </label>
              <select
                value={folderId || ''}
                onChange={(e) => setFolderId(e.target.value || undefined)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-foreground focus:outline-none focus:ring-2 focus:ring-[#8C46E0] focus:border-transparent text-base touch-target"
              >
                <option value="">Geen map</option>
                {folders.map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Herhaling */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Herhaling
            </label>
            <select
              value={recurrenceType || ''}
              onChange={(e) => setRecurrenceType(e.target.value === '' ? null : (e.target.value as RecurrenceType))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-foreground focus:outline-none focus:ring-2 focus:ring-[#8C46E0] focus:border-transparent text-base touch-target"
            >
              {recurrenceOptions.map((option) => (
                <option key={option.value || 'none'} value={option.value || ''}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Interval input voor herhaling */}
            {recurrenceType && (
              <div className="mt-3 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Herhaal elke
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={recurrenceInterval}
                      onChange={(e) => setRecurrenceInterval(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-foreground focus:outline-none focus:ring-2 focus:ring-[#8C46E0] focus:border-transparent text-base touch-target"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {recurrenceType === 'daily' && (recurrenceInterval === 1 ? 'dag' : 'dagen')}
                      {recurrenceType === 'weekly' && (recurrenceInterval === 1 ? 'week' : 'weken')}
                      {recurrenceType === 'monthly' && (recurrenceInterval === 1 ? 'maand' : 'maanden')}
                      {recurrenceType === 'yearly' && (recurrenceInterval === 1 ? 'jaar' : 'jaren')}
                    </span>
                  </div>
                </div>

                {/* Einddatum (optioneel) */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Herhaal tot (optioneel)
                  </label>
                  <input
                    type="date"
                    value={recurrenceEndDate}
                    onChange={(e) => setRecurrenceEndDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-foreground focus:outline-none focus:ring-2 focus:ring-[#8C46E0] focus:border-transparent text-base touch-target"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-900 space-y-2">
          <button
            onClick={handleSave}
            disabled={!title.trim()}
            className="w-full px-5 py-3 rounded-lg bg-[#8C46E0] text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-[#7B3FD0]"
          >
            Opslaan
          </button>
          <button
            onClick={handleDelete}
            className="w-full px-5 py-3 rounded-lg border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
          >
            Verwijderen
          </button>
        </div>
      </div>
    </>
  );
}


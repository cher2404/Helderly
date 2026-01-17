'use client';

import { useEffect, useState } from 'react';
import { useTaskStore } from '../store/taskStore';

interface QuickAddSheetProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDate?: Date | string | null;
}

export default function QuickAddSheet({ isOpen, onClose, defaultDate }: QuickAddSheetProps) {
  const { addTask } = useTaskStore();
  const [input, setInput] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      // Focus input when sheet opens
      setTimeout(() => {
        const inputElement = document.getElementById('quick-add-input');
        inputElement?.focus();
      }, 100);
      
      // Set default date if provided
      if (defaultDate) {
        const date = typeof defaultDate === 'string' ? new Date(defaultDate) : defaultDate;
        setSelectedDate(date.toISOString().split('T')[0]);
      } else {
        setSelectedDate('');
      }
    } else {
      // Clear input when sheet closes
      setInput('');
      setSelectedDate('');
    }
  }, [isOpen, defaultDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      await addTask({
        title: input.trim(),
        status: 'todo',
        timeOfDay: null,
        dueDate: selectedDate || undefined,
      });
      setInput('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-950 rounded-t-2xl shadow-2xl z-50 pb-safe">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700" />
        </div>

        {/* Content */}
        <div className="px-4 pb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Nieuwe taak</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              id="quick-add-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Taak titel..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-foreground placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#8C46E0] focus:border-transparent text-base touch-target"
              autoFocus
            />
            
            {/* Date picker */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Datum (optioneel)
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-foreground focus:outline-none focus:ring-2 focus:ring-[#8C46E0] focus:border-transparent text-base touch-target"
              />
            </div>
            
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors touch-target"
              >
                Annuleren
              </button>
              <button
                type="submit"
                disabled={!input.trim()}
                className="flex-1 px-4 py-3 rounded-xl bg-[#8C46E0] text-white font-medium hover:bg-[#7B3FD0] active:opacity-90 transition-colors touch-target disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Toevoegen
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

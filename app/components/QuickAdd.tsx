'use client';

import { useState } from 'react';

interface QuickAddProps {
  onAdd: (title: string) => void;
}

export default function QuickAdd({ onAdd }: QuickAddProps) {
  const [input, setInput] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setIsAnimating(true);
      onAdd(input.trim());
      setInput('');
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full relative group">
      <div className="flex gap-2.5">
        <div className="flex-1 relative">
          {/* Decorative background */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-50/50 to-blue-50/50 dark:from-purple-950/10 dark:to-blue-950/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nieuwe taak toevoegen..."
            className="relative w-full px-4 py-3 pl-11 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm text-foreground placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8C46E0]/50 focus:border-[#8C46E0] text-sm transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-700"
          />
          
          {/* Plus icon */}
          <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className={`w-5 h-5 transition-colors duration-300 ${input ? 'text-[#8C46E0]' : 'text-gray-400 dark:text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </div>
        <button
          type="submit"
          disabled={!input.trim()}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#8C46E0] to-[#7B3FD0] text-white text-sm font-semibold whitespace-nowrap transition-all duration-300 hover:shadow-lg hover:shadow-[#8C46E0]/30 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none shadow-md"
        >
          Toevoegen
        </button>
      </div>
    </form>
  );
}


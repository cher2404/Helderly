'use client';

import { useState, useEffect } from 'react';

export default function AppPreview() {
  const [currentView, setCurrentView] = useState(0);

  const views = [
    {
      name: 'Vandaag',
      icon: '📅',
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Vandaag</h3>
            <div className="h-2 w-32 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#8C46E0] to-[#6C63FF] rounded-full" style={{ width: '65%' }} />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-700 flex-shrink-0" />
              <span className="text-sm text-gray-900 dark:text-gray-100">Design review voorbereiden</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="w-5 h-5 rounded border-2 border-[#8C46E0] flex-shrink-0 bg-[#8C46E0]" />
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">Team meeting notulen</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-700 flex-shrink-0" />
              <span className="text-sm text-gray-900 dark:text-gray-100">Q4 planning afronden</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: 'Focus',
      icon: '🎯',
      content: (
        <div className="text-center py-8">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#8C46E0] to-[#6C63FF] flex items-center justify-center mb-4 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Design review voorbereiden
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Focus op één taak</p>
          </div>
          <div className="flex gap-3 justify-center">
            <button className="px-6 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium">
              Later
            </button>
            <button className="px-6 py-2.5 rounded-lg bg-[#8C46E0] text-white text-sm font-medium">
              Klaar
            </button>
          </div>
        </div>
      ),
    },
    {
      name: 'Kalender',
      icon: '📆',
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Maart 2024</h3>
            <div className="flex gap-2">
              <button className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 rounded">
                ←
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 rounded">
                →
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'].map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 28 }, (_, i) => {
              const day = i + 1;
              const isToday = day === 15;
              const hasTasks = [5, 8, 15, 20, 23].includes(day);
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs ${
                    isToday
                      ? 'bg-[#8C46E0] text-white font-semibold'
                      : hasTasks
                      ? 'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {day}
                  {hasTasks && !isToday && (
                    <div className="w-1 h-1 bg-[#8C46E0] rounded-full mt-0.5" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ),
    },
    {
      name: 'Mappen',
      icon: '📁',
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Mappen</h3>
            <button className="px-4 py-2 rounded-lg bg-[#8C46E0] text-white text-sm font-medium">
              + Nieuw
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'Werk', color: 'bg-blue-100 dark:bg-blue-950/30', count: 8 },
              { name: 'Persoonlijk', color: 'bg-purple-100 dark:bg-purple-950/30', count: 4 },
              { name: 'Project X', color: 'bg-green-100 dark:bg-green-950/30', count: 12 },
              { name: 'Ideeën', color: 'bg-yellow-100 dark:bg-yellow-950/30', count: 3 },
            ].map((folder, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl border border-gray-200 dark:border-gray-800 ${folder.color} cursor-pointer hover:shadow-md transition-all`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg ${folder.color} border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center`}>
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">{folder.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{folder.count} taken</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentView((prev) => (prev + 1) % views.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Phone mockup */}
      <div className="relative mx-auto" style={{ maxWidth: '320px' }}>
        {/* Phone frame */}
        <div className="relative bg-gray-900 dark:bg-black rounded-[2.5rem] p-2 shadow-2xl">
          {/* Screen bezel */}
          <div className="bg-gray-900 dark:bg-black rounded-[2rem] p-1">
            {/* Screen */}
            <div className="bg-white dark:bg-gray-950 rounded-[1.5rem] overflow-hidden">
              {/* Status bar */}
              <div className="h-8 bg-gradient-to-b from-gray-900 to-gray-800 dark:from-gray-950 dark:to-black flex items-center justify-between px-6 text-white text-xs">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-2 border border-white rounded-sm">
                    <div className="w-3 h-1.5 bg-white rounded-sm m-0.5" />
                  </div>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2 11h20M6 7h12M10 15h4" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <div className="w-6 h-3 border border-white rounded-sm px-0.5">
                    <div className="w-full h-full bg-white rounded-sm" />
                  </div>
                </div>
              </div>

              {/* App content */}
              <div className="h-[640px] bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 p-6 overflow-y-auto">
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                      {views[currentView].name}
                    </h2>
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                      <span className="text-lg">{views[currentView].icon}</span>
                    </div>
                  </div>
                </div>

                {/* Animated content */}
                <div
                  key={currentView}
                  className="animate-in fade-in slide-in-from-right duration-500"
                >
                  {views[currentView].content}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {views.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentView(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentView
                  ? 'w-8 bg-[#8C46E0]'
                  : 'w-2 bg-gray-300 dark:bg-gray-700'
              }`}
              aria-label={`Ga naar ${views[index].name} view`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';

export default function KeyboardShortcutsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const shortcuts = [
    {
      category: 'Navigatie',
      items: [
        { keys: ['T'], description: 'Ga naar Vandaag' },
        { keys: ['K'], description: 'Ga naar Kalender' },
        { keys: ['L'], description: 'Ga naar Taken' },
        { keys: ['M'], description: 'Ga naar Mappen' },
        { keys: ['?'], description: 'Toon toetsenbord sneltoetsen' },
      ],
    },
    {
      category: 'Taken',
      items: [
        { keys: ['N'], description: 'Nieuwe taak toevoegen' },
        { keys: ['/', 'Cmd+K'], description: 'Zoeken' },
        { keys: ['Enter'], description: 'Taak opslaan (in editor)' },
        { keys: ['Esc'], description: 'Sluit editor/modal' },
      ],
    },
    {
      category: 'Focus',
      items: [
        { keys: ['F'], description: 'Start focus mode' },
        { keys: ['Space'], description: 'Taak voltooien (in focus mode)' },
      ],
    },
  ];

  if (!mounted) {
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
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-foreground tracking-tight mb-2">
            Sneltoetsen
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Werk sneller met toetsenbord sneltoetsen
          </p>
        </header>

        <div className="space-y-6">
          {shortcuts.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="p-6 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800"
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">{category.category}</h2>
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-900 last:border-b-0"
                  >
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.description}</span>
                    <div className="flex gap-1.5">
                      {item.keys.map((key, keyIndex) => (
                        <div key={keyIndex} className="flex items-center gap-1">
                          {key.includes('Cmd') ? (
                            <>
                              <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded">
                                ⌘
                              </kbd>
                              <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded">
                                {key.split('Cmd')[1]}
                              </kbd>
                            </>
                          ) : (
                            <kbd className="px-2.5 py-1 text-xs font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded">
                              {key}
                            </kbd>
                          )}
                          {keyIndex < item.keys.length - 1 && (
                            <span className="text-gray-400 text-xs">of</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="p-6 rounded-xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/50">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              💡 <strong>Tip:</strong> Sneltoetsen werken op alle pagina's in de app. 
              Druk op <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded">?</kbd> om deze lijst te zien.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

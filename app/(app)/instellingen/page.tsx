'use client';

import { useState, useEffect } from 'react';
import { useSettingsStore, type Theme } from '../../store/settingsStore';
import { useRouter } from 'next/navigation';
import { useTaskStore } from '../../store/taskStore';
import { useFolderStore } from '../../store/folderStore';

export default function SettingsPage() {
  const {
    theme,
    notificationsEnabled,
    defaultView,
    autoFocus,
    showCompletedTasks,
    setTheme,
    toggleNotifications,
    setDefaultView,
    setAutoFocus,
    setShowCompletedTasks,
  } = useSettingsStore();
  
  const { getAllTasks } = useTaskStore();
  const { getAllFolders } = useFolderStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleExport = () => {
    const tasks = getAllTasks();
    const folders = getAllFolders();
    const data = {
      tasks,
      folders,
      exportedAt: new Date().toISOString(),
      version: '1.0',
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `helderly-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.tasks || data.folders) {
          if (confirm('Weet je zeker dat je deze data wilt importeren? Dit overschrijft je huidige data.')) {
            // TODO: Import data into stores
            alert('Import functionaliteit wordt binnenkort toegevoegd.');
          }
        }
      } catch (error) {
        alert('Fout bij het importeren van het bestand. Controleer of het een geldig Helderly export bestand is.');
      }
    };
    reader.readAsText(file);
  };

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
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-foreground tracking-tight mb-2">Instellingen</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Beheer je voorkeuren en account instellingen
          </p>
        </header>

        <div className="space-y-6">
          {/* Weergave */}
          <section className="p-6 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-foreground mb-4">Weergave</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Thema</label>
                <div className="flex gap-2">
                  {(['light', 'dark', 'system'] as Theme[]).map((option) => (
                    <button
                      key={option}
                      onClick={() => setTheme(option)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        theme === option
                          ? 'bg-[#8C46E0] text-white'
                          : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                      }`}
                    >
                      {option === 'light' ? 'Licht' : option === 'dark' ? 'Donker' : 'Systeem'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Standaard weergave</label>
                <select
                  value={defaultView}
                  onChange={(e) => setDefaultView(e.target.value as 'today' | 'tasks' | 'calendar')}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-foreground focus:outline-none focus:ring-2 focus:ring-[#8C46E0] focus:border-transparent text-sm"
                >
                  <option value="today">Vandaag</option>
                  <option value="tasks">Taken</option>
                  <option value="calendar">Kalender</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-foreground">Afgeronde taken tonen</label>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                    Toon taken die je hebt afgerond in de lijst
                  </p>
                </div>
                <button
                  onClick={() => setShowCompletedTasks(!showCompletedTasks)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    showCompletedTasks ? 'bg-[#8C46E0]' : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      showCompletedTasks ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* PWA & Offline */}
          <section className="p-6 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-foreground mb-4">App & Offline</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Service Worker</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">
                  Offline ondersteuning is {typeof window !== 'undefined' && 'serviceWorker' in navigator ? 'actief' : 'niet beschikbaar'}
                </p>
                {typeof window !== 'undefined' && 'serviceWorker' in navigator && (
                  <button
                    onClick={async () => {
                      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                        navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
                        window.location.reload();
                      }
                    }}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    App bijwerken
                  </button>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Push Notificaties</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">
                  Ontvang meldingen, ook wanneer de app gesloten is
                </p>
                <button
                  onClick={async () => {
                    if ('Notification' in window && 'serviceWorker' in navigator) {
                      const permission = await Notification.requestPermission();
                      if (permission === 'granted') {
                        alert('Push notificaties zijn ingeschakeld!');
                      } else {
                        alert('Push notificaties zijn uitgeschakeld. Controleer je browser instellingen.');
                      }
                    } else {
                      alert('Push notificaties worden niet ondersteund in deze browser.');
                    }
                  }}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  Toestemming vragen
                </button>
              </div>
            </div>
          </section>

          {/* Notificaties */}
          <section className="p-6 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-foreground mb-4">Notificaties</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-foreground">Notificaties inschakelen</label>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                    Ontvang meldingen voor deadlines en herinneringen
                  </p>
                </div>
                <button
                  onClick={toggleNotifications}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    notificationsEnabled ? 'bg-[#8C46E0]' : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-foreground">Auto focus</label>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                    Start automatisch focus mode bij het openen van de app
                  </p>
                </div>
                <button
                  onClick={() => setAutoFocus(!autoFocus)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    autoFocus ? 'bg-[#8C46E0]' : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      autoFocus ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Data beheer */}
          <section className="p-6 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-foreground mb-4">Data beheer</h2>
            <div className="space-y-3">
              <button
                onClick={handleExport}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Data exporteren
              </button>

              <label className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Data importeren
              </label>
            </div>
          </section>

          {/* Account */}
          <section className="p-6 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-foreground mb-4">Account</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">E-mail</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">gebruiker@voorbeeld.nl</p>
                </div>
                <button
                  onClick={() => router.push('/account')}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  Beheren
                </button>
              </div>
              <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={() => {
                    if (confirm('Weet je zeker dat je uit wilt loggen?')) {
                      localStorage.clear();
                      router.push('/login');
                    }
                  }}
                  className="w-full px-4 py-2.5 rounded-lg border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                >
                  Uitloggen
                </button>
              </div>
            </div>
          </section>

          {/* Info */}
          <section className="p-6 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-foreground mb-4">Over Helderly</h2>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center justify-between">
                <span>Versie</span>
                <span className="font-medium text-foreground">1.0.0</span>
              </div>
              <a href="/support" className="flex items-center justify-between hover:text-[#8C46E0] transition-colors">
                <span>Support</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a href="/privacy" className="flex items-center justify-between hover:text-[#8C46E0] transition-colors">
                <span>Privacy beleid</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

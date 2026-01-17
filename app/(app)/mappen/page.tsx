'use client';

import { useState, useEffect } from 'react';
import { useFolderStore } from '../../store/folderStore';
import { useTaskStore } from '../../store/taskStore';
import { Folder, FolderColor } from '../../types';

const FOLDER_COLORS: { value: FolderColor; label: string; bg: string; border: string }[] = [
  { value: 'blue', label: 'Blauw', bg: 'bg-blue-100 dark:bg-blue-950/30', border: 'border-blue-300 dark:border-blue-800' },
  { value: 'purple', label: 'Paars', bg: 'bg-purple-100 dark:bg-purple-950/30', border: 'border-purple-300 dark:border-purple-800' },
  { value: 'green', label: 'Groen', bg: 'bg-green-100 dark:bg-green-950/30', border: 'border-green-300 dark:border-green-800' },
  { value: 'orange', label: 'Oranje', bg: 'bg-orange-100 dark:bg-orange-950/30', border: 'border-orange-300 dark:border-orange-800' },
  { value: 'pink', label: 'Roze', bg: 'bg-pink-100 dark:bg-pink-950/30', border: 'border-pink-300 dark:border-pink-800' },
  { value: 'gray', label: 'Grijs', bg: 'bg-gray-100 dark:bg-gray-950/30', border: 'border-gray-300 dark:border-gray-800' },
];

export default function MappenPage() {
  const { folders, addFolder, updateFolder, deleteFolder, canAddFolder, getFolderCount, userPlan } = useFolderStore();
  const { getAllTasks } = useTaskStore();
  const [mounted, setMounted] = useState(false);
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [selectedColor, setSelectedColor] = useState<FolderColor>('blue');

  useEffect(() => {
    setMounted(true);
  }, []);

  const allTasks = mounted ? getAllTasks() : [];
  const folderCount = mounted ? getFolderCount() : 0;
  const canAdd = mounted ? canAddFolder() : true;
  const limit = userPlan === 'free' ? 3 : Infinity;

  // Tel taken per map
  const getTaskCountForFolder = (folderId: string) => {
    return allTasks.filter((task) => task.folderId === folderId).length;
  };

  const handleCreateFolder = () => {
    if (!folderName.trim()) return;
    if (addFolder(folderName.trim(), selectedColor)) {
      setFolderName('');
      setSelectedColor('blue');
      setIsCreateModalOpen(false);
    } else {
      alert(`Je hebt de limiet van ${limit} mappen bereikt. Upgrade naar Pro voor onbeperkte mappen.`);
    }
  };

  const handleEditFolder = (folder: Folder) => {
    setEditingFolder(folder);
    setFolderName(folder.name);
    setSelectedColor(folder.color);
  };

  const handleSaveEdit = () => {
    if (!editingFolder || !folderName.trim()) return;
    updateFolder(editingFolder.id, {
      name: folderName.trim(),
      color: selectedColor,
    });
    setEditingFolder(null);
    setFolderName('');
    setSelectedColor('blue');
  };

  const handleDeleteFolder = (folder: Folder) => {
    const taskCount = getTaskCountForFolder(folder.id);
    const message = taskCount > 0
      ? `Weet je zeker dat je "${folder.name}" wilt verwijderen? De ${taskCount} ${taskCount === 1 ? 'taak' : 'taken'} in deze map worden niet verwijderd, maar blijven zonder map.`
      : `Weet je zeker dat je "${folder.name}" wilt verwijderen?`;
    
    if (confirm(message)) {
      deleteFolder(folder.id);
    }
  };

  const handleCancelEdit = () => {
    setEditingFolder(null);
    setFolderName('');
    setSelectedColor('blue');
    setIsCreateModalOpen(false);
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
        <header className="mb-10 animate-slide-in">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#8C46E0] flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground tracking-tight">Mappen</h1>
              <p className="text-base text-gray-600 dark:text-gray-400 mt-0.5">
                {folderCount === 0
                  ? 'Nog geen mappen'
                  : `${folderCount} ${folderCount === 1 ? 'map' : 'mappen'} • ${userPlan === 'free' ? `${limit - folderCount} over` : 'Onbeperkt'}`}
              </p>
            </div>
          </div>
        </header>

        {/* Create Button */}
        {canAdd && (
          <div className="mb-6">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="w-full px-5 py-3 rounded-lg bg-[#8C46E0] text-white font-medium flex items-center justify-center gap-2 transition-colors hover:bg-[#7B3FD0]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nieuwe map
            </button>
          </div>
        )}

        {/* Limit Reached Message */}
        {!canAdd && (
          <div className="mb-6 p-4 rounded-xl bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Je hebt de limiet van {limit} mappen bereikt. <a href="/prijzen" className="underline font-medium">Upgrade naar Pro</a> voor onbeperkte mappen.
            </p>
          </div>
        )}

        {/* Folder List */}
        {folders.length === 0 ? (
          <div className="w-full p-12 rounded-xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-900 text-center">
            <p className="text-gray-500 dark:text-gray-500 text-base mb-4">
              Nog geen mappen. Maak een map om je taken te organiseren.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {folders.map((folder) => {
              const taskCount = getTaskCountForFolder(folder.id);
              const colorConfig = FOLDER_COLORS.find((c) => c.value === folder.color) || FOLDER_COLORS[0];

              return (
                <div
                  key={folder.id}
                  className={`p-5 rounded-2xl border-2 ${colorConfig.border} ${colorConfig.bg} bg-opacity-50 dark:bg-opacity-30 transition-all duration-200 hover:shadow-xl hover:scale-[1.02] cursor-pointer`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={`w-4 h-4 rounded-full ${colorConfig.bg.replace('/30', '').replace('dark:bg-', 'dark:bg-').replace('/30', '')} border-2 ${colorConfig.border} flex-shrink-0`} />
                      <h3 className="font-semibold text-foreground truncate">{folder.name}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {taskCount} {taskCount === 1 ? 'taak' : 'taken'}
                      </span>
                      <button
                        onClick={() => handleEditFolder(folder)}
                        className="touch-target p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        aria-label="Bewerken"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteFolder(folder)}
                        className="touch-target p-2 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                        aria-label="Verwijderen"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Create/Edit Modal */}
        {(isCreateModalOpen || editingFolder) && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={handleCancelEdit}
            />

            {/* Modal */}
            <div className="fixed bottom-0 left-0 right-0 md:fixed md:right-0 md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:bottom-auto md:w-96 bg-white dark:bg-gray-950 border-t md:border border-gray-200 dark:border-gray-900 rounded-t-2xl md:rounded-2xl shadow-2xl z-50 max-h-[85vh] md:max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-900">
                <h2 className="text-lg font-semibold text-foreground">
                  {editingFolder ? 'Map bewerken' : 'Nieuwe map'}
                </h2>
                <button
                  onClick={handleCancelEdit}
                  className="touch-target p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Naam */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Naam *
                  </label>
                  <input
                    type="text"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    placeholder="Map naam..."
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-foreground placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8C46E0] focus:border-transparent text-sm"
                    autoFocus
                  />
                </div>

                {/* Kleur */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Kleur
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {FOLDER_COLORS.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setSelectedColor(color.value)}
                        className={`p-4 rounded-xl border-2 transition-all touch-target ${
                          selectedColor === color.value
                            ? `${color.border} ${color.bg} scale-105`
                            : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                        }`}
                      >
                        <div className={`w-full h-8 rounded-lg ${color.bg} border ${color.border}`} />
                        <p className="text-xs font-medium text-foreground mt-2">{color.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-900 space-y-2">
                <button
                  onClick={editingFolder ? handleSaveEdit : handleCreateFolder}
                  disabled={!folderName.trim()}
                  className="w-full px-5 py-3 rounded-lg bg-[#8C46E0] text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-[#7B3FD0]"
                >
                  {editingFolder ? 'Opslaan' : 'Maken'}
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="w-full px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  Annuleren
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

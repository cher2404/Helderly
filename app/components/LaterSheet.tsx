'use client';

interface LaterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onLaterToday: () => void;
  onTomorrow: () => void;
}

export default function LaterSheet({
  isOpen,
  onClose,
  onLaterToday,
  onTomorrow,
}: LaterSheetProps) {
  if (!isOpen) return null;

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayLabel = today.toLocaleDateString('nl-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const tomorrowLabel = tomorrow.toLocaleDateString('nl-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

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
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Taak verplaatsen
          </h2>

          <div className="space-y-2">
            <button
              onClick={() => {
                onLaterToday();
                onClose();
              }}
              className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-left hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors touch-target"
            >
              <div className="font-medium text-foreground mb-1">Later vandaag</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {todayLabel}
              </div>
            </button>

            <button
              onClick={() => {
                onTomorrow();
                onClose();
              }}
              className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-left hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors touch-target"
            >
              <div className="font-medium text-foreground mb-1">Morgen</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {tomorrowLabel}
              </div>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-4 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors touch-target"
          >
            Annuleren
          </button>
        </div>
      </div>
    </>
  );
}

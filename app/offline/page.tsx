'use client';

export default function OfflinePage() {
  return (
    <div className="app-bg min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#8C46E0]/10 dark:bg-[#8C46E0]/20 flex items-center justify-center">
          <svg className="w-10 h-10 text-[#8C46E0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-foreground mb-3">
          Geen internetverbinding
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
          Je bent offline. Controleer je internetverbinding en probeer het opnieuw.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 rounded-lg bg-[#8C46E0] text-white font-medium hover:bg-[#7B3FD0] transition-colors"
        >
          Probeer opnieuw
        </button>
      </div>
    </div>
  );
}

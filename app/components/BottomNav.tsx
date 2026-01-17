'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import QuickAddSheet from './QuickAddSheet';

interface NavItem {
  href?: string;
  label: string;
  icon: React.ReactNode;
  action?: () => void;
}

export default function BottomNav() {
  const pathname = usePathname();
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      href: '/today',
      label: 'Vandaag',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      href: '/calendar',
      label: 'Kalender',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: 'Toevoegen',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
      ),
      action: () => setIsQuickAddOpen(true),
    },
    {
      href: '/tasks',
      label: 'Taken',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      href: '/more',
      label: 'Meer',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-t border-gray-200/80 dark:border-gray-900/80 shadow-lg pb-safe">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-end justify-around h-16 px-2">
            {navItems.map((item, index) => {
              const isActive = item.href && pathname === item.href;
              const isAddButton = !item.href && item.action;

              if (isAddButton) {
                return (
                  <button
                    key={index}
                    onClick={item.action}
                    className="flex flex-col items-center justify-center gap-1 -mt-4 relative group"
                    aria-label={item.label}
                  >
                    <div className="relative">
                      {/* Outer glow rings */}
                      <div className="absolute inset-0 bg-[#8C46E0] rounded-full opacity-20 group-hover:opacity-30 blur-lg transition-opacity duration-300" />
                      <div className="absolute inset-0 bg-[#8C46E0] rounded-full opacity-10 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
                      
                      {/* Button */}
                      <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#8C46E0] to-[#7B3FD0] flex items-center justify-center shadow-lg hover:shadow-2xl hover:shadow-[#8C46E0]/30 hover:scale-110 active:scale-95 transition-all duration-300 ring-2 ring-white/20 dark:ring-gray-900/20">
                        {item.icon}
                      </div>
                      
                      {/* Shine effect */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </button>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={`relative flex flex-col items-center justify-center gap-1.5 flex-1 px-2 py-2.5 rounded-t-xl transition-all duration-300 group ${
                    isActive
                      ? 'text-[#8C46E0]'
                      : 'text-gray-500 dark:text-gray-400 hover:text-[#8C46E0] dark:hover:text-purple-400'
                  }`}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-[#8C46E0] rounded-full shadow-sm" />
                  )}
                  
                  {/* Active background with gradient */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-b from-[#8C46E0]/10 to-transparent rounded-t-xl" />
                  )}
                  
                  {/* Hover background */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-[#8C46E0]/5 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                  
                  {/* Icon container with pulse effect when active */}
                  <div className={`relative transition-all duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                    {isActive && (
                      <div className="absolute inset-0 bg-[#8C46E0]/20 rounded-full blur-md animate-pulse" />
                    )}
                    <div className="relative">
                      {item.icon}
                    </div>
                  </div>
                  <span className={`text-xs font-medium relative transition-all duration-300 ${isActive ? 'font-semibold text-[#8C46E0]' : 'group-hover:font-medium'}`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <QuickAddSheet 
        isOpen={isQuickAddOpen} 
        onClose={() => setIsQuickAddOpen(false)}
        defaultDate={null}
      />
    </>
  );
}

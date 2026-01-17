'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTaskStore } from '../../store/taskStore';
import { useFolderStore } from '../../store/folderStore';

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  href?: string;
  action?: () => void;
  variant?: 'default' | 'danger';
  badge?: string;
}

export default function MorePage() {
  const router = useRouter();
  const { getAllTasks } = useTaskStore();
  const { getFolderCount, canAddFolder } = useFolderStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const taskCount = mounted ? getAllTasks().length : 0;
  const folderCount = mounted ? getFolderCount() : 0;
  const userPlan = 'free'; // TODO: haal uit auth context

  const handleExport = () => {
    // TODO: Implementeer data export
    const tasks = getAllTasks();
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `helderly-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const handleLogout = () => {
    // TODO: Implementeer logout
    if (confirm('Weet je zeker dat je uit wilt loggen?')) {
      // Clear local storage
      localStorage.clear();
      router.push('/login');
    }
  };

  const menuSections: { title?: string; items: MenuItem[] }[] = [
    {
      title: 'Account',
      items: [
        {
          label: 'Instellingen',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          ),
          href: '/instellingen',
        },
        {
          label: 'Account',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          ),
          href: '/account',
        },
        {
          label: 'Plan',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          ),
          href: '/prijzen',
          badge: userPlan === 'free' ? 'Free' : userPlan === 'pro' ? 'Pro' : 'Together',
        },
      ],
    },
    {
      title: 'Organisatie',
      items: [
        {
          label: 'Together',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ),
          href: '/organisatie/teams',
        },
        {
          label: 'Mappen',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          ),
          href: '/mappen',
          badge: mounted ? `${folderCount} / ${userPlan === 'free' ? '3' : '∞'}` : undefined,
        },
        {
          label: 'Taken exporteren',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
          action: handleExport,
        },
      ],
    },
    {
      title: 'Hulp',
      items: [
        {
          label: 'Sneltoetsen',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          ),
          href: '/keyboard-shortcuts',
        },
        {
          label: 'Support',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ),
          href: '/support',
        },
        {
          label: 'Changelog',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          href: '/changelog',
        },
      ],
    },
    {
      title: 'Over',
      items: [
        {
          label: 'Privacy',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          ),
          href: '/privacy',
        },
        {
          label: 'Over Helderly',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          href: '/over-ons',
        },
      ],
    },
    {
      items: [
        {
          label: 'Uitloggen',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          ),
          action: handleLogout,
          variant: 'danger',
        },
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
      <div className="min-h-screen max-w-2xl mx-auto px-4 py-6 pb-24">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-foreground mb-2">Meer</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {mounted && `${taskCount} taken • ${folderCount} ${folderCount === 1 ? 'map' : 'mappen'}`}
          </p>
        </header>

        {/* Menu Sections */}
        <div className="space-y-6">
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {section.title && (
                <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-3 px-1">
                  {section.title}
                </h2>
              )}
              <div className="space-y-1">
                {section.items.map((item, itemIndex) => {
                  const content = (
                    <div
                      className={`flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-900 hover:border-gray-200 dark:hover:border-gray-800 transition-colors ${
                        item.variant === 'danger'
                          ? 'hover:bg-red-50 dark:hover:bg-red-950/20'
                          : ''
                      } touch-target`}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div
                          className={`flex-shrink-0 ${
                            item.variant === 'danger'
                              ? 'text-red-600 dark:text-red-400'
                              : 'text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          {item.icon}
                        </div>
                        <span
                          className={`font-medium ${
                            item.variant === 'danger'
                              ? 'text-red-600 dark:text-red-400'
                              : 'text-foreground'
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                      {item.badge && (
                        <span className="px-2 py-1 text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
                          {item.badge}
                        </span>
                      )}
                      {item.href && (
                        <svg
                          className="w-5 h-5 text-gray-400 dark:text-gray-600 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      )}
                    </div>
                  );

                  if (item.href) {
                    return (
                      <Link key={itemIndex} href={item.href}>
                        {content}
                      </Link>
                    );
                  }

                  return (
                    <button key={itemIndex} onClick={item.action} className="w-full text-left">
                      {content}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-900 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Helderly v1.0.0
          </p>
        </div>
      </div>
    </div>
  );
}

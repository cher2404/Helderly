'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/authStore';
import BottomNav from '../../components/BottomNav';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, initialized } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!initialized) return;

    if (!user) {
      // Redirect to login if not authenticated
      router.push('/login');
      return;
    }

    setIsChecking(false);
  }, [user, initialized, router]);

  if (!initialized || isChecking || !user) {
    return (
      <div className="app-bg min-h-screen flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-500">Laden...</p>
      </div>
    );
  }

  return (
    <>
      {children}
      <BottomNav />
    </>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Section from '../../components/ui/Section';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, isLoading, user, initialize } = useAuthStore();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initialize();
    
    // Redirect if already logged in
    if (user) {
      router.push('/today');
    }
  }, [user, router, initialize]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const { error: signInError } = await signIn(formData.email, formData.password);
    
    if (signInError) {
      setError(signInError.message || 'Inloggen mislukt. Controleer je email en wachtwoord.');
      return;
    }
    
    // Redirect after successful login
    router.push('/today');
  };

  return (
    <>
      <Section className="pt-24 pb-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Inloggen</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welkom terug bij Helderly
            </p>
          </div>

          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-foreground focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent"
                  placeholder="je@voorbeeld.nl"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Wachtwoord
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-foreground focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent"
                />
              </div>

              <div className="flex items-center justify-between">
                <Link
                  href="/wachtwoord-vergeten"
                  className="text-sm text-[#6C63FF] hover:underline"
                >
                  Wachtwoord vergeten?
                </Link>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Inloggen...' : 'Inloggen'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-900 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Nog geen account?{' '}
                <Link href="/signup" className="text-[#6C63FF] hover:underline font-medium">
                  Maak er een aan
                </Link>
              </p>
            </div>
          </Card>

          <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-500">
            Door in te loggen ga je akkoord met onze{' '}
            <Link href="/voorwaarden" className="text-[#6C63FF] hover:underline">
              gebruiksvoorwaarden
            </Link>{' '}
            en{' '}
            <Link href="/privacy" className="text-[#6C63FF] hover:underline">
              privacy beleid
            </Link>
            .
          </p>
        </div>
      </Section>
    </>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Section from '../../components/ui/Section';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';

export default function SignupPage() {
  const router = useRouter();
  const authStore = useAuthStore();
  const { signUp, isLoading, user, initialize } = authStore;
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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
    setSuccess(false);
    
    if (formData.password.length < 8) {
      setError('Wachtwoord moet minimaal 8 karakters lang zijn.');
      return;
    }
    
    const { error: signUpError } = await signUp(formData.email, formData.password, formData.name);
    
    if (signUpError) {
      setError(signUpError.message || 'Account aanmaken mislukt. Probeer het opnieuw.');
      return;
    }
    
    setSuccess(true);
    
    // Wait for auth state to be initialized before redirecting
    // Check if user is set in store after signup
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Re-initialize to ensure session is loaded
    await initialize();
    
    // Wait a bit more for the session to be available
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if we have a user before redirecting
    // Use a small delay to let the auth state update
    setTimeout(async () => {
      const currentUser = authStore.user || useAuthStore.getState().user;
      if (currentUser) {
        try {
          router.push('/today');
          router.refresh(); // Force refresh to ensure auth state is synced
        } catch (err) {
          console.error('Redirect error:', err);
          setError('Redirect mislukt. Probeer handmatig in te loggen.');
          setSuccess(false);
        }
      } else {
        // If no user (e.g., email confirmation required), show message
        setError('Je account is aangemaakt. Check je email om te bevestigen, of probeer in te loggen.');
        setSuccess(false);
      }
    }, 1000);
  };

  return (
    <>
      <Section className="pt-24 pb-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Account maken</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Start vandaag nog met Helderly
            </p>
          </div>

          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Naam
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-foreground focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent"
                  placeholder="Je naam"
                />
              </div>

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
                  minLength={8}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-foreground focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                  Minimaal 8 karakters
                </p>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              {success && (
                <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900">
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Account aangemaakt! Je wordt doorgestuurd...
                  </p>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isLoading || success}
              >
                {isLoading ? 'Account aanmaken...' : 'Account aanmaken'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-900 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Heb je al een account?{' '}
                <Link href="/login" className="text-[#6C63FF] hover:underline font-medium">
                  Log in
                </Link>
              </p>
            </div>
          </Card>

          <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-500">
            Door een account aan te maken ga je akkoord met onze{' '}
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

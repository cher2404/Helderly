'use client';

import { useState } from 'react';
import Link from 'next/link';
import Section from '../../components/ui/Section';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual password reset
    setSubmitted(true);
  };

  return (
    <>
      <Section className="pt-24 pb-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Wachtwoord vergeten?</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Geen probleem, we helpen je verder
            </p>
          </div>

          {submitted ? (
            <Card className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#38BDF8] flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Check je email
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Als er een account bestaat met dit email adres, hebben we een link gestuurd 
                om je wachtwoord te resetten.
              </p>
              <Link
                href="/login"
                className="inline-block text-[#6C63FF] hover:underline font-medium"
              >
                Terug naar inloggen
              </Link>
            </Card>
          ) : (
            <Card>
              <form onSubmit={handleSubmit} className="space-y-6">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Vul je email adres in en we sturen je een link om je wachtwoord te resetten.
                </p>

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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-foreground focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent"
                    placeholder="je@voorbeeld.nl"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  Reset link versturen
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-900 text-center">
                <Link
                  href="/login"
                  className="text-sm text-[#6C63FF] hover:underline"
                >
                  Terug naar inloggen
                </Link>
              </div>
            </Card>
          )}
        </div>
      </Section>
    </>
  );
}

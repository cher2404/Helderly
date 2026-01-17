'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Section from '../../components/ui/Section';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useFolderStore } from '../../store/folderStore';

export default function AccountPage() {
  const { userPlan, updateUserPlan } = useFolderStore();
  const [mounted, setMounted] = useState(false);
  const userEmail = 'gebruiker@voorbeeld.nl'; // TODO: Get from auth

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePlanChange = (newPlan: 'free' | 'pro' | 'together') => {
    updateUserPlan(newPlan);
  };

  return (
    <>
      <Section className="pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-6">Account</h1>

          <div className="space-y-6">
            {/* Account info */}
            <Card>
              <h2 className="text-xl font-semibold text-foreground mb-4">Account informatie</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Email
                  </label>
                  <p className="text-foreground">{userEmail}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
                    Huidig plan
                  </label>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1.5 rounded-lg bg-[#8C46E0]/10 text-[#8C46E0] dark:bg-purple-950/30 dark:text-purple-400 font-semibold text-sm capitalize">
                      {userPlan}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Plan */}
            <Card>
              <h2 className="text-xl font-semibold text-foreground mb-4">Abonnement</h2>
              {!mounted ? (
                <p className="text-gray-600 dark:text-gray-400">Laden...</p>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {userPlan === 'free' 
                      ? 'Je gebruikt momenteel het gratis plan.'
                      : userPlan === 'pro'
                      ? 'Je gebruikt het Pro plan.'
                      : 'Je gebruikt het Together plan.'}
                  </p>
                  
                  {/* Plan Switcher (voor development/testing) */}
                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Plan switchen (voor testen):
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => handlePlanChange('free')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          userPlan === 'free'
                            ? 'bg-[#8C46E0] text-white'
                            : 'bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900'
                        }`}
                      >
                        Free
                      </button>
                      <button
                        onClick={() => handlePlanChange('pro')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          userPlan === 'pro'
                            ? 'bg-[#8C46E0] text-white'
                            : 'bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900'
                        }`}
                      >
                        Pro
                      </button>
                      <button
                        onClick={() => handlePlanChange('together')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          userPlan === 'together'
                            ? 'bg-[#8C46E0] text-white'
                            : 'bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900'
                        }`}
                      >
                        Together
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
                      ⚠️ Dit is alleen voor development. In productie wordt dit beheerd via facturering.
                    </p>
                  </div>

                  {userPlan === 'free' ? (
                    <Button href="/prijzen" variant="primary" size="md">
                      Upgrade naar Pro of Together
                    </Button>
                  ) : (
                    <div className="flex gap-4">
                      <Button href="/prijzen" variant="secondary" size="md">
                        Wijzig plan
                      </Button>
                      <Button variant="outline" size="md">
                        Opzeggen
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </Card>

            {/* Facturen */}
            <Card>
              <h2 className="text-xl font-semibold text-foreground mb-4">Facturen</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {userPlan === 'Free'
                  ? 'Geen facturen beschikbaar voor gratis accounts.'
                  : 'Download je facturen via de onderstaande link.'}
              </p>
              {userPlan !== 'Free' && (
                <Button variant="secondary" size="md">
                  Bekijk facturen
                </Button>
              )}
            </Card>

            {/* Danger zone */}
            <Card className="border-red-200 dark:border-red-900">
              <h2 className="text-xl font-semibold text-foreground mb-4 text-red-600 dark:text-red-400">
                Gevaarlijke zone
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Als je je account verwijdert, worden al je data permanent gewist. 
                Dit kan niet ongedaan gemaakt worden.
              </p>
              <Button variant="outline" size="md" className="border-red-300 text-red-600 dark:border-red-800 dark:text-red-400">
                Account verwijderen
              </Button>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}

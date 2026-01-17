'use client';

import Link from 'next/link';
import Section from '../../../components/ui/Section';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

export default function PaymentSuccessPage() {
  return (
    <>
      <Section className="pt-24 pb-12">
        <div className="max-w-md mx-auto text-center">
          <Card className="py-12">
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
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Betaling gelukt!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Je account is nu geüpgraded. Je hebt nu toegang tot alle Pro features.
            </p>
            <Button href="/today" variant="primary" size="lg" className="w-full">
              Naar de app
            </Button>
          </Card>
        </div>
      </Section>
    </>
  );
}

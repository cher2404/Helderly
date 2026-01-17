import Link from 'next/link';
import Section from '../../../components/ui/Section';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

export default function PaymentFailedPage() {
  return (
    <>
      <Section className="pt-24 pb-12">
        <div className="max-w-md mx-auto text-center">
          <Card className="py-12">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600 dark:text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Betaling mislukt
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Er is iets misgegaan met de betaling. Controleer je betaalgegevens 
              of probeer het opnieuw.
            </p>
            <div className="space-y-3">
              <Button href="/betaal" variant="primary" size="lg" className="w-full">
                Opnieuw proberen
              </Button>
              <Link
                href="/contact"
                className="block text-sm text-[#6C63FF] hover:underline"
              >
                Neem contact op voor hulp
              </Link>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}

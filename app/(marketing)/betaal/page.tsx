'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Section from '../../components/ui/Section';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const plans = {
  pro: { name: 'Pro', price: 9, period: 'per maand' },
  together: { name: 'Together', price: 19, period: 'per maand', pricePerUser: 'per 5 gebruikers' },
};

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedPlanParam = searchParams.get('plan') || 'pro';
  const [selectedPlan, setSelectedPlan] = useState<'pro' | 'together'>(
    selectedPlanParam === 'together' ? 'together' : 'pro'
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);
    // TODO: Integrate with payment provider (Stripe, etc.)
    // For now, simulate checkout
    setTimeout(() => {
      router.push('/betaal/succes?plan=' + selectedPlan);
    }, 1500);
  };

  const plan = plans[selectedPlan];

  return (
    <>
      <Section className="pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-6">Checkout</h1>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Plan selection */}
            <div className="md:col-span-2 space-y-4">
              <Card>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Kies je plan
                </h2>
                <div className="space-y-3">
                  {(['pro', 'together'] as const).map((planKey) => {
                    const p = plans[planKey];
                    return (
                      <button
                        key={planKey}
                        onClick={() => setSelectedPlan(planKey)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
                          selectedPlan === planKey
                            ? 'border-[#6C63FF] bg-[#6C63FF]/5'
                            : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {p.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              €{p.price} {p.period}
                              {(p as any).pricePerUser && (
                                <span className="block text-xs text-gray-500">{(p as any).pricePerUser}</span>
                              )}
                            </p>
                          </div>
                          {selectedPlan === planKey && (
                            <div className="w-5 h-5 rounded-full bg-[#6C63FF] flex items-center justify-center">
                              <svg
                                className="w-3 h-3 text-white"
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
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </Card>

              {/* Payment info would go here */}
              <Card>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Betaalgegevens
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Betaalgegevens worden veilig verwerkt via onze betaalpartner.
                </p>
                <div className="p-8 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl text-center">
                  <p className="text-gray-500 dark:text-gray-500 text-sm">
                    Payment form komt hier (Stripe, etc.)
                  </p>
                </div>
              </Card>
            </div>

            {/* Summary */}
            <div className="md:col-span-1">
              <Card className="sticky top-24">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Samenvatting
                </h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      {plan.name} plan
                    </span>
                    <span className="font-semibold text-foreground">
                      €{plan.price}
                    </span>
                  </div>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-900">
                    <div className="flex justify-between">
                      <span className="font-semibold text-foreground">
                        Totaal
                      </span>
                      <span className="font-bold text-foreground">
                        €{plan.price}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {plan.period}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  variant="primary"
                  size="lg"
                  className="w-full mb-4"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Verwerken...' : 'Betalen'}
                </Button>

                <p className="text-xs text-center text-gray-500 dark:text-gray-500">
                  Door te betalen ga je akkoord met onze{' '}
                  <Link href="/voorwaarden" className="text-[#6C63FF] hover:underline">
                    voorwaarden
                  </Link>
                  .
                </p>
              </Card>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

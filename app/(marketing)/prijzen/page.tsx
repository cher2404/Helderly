import { Metadata } from 'next';
import Section from '../../components/ui/Section';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export const metadata: Metadata = {
  title: 'Prijzen - Helderly',
  description: 'Start gratis. Upgrade wanneer je meer nodig hebt. Eenvoudige, eerlijke prijzen zonder verborgen kosten.',
};

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: 'Gratis',
      description: 'Ideal om te starten en te proberen',
      features: [
        'Onbeperkt taken',
        'Dagoverzicht',
        'Focus mode',
        'Maximaal 3 mappen',
        'Basis kalender (dag)',
        'Geen creditcard nodig',
      ],
      cta: 'Start gratis',
      ctaVariant: 'secondary' as const,
      href: '/signup',
    },
    {
      name: 'Pro',
      price: '€9',
      period: '/maand',
      description: 'Voor professionals die meer structuur nodig hebben',
      popular: true,
      features: [
        'Alles uit Free',
        'Onbeperkt mappen',
        'Kalender (week & maand)',
        'AI suggesties voor taken',
        'Email → taak integratie',
        'Prioriteit en labels',
        'Exporteer je data',
        'Prioriteit support',
      ],
      cta: 'Start Pro trial',
      ctaVariant: 'primary' as const,
      href: '/betaal?plan=pro',
    },
    {
      name: 'Together',
      price: '€19',
      period: '/maand',
      pricePerUser: 'per 5 gebruikers',
      description: 'Voor teams die samen plannen zonder gedoe',
      features: [
        'Alles uit Pro',
        'Onbeperkt teamleden',
        'Gedeelde mappen en projecten',
        'Taken toewijzen aan teamleden',
        'Team kalender en planning',
        'Team overzicht en analytics',
        'Rollen en rechten beheer',
        'Dedicated support',
      ],
      cta: 'Start Together trial',
      ctaVariant: 'primary' as const,
      href: '/betaal?plan=together',
    },
  ];

  return (
    <>
      <Section className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Eenvoudige, eerlijke prijzen
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
            Start gratis. Upgrade wanneer je meer nodig hebt.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Geen verborgen kosten. Geen lange contracten. Je kunt altijd upgraden of downgraden.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${plan.popular ? 'ring-2 ring-[#8C46E0]' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#8C46E0] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Meest gekozen
                  </span>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-gray-600 dark:text-gray-400">
                      {plan.period}
                    </span>
                  )}
                  {(plan as any).pricePerUser && (
                    <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                      {(plan as any).pricePerUser}
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#8C46E0] mr-2 flex-shrink-0 mt-0.5"
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
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                href={plan.href}
                variant={plan.ctaVariant}
                size="md"
                className="w-full"
              >
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>
      </Section>

      <Section background="gradient">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Veelgestelde vragen over prijzen
          </h2>
          <div className="space-y-4">
            <Card>
              <h3 className="font-semibold text-foreground mb-2">
                Wat is het verschil tussen Pro en Together?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pro is voor individuele professionals. Together voegt samenwerking toe: gedeelde mappen, 
                teamleden uitnodigen en taken toewijzen. Perfect voor kleine teams die samen willen plannen zonder gedoe.
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold text-foreground mb-2">
                Kan ik upgraden of downgraden?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ja, op elk moment. Wijzigingen gaan direct in. Je betaalt alleen voor wat je gebruikt, proportioneel voor de resterende tijd.
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold text-foreground mb-2">
                Wat gebeurt er als ik cancel?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Je account wordt automatisch teruggebracht naar Free. Je kunt altijd je data exporteren 
                voordat je je account opzegt. Geen verborgen kosten, geen gedoe.
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold text-foreground mb-2">
                Bieden jullie kortingen voor studenten?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Op dit moment niet. We overwegen dit voor de toekomst. 
                Neem <a href="/contact" className="text-[#8C46E0] hover:underline font-medium">contact</a> met ons op als je hier interesse in hebt.
              </p>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}

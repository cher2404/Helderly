import { Metadata } from 'next';
import Link from 'next/link';
import Section from '../../components/ui/Section';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import FadeIn from '../../components/ui/FadeIn';
import Container from '../../components/ui/Container';

export const metadata: Metadata = {
  title: 'Together - Helderly',
  description: 'Samenwerken aan projecten met Helderly Together. Deel mappen, wijs taken toe en houd overzicht.',
};

const teamFeatures = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Onbeperkt teamleden',
    description: 'Nodig zoveel teamleden uit als je nodig hebt. Geen extra kosten per gebruiker.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
    title: 'Gedeelde mappen',
    description: 'Deel mappen en projecten met je team. Iedereen ziet dezelfde taken en kan bijdragen.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: 'Taken toewijzen',
    description: 'Wijs taken toe aan specifieke teamleden. Duidelijk wie waaraan werkt.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Team kalender',
    description: 'Zie alle team taken in één kalender. Plan en coördineer zonder conflicts.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Team analytics',
    description: 'Overzicht van team voortgang en statistieken. Zie wat het team bereikt.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Rollen en rechten',
    description: 'Beheer wie wat kan. Owner, admin en member rollen voor duidelijke structuur.',
  },
];

const useCases = [
  {
    title: 'Projectteams',
    description: 'Werk samen aan projecten met gedeelde mappen en duidelijke toewijzingen.',
  },
  {
    title: 'Kleine startups',
    description: 'Houd overzicht over wat iedereen doet zonder ingewikkelde tools.',
  },
  {
    title: 'Freelance collectieven',
    description: 'Deel taken en projecten met andere freelancers in je netwerk.',
  },
];

export default function TeamsPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Samenwerken zonder gedoe
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Helderly Together maakt samenwerken simpel. Deel mappen, wijs taken toe en houd overzicht zonder complexe workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/betaal?plan=together" variant="primary" size="lg">
                Start Together trial
              </Button>
              <Button href="/prijzen" variant="secondary" size="lg">
                Bekijk prijzen
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Features Grid */}
      <Section background="gradient">
        <Container>
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Wat krijg je met Together?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Alles uit Pro, plus samenwerking features die je team helpen om beter te plannen.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {teamFeatures.map((feature, index) => (
              <FadeIn key={index} delay={index * 100}>
                <Card className="p-6 h-full group hover:shadow-lg transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8C46E0] to-purple-600 flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-[#8C46E0] dark:group-hover:text-purple-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* How it works */}
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Hoe werkt Together?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Een simpele workflow voor effectieve samenwerking
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#8C46E0] text-white flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Maak een team aan
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Start een nieuw team en geef het een naam. Je bent automatisch de owner en kunt direct beginnen.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#8C46E0] text-white flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Nodig teamleden uit
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Voeg teamleden toe via email. Ze krijgen toegang tot gedeelde mappen en kunnen direct meewerken.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#8C46E0] text-white flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Deel mappen en wijs taken toe
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Deel een map met je team en wijs taken toe aan specifieke teamleden. Iedereen ziet wie waaraan werkt.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#8C46E0] text-white flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Houd overzicht in de team kalender
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Bekijk alle team taken in één kalender. Plan deadlines en vermijd conflicts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Use cases */}
      <Section background="gradient">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Voor wie is Together?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Perfect voor kleine teams die samen willen werken zonder complexe tools
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {useCases.map((useCase, index) => (
                <FadeIn key={index} delay={index * 100}>
                  <Card className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {useCase.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {useCase.description}
                    </p>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="p-12 rounded-2xl bg-gradient-to-br from-[#8C46E0]/10 to-purple-50/50 dark:from-[#8C46E0]/20 dark:to-purple-950/20 border border-purple-200/50 dark:border-purple-900/50">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Klaar om samen te werken?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
                Start vandaag nog met Helderly Together en ervaar hoe simpel samenwerken kan zijn.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/betaal?plan=teams" variant="primary" size="lg">
                  Start Teams trial
                </Button>
                <Button href="/prijzen" variant="secondary" size="lg">
                  Bekijk alle prijzen
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

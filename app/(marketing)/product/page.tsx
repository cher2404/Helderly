import { Metadata } from 'next';
import Section from '../../components/ui/Section';
import Card from '../../components/ui/Card';
import Container from '../../components/ui/Container';

export const metadata: Metadata = {
  title: 'Product - Helderly',
  description: 'Ontdek hoe Helderly je helpt om gefocust te blijven en meer gedaan te krijgen.',
};

export default function ProductPage() {
  return (
    <>
      <Section className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Een planning app die je helpt focussen
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Helderly is gebouwd met één doel: je helpen om helderheid te krijgen 
            over wat er echt toe doet, zonder afleiding.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Vandaag</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              Begin elke dag met duidelijkheid. Zie in één oogopslag wat er vandaag op je lijst staat, 
              zonder overspoeld te worden door toekomstige verplichtingen.
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-[#6C63FF] mr-2">•</span>
                <span>Dagoverzicht met ochtend, middag en avond</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#6C63FF] mr-2">•</span>
                <span>Snelle taak toevoegen vanuit elke pagina</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#6C63FF] mr-2">•</span>
                <span>Duidelijke prioriteit per dagdeel</span>
              </li>
            </ul>
          </div>
          <Card className="h-64 flex items-center justify-center">
            <p className="text-gray-400">Screenshot placeholder</p>
          </Card>
        </div>
      </Section>

      <Section background="gradient">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Card className="h-64 flex items-center justify-center md:order-2">
            <p className="text-gray-400">Screenshot placeholder</p>
          </Card>
          <div className="md:order-1">
            <h2 className="text-3xl font-bold text-foreground mb-4">Focus Mode</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              Werk aan één taak tegelijk. Focus mode verbergt alles wat niet relevant is, 
              zodat je je aandacht volledig kunt richten op wat je nu aan het doen bent.
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-[#6C63FF] mr-2">•</span>
                <span>Eén taak per keer, groot en rustig getoond</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#6C63FF] mr-2">•</span>
                <span>Klaar of Later opties voor snelle beslissingen</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#6C63FF] mr-2">•</span>
                <span>Geen afleiding, alleen wat je nu nodig hebt</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Wat Helderly anders maakt
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <h3 className="font-semibold text-foreground mb-2">Geen ruis</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We voegen geen features toe "omdat het kan". Elke feature heeft een doel: je helpen focussen.
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold text-foreground mb-2">Geen schuldgevoel</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Taken die je niet afkrijgt worden niet rood of schreeuwen om aandacht. Ze verplaatsen zich gewoon rustig.
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold text-foreground mb-2">Mobile-first</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Helderly voelt als een native app op je telefoon, maar werkt net zo goed op je laptop.
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold text-foreground mb-2">Jouw data</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Je data is van jou. We verkopen niets, we tonen geen advertenties, en je kunt altijd exporteren.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      <Section background="gradient">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Klaar om te proberen?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Start vandaag nog met een rustigere planning. Geen creditcard nodig.
          </p>
          <a
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-[#5B52E6] to-[#2A9DD8] !text-white text-lg font-bold drop-shadow-sm hover:from-[#5248D9] hover:to-[#258FC9] transition-all [&>*]:!text-white"
          >
            Maak gratis account aan
          </a>
        </div>
      </Section>
    </>
  );
}

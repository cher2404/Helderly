import { Metadata } from 'next';
import Section from '../../components/ui/Section';

export const metadata: Metadata = {
  title: 'Hoe werkt Helderly - Stap voor stap uitleg',
  description: 'Leer hoe je het meeste uit Helderly haalt met deze stap-voor-stap gids.',
};

export default function HowItWorksPage() {
  return (
    <>
      <Section className="pt-24 pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Hoe werkt Helderly?
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            In drie eenvoudige stappen naar meer focus en duidelijkheid.
          </p>
        </div>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Stap 1 */}
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#38BDF8] flex items-center justify-center text-2xl font-bold text-white mb-6">
                1
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Voeg taken toe
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                Begin simpel: voeg een taak toe met alleen een titel. Later kun je meer details toevoegen 
                zoals een notitie, dagdeel (ochtend/middag/avond) of een specifieke datum.
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Quick add vanuit de centrale + knop</li>
                <li>• Of via het invoerveld op de Vandaag pagina</li>
                <li>• Klik op een taak om details toe te voegen</li>
              </ul>
            </div>
            <div className="md:col-span-3 h-64 bg-gray-100 dark:bg-gray-900 rounded-xl flex items-center justify-center">
              <p className="text-gray-400">Screenshot: Taak toevoegen</p>
            </div>
          </div>

          {/* Stap 2 */}
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3 h-64 bg-gray-100 dark:bg-gray-900 rounded-xl flex items-center justify-center md:order-1">
              <p className="text-gray-400">Screenshot: Focus mode</p>
            </div>
            <div className="md:col-span-2 md:order-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#38BDF8] flex items-center justify-center text-2xl font-bold text-white mb-6">
                2
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Start focus mode
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                Wanneer je klaar bent om te werken, start focus mode. Je ziet één taak tegelijk, 
                groot en rustig gepresenteerd, zonder afleiding.
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Kies "Start focus" op de Vandaag pagina</li>
                <li>• Werk door je taken met "Klaar" of "Later"</li>
                <li>• Blijf gefocust, zonder lange lijsten</li>
              </ul>
            </div>
          </div>

          {/* Stap 3 */}
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#38BDF8] flex items-center justify-center text-2xl font-bold text-white mb-6">
                3
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Blijf gefocust
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                Helderly helpt je om gefocust te blijven door alleen te tonen wat er nu toe doet. 
                Taken die je uitstelt verplaatsen zich rustig naar later of morgen.
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Geen stress over onafgemaakte taken</li>
                <li>• Duidelijk overzicht van wat je hebt bereikt</li>
                <li>• Rustig werken zonder schuldgevoel</li>
              </ul>
            </div>
            <div className="md:col-span-3 h-64 bg-gray-100 dark:bg-gray-900 rounded-xl flex items-center justify-center">
              <p className="text-gray-400">Screenshot: Kalender overzicht</p>
            </div>
          </div>
        </div>
      </Section>

      <Section background="gradient">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Klaar om te beginnen?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Het duurt minder dan een minuut om te starten.
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

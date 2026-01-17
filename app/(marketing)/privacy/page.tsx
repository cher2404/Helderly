import { Metadata } from 'next';
import Section from '../../components/ui/Section';

export const metadata: Metadata = {
  title: 'Privacy beleid - Helderly',
  description: 'Lees ons privacy beleid en ontdek hoe we omgaan met jouw data.',
};

export default function PrivacyPage() {
  return (
    <>
      <Section className="pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Privacy beleid
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Jouw data is van jou</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Dat is ons uitgangspunt. We verzamelen alleen de data die nodig is om Helderly te laten werken. 
                We verkopen geen data, we tonen geen advertenties, en we delen je informatie niet met derden.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Wat we verzamelen</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We verzamelen alleen de minimale informatie die nodig is:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                <li>Account informatie (email, naam)</li>
                <li>Je taken, mappen en planning data</li>
                <li>Technische informatie (app versie, apparaat type) voor support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Hoe we je data gebruiken</h2>
              <p className="text-gray-600 dark:text-gray-400">
                We gebruiken je data alleen om Helderly te laten werken: om je taken op te slaan, 
                te synchroniseren tussen apparaten, en om je support te kunnen geven als je dat nodig hebt.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Data opslag en beveiliging</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Je data wordt veilig opgeslagen met betrouwbare leveranciers die voldoen aan hoge 
                beveiligingsstandaarden. We gebruiken versleuteling in transit en in rust. 
                We volgen best practices voor data beveiliging.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Je rechten</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Je hebt altijd het recht om:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                <li>Je data in te zien</li>
                <li>Je data te exporteren</li>
                <li>Je data te verwijderen</li>
                <li>Je account op te zeggen</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Cookies</h2>
              <p className="text-gray-600 dark:text-gray-400">
                We gebruiken alleen functionele cookies die nodig zijn om Helderly te laten werken. 
                We gebruiken geen tracking cookies of advertentie cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Vragen?</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Als je vragen hebt over ons privacy beleid, neem dan contact met ons op via{' '}
                <a href="/contact" className="text-[#6C63FF] hover:underline">onze contact pagina</a>.
              </p>
            </section>
          </div>
        </div>
      </Section>
    </>
  );
}

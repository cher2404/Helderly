import { Metadata } from 'next';
import Section from '../../components/ui/Section';

export const metadata: Metadata = {
  title: 'Gebruiksvoorwaarden - Helderly',
  description: 'Lees de gebruiksvoorwaarden van Helderly.',
};

export default function TermsPage() {
  return (
    <>
      <Section className="pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Gebruiksvoorwaarden
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
              <h2 className="text-2xl font-bold text-foreground mb-4">Algemeen</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Door Helderly te gebruiken, ga je akkoord met deze gebruiksvoorwaarden. 
                Als je niet akkoord gaat met deze voorwaarden, gebruik dan Helderly niet.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Gebruik van de dienst</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Helderly is beschikbaar voor persoonlijk en zakelijk gebruik. Je mag Helderly gebruiken zoals bedoeld, 
                maar niet:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                <li>De dienst gebruiken voor illegale doeleinden</li>
                <li>Proberen toegang te krijgen tot systemen of data waartoe je geen toegang hebt</li>
                <li>De dienst verstoren of misbruiken</li>
                <li>Andere gebruikers hinderen of lastigvallen</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Account</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Je bent verantwoordelijk voor het beveiligen van je account. We raden aan om een sterk wachtwoord te gebruiken. 
                Als je vermoedt dat je account is gecompromitteerd, neem dan direct contact met ons op.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Betalingen</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Voor betaalde plannen (Pro, Teams) gelden de prijzen zoals vermeld op onze prijzen pagina. 
                Betalingen worden maandelijks of jaarlijks gedaan, afhankelijk van je gekozen plan. 
                Je kunt op elk moment opzeggen, en je toegang blijft actief tot het einde van je betaalperiode.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Intellectueel eigendom</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Helderly en alle bijbehorende technologie en content zijn eigendom van Helderly. 
                Je data is van jou, maar je geeft ons toestemming om deze op te slaan en te verwerken 
                om Helderly te kunnen aanbieden.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Beschikbaarheid</h2>
              <p className="text-gray-600 dark:text-gray-400">
                We streven naar een hoge beschikbaarheid, maar garanderen geen 100% uptime. 
                We doen ons best om storingen snel op te lossen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Wijzigingen</h2>
              <p className="text-gray-600 dark:text-gray-400">
                We kunnen deze voorwaarden wijzigen. Belangrijke wijzigingen communiceren we via email 
                of via een melding in de app. Door Helderly te blijven gebruiken na wijzigingen, 
                ga je akkoord met de nieuwe voorwaarden.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Contact</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Voor vragen over deze voorwaarden, neem contact met ons op via{' '}
                <a href="/contact" className="text-[#6C63FF] hover:underline">onze contact pagina</a>.
              </p>
            </section>
          </div>
        </div>
      </Section>
    </>
  );
}

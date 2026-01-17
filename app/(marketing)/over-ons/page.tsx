import { Metadata } from 'next';
import Section from '../../components/ui/Section';
import Card from '../../components/ui/Card';

export const metadata: Metadata = {
  title: 'Over ons - Helderly',
  description: 'Ontdek waarom Helderly bestaat en wat we belangrijk vinden.',
};

export default function AboutPage() {
  return (
    <>
      <Section className="pt-24 pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Over Helderly
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Waarom bestaat Helderly? En waar staan we voor?
          </p>
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl mx-auto space-y-12">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Waarom Helderly bestaat
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              Planning apps zijn meestal ingewikkeld. Ze proberen alles te doen, 
              maar daardoor worden ze onduidelijk en overweldigend. Ze maken je niet productiever, 
              ze maken je drukker.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Helderly is anders. We geloven dat een planning app je moet helpen focussen, 
              niet afleiden. Daarom bouwen we een tool die rustig is, helder, en gewoon doet wat het moet doen.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Waar we voor staan
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <h3 className="font-semibold text-foreground mb-2">Rust</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Geen ruis, geen overbodige features. Alleen wat je nodig hebt om gefocust te blijven.
                </p>
              </Card>
              <Card>
                <h3 className="font-semibold text-foreground mb-2">Duidelijkheid</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  In één oogopslag zien wat er toe doet. Geen ingewikkelde dashboards vol met data.
                </p>
              </Card>
              <Card>
                <h3 className="font-semibold text-foreground mb-2">Respect</h3>
                <p className="text-sm text-gray-400">
                  Jouw data is van jou. We verkopen niets, we manipuleren niet, en we behandelen je met respect.
                </p>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Wat we bewust niet doen
            </h2>
            <div className="space-y-4">
              <Card>
                <h3 className="font-semibold text-foreground mb-2">Geen stress dashboards</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We tonen geen statistieken die je een schuldgevoel geven over onafgemaakte taken. 
                  Taken die je niet afkrijgt zijn niet mislukt, ze zijn gewoon nog niet gebeurd.
                </p>
              </Card>
              <Card>
                <h3 className="font-semibold text-foreground mb-2">Geen schuldgevoel</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Taken worden niet rood of schreeuwen om aandacht. Ze verplaatsen zich rustig 
                  naar later of morgen, zonder drama.
                </p>
              </Card>
              <Card>
                <h3 className="font-semibold text-foreground mb-2">Geen advertenties</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We verdienen geld met betaalde plannen, niet door je te verkopen aan adverteerders. 
                  Je data is van jou.
                </p>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              De toekomst
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Helderly blijft groeien, maar altijd met hetzelfde doel: je helpen focussen zonder afleiding. 
              We voegen alleen features toe die daadwerkelijk helpen, niet omdat het technisch kan. 
              Als je ideeën hebt, horen we ze graag via{' '}
              <a href="/contact" className="text-[#6C63FF] hover:underline">onze contact pagina</a>.
            </p>
          </section>
        </div>
      </Section>
    </>
  );
}

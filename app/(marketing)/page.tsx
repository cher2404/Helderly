import { Metadata } from 'next';
import Link from 'next/link';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import FadeIn from '../components/ui/FadeIn';
import AppPreview from '../components/marketing/AppPreview';

export const metadata: Metadata = {
  title: 'Helderly - Begin je dag met helderheid',
  description:
    'Plan wat vandaag telt. Focus op één taak. Rond af met rust. Geen ruis, geen gedoe. Start gratis.',
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-tight bg-gradient-to-r from-[#6C63FF] via-[#38BDF8] to-[#6C63FF] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
            Begin je dag met helderheid
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto content-text-wide">
            Plan wat vandaag telt. Focus op één taak. Rond af met rust.
            <br />
            <span className="text-lg md:text-xl lg:text-2xl">Geen ruis, geen gedoe.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/signup" variant="primary" size="lg" className="font-bold">
              Start gratis
            </Button>
            <Button href="/hoe-werkt-het" variant="secondary" size="lg">
              Hoe werkt het
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-6">
            Geen creditcard nodig. Start direct.
          </p>
        </div>
      </Section>

      {/* Features */}
      <Section background="gradient">
        <FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          <Card className="group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#38BDF8] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Vandaag</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Zie in één oogopslag wat er vandaag op je agenda staat.
            </p>
          </Card>

          <Card className="group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#38BDF8] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Focus</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Werk aan één taak tegelijk, zonder afleiding.
            </p>
          </Card>

          <Card className="group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#38BDF8] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Kalender</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Plan vooruit met overzicht. Altijd duidelijk wat er komen gaat.
            </p>
          </Card>

          <Card className="group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#38BDF8] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Mappen</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Organiseer taken zoals het jou uitkomt. Projecten, contexten, wat je wilt.
            </p>
          </Card>

          <Link href="/teams">
            <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#8C46E0] to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-[#8C46E0] dark:group-hover:text-purple-400 transition-colors">Together</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Werk samen zonder gedoe. Deel mappen en houd overzicht, zonder complexiteit.
              </p>
            </Card>
          </Link>
          </div>
        </FadeIn>
      </Section>

      {/* App Preview */}
      <Section>
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Zie hoe Helderly werkt
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Rustig, overzichtelijk, en zonder ruis. Zie hoe je vandaag structureert en focust op wat telt.
            </p>
          </div>
          <AppPreview />
        </FadeIn>
      </Section>

      {/* Voor wie */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Voor wie is Helderly?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Voor mensen die genoeg hebben van tools vol features die ze nooit gebruiken. 
            Als je zoekt naar rust, duidelijkheid en een app die gewoon werkt, dan ben je hier op de goede plek.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <Card>
              <h3 className="font-semibold text-foreground mb-2">Professionals</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Overzicht zonder ruis. Structuur je dag zonder gedoe.
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold text-foreground mb-2">Ondernemers</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Structuur zonder complexiteit. Een tool die meegroeit zonder rommelig te worden.
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold text-foreground mb-2">Teams</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Samen plannen zonder complexe tools. Eenvoudig en overzichtelijk.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* Hoe het werkt */}
      <Section background="gradient">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            Zo werkt het
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#38BDF8] flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                1
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Voeg een taak toe</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Typ wat je moet doen. Kies later een dagdeel of datum, of laat het staan.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#38BDF8] flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Kies wat vandaag telt</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Selecteer maximaal 3 taken waar je vandaag aan werkt. De rest verdwijnt naar de achtergrond.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#38BDF8] flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Rond af met focus</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Werk aan één taak tegelijk. Geen afleiding, alleen wat er nu toe doet.
              </p>
            </div>
          </div>
            <div>
              <Button href="/signup" variant="primary" size="lg" className="font-bold">
                Begin vandaag
              </Button>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
                Gratis account aanmaken. Geen creditcard nodig.
              </p>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Trust */}
      <Section>
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Jouw data, jouw controle
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
              We verkopen geen data. We tonen geen advertenties. 
              We bouwen een tool die je vertrouwt, niet een platform dat je als product ziet.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm font-medium text-foreground">100% versleuteld</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-sm font-medium text-foreground">Geen advertenties</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="text-sm font-medium text-foreground">Data export</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/privacy" className="text-[#6C63FF] hover:underline">
                Privacy beleid
              </Link>
              <Link href="/voorwaarden" className="text-[#6C63FF] hover:underline">
                Gebruiksvoorwaarden
              </Link>
              <Link href="/over-ons" className="text-[#6C63FF] hover:underline">
                Over ons
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* FAQ */}
      <Section background="gradient">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Veelgestelde vragen
          </h2>
          <div className="space-y-4">
            <Card>
              <h3 className="font-semibold text-foreground mb-2">Is Helderly gratis?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Ja, je kunt Helderly gratis gebruiken met maximaal 3 mappen. Dat is genoeg om te starten en te proberen. 
                Wil je meer? Dan kun je upgraden naar Pro of Together. <Link href="/prijzen" className="text-[#6C63FF] hover:underline font-medium">Bekijk prijzen</Link>
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold text-foreground mb-2">Werkt Helderly offline?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Helderly werkt het beste online, zodat je data veilig en gesynchroniseerd blijft. 
                Je kunt de app installeren op je telefoon voor een app-achtige ervaring. Betere offline ondersteuning komt later.
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold text-foreground mb-2">Kan ik mijn data exporteren?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Ja, altijd. Je bent de eigenaar van je data, niet wij. Je kunt op elk moment alles exporteren via je instellingen.
              </p>
            </Card>
          </div>
          <div className="mt-8 text-center">
            <Link href="/support" className="text-[#6C63FF] hover:underline font-medium">
              Meer vragen? Bekijk onze support pagina →
            </Link>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section background="gradient">
        <FadeIn>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Wat anderen zeggen
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                  "Eindelijk een planning app die niet overweldigend is. Ik zie alleen wat ik nodig heb, zonder afleiding."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#38BDF8] flex items-center justify-center text-white font-bold">
                    S
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Sarah</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Freelance designer</p>
                  </div>
                </div>
              </Card>
              <Card>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                  "De focus mode helpt me écht gefocust te blijven. Ik word niet meer afgeleid door een lange takenlijst."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#38BDF8] flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Mike</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Product manager</p>
                  </div>
                </div>
              </Card>
              <Card>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                  "Gewoon wat werkt, geen onnodige features. Perfect als je geen tijd hebt om complexe tools te leren."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#38BDF8] flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Anne</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Ondernemer</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* CTA */}
      <Section>
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Klaar om te beginnen?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Start vandaag nog met een rustigere, helderdere planning.
            </p>
            <Button href="/signup" variant="primary" size="lg" className="font-bold mb-4">
              Start gratis
            </Button>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Geen creditcard nodig. Je kunt altijd later upgraden.
            </p>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}

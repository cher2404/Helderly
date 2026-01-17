'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import Section from '../../components/ui/Section';
import Card from '../../components/ui/Card';
import Container from '../../components/ui/Container';

const categories = [
  { id: 'all', label: 'Alles' },
  { id: 'aan-de-slag', label: 'Aan de slag' },
  { id: 'account', label: 'Account & facturatie' },
  { id: 'taken', label: 'Taken & Focus' },
  { id: 'kalender', label: 'Kalender' },
  { id: 'mappen', label: 'Mappen' },
  { id: 'teams', label: 'Teams' },
  { id: 'privacy', label: 'Privacy' },
];

const faqs = [
  {
    category: 'aan-de-slag',
    question: 'Hoe begin ik met Helderly?',
    answer: 'Maak een gratis account aan en voeg je eerste taak toe. Begin met de "Vandaag" pagina. Je kunt altijd later meer toevoegen.',
  },
  {
    category: 'aan-de-slag',
    question: 'Kan ik Helderly op meerdere apparaten gebruiken?',
    answer: 'Ja, werkt op je telefoon, tablet en computer. Je data synchroniseert automatisch. Start op één apparaat en ga verder op een ander.',
  },
  {
    category: 'account',
    question: 'Hoe kan ik mijn account verwijderen?',
    answer: 'Ga naar je account instellingen en kies "Account verwijderen". Je kunt eerst je data exporteren. Daarna wordt je account permanent verwijderd.',
  },
  {
    category: 'account',
    question: 'Kan ik van plan veranderen?',
    answer: 'Ja, op elk moment. Ga naar je account instellingen om te upgraden of downgraden. Wijzigingen gaan direct in, je betaalt alleen voor wat je gebruikt.',
  },
  {
    category: 'taken',
    question: 'Hoe voeg ik een taak toe?',
    answer: 'Gebruik de centrale + knop in de navigatie of het invoerveld op de Vandaag pagina. Klik op een taak om later details toe te voegen, zoals notities of een datum.',
  },
  {
    category: 'taken',
    question: 'Wat is Focus Mode?',
    answer: 'Focus Mode toont één taak tegelijk, groot en rustig. Kies maximaal 3 taken voor vandaag, werk ze een voor een af. Geen afleiding, alleen wat er nu toe doet.',
  },
  {
    category: 'taken',
    question: 'Kan ik taken verwijderen?',
    answer: 'Ja, open een taak en klik op "Verwijderen" onderin het bewerkingspaneel.',
  },
  {
    category: 'kalender',
    question: 'Hoe plan ik een taak voor later?',
    answer: 'Klik op een taak om te bewerken en kies een datum. Je kunt ook "Later" kiezen in Focus Mode om een taak naar later vandaag of morgen te verplaatsen.',
  },
  {
    category: 'mappen',
    question: 'Hoeveel mappen kan ik maken?',
    answer: 'Met Free kun je maximaal 3 mappen maken. Met Pro heb je onbeperkt mappen.',
  },
  {
    category: 'mappen',
    question: 'Kan ik mappen hernoemen?',
    answer: 'Ja, open een map en gebruik de bewerkoptie om de naam te wijzigen.',
  },
  {
    category: 'teams',
    question: 'Wat is het verschil tussen Pro en Teams?',
    answer: 'Teams voegt gedeelde mappen, taken toewijzen, team kalender en comments toe. Pro is voor individueel gebruik.',
  },
  {
    category: 'privacy',
    question: 'Wat gebeurt er met mijn data?',
    answer: 'Je data is van jou. We verkopen geen data, we tonen geen advertenties, en je kunt altijd alles exporteren. Je bent de eigenaar, niet wij.',
  },
  {
    category: 'privacy',
    question: 'Waar wordt mijn data opgeslagen?',
    answer: 'Je data wordt veilig opgeslagen bij betrouwbare leveranciers. Alles is versleuteld en we volgen best practices voor beveiliging. Je kunt altijd je data exporteren.',
  },
];

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Section className="pt-24 pb-12">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Support
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Vind snel antwoorden op je vragen, of stuur ons een bericht.
            </p>

            {/* Search */}
            <div className="mb-12">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Zoek in veelgestelde vragen..."
                className="w-full max-w-lg mx-auto px-6 py-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-foreground placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-[#5B52E6] to-[#2A9DD8] !text-white font-bold drop-shadow-sm [&>*]:!text-white'
                      : 'bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-[#6C63FF]'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQs */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Veelgestelde vragen
            </h2>
            <div className="space-y-4">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq, index) => (
                  <Card key={index}>
                    <h3 className="font-semibold text-foreground mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </p>
                  </Card>
                ))
              ) : (
                <Card>
                  <p className="text-gray-600 dark:text-gray-400 text-center py-4">
                    Geen resultaten gevonden. Probeer een andere zoekterm.
                  </p>
                </Card>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact CTA */}
      <Section background="gradient">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Kun je je vraag niet vinden?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We helpen je graag verder. Stuur ons een bericht en we reageren meestal binnen 24 uur. 
              Geen gedoe, gewoon hulp wanneer je het nodig hebt.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-[#5B52E6] to-[#2A9DD8] !text-white text-lg font-bold drop-shadow-sm hover:from-[#5248D9] hover:to-[#258FC9] transition-all [&>*]:!text-white"
            >
              Neem contact op
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}

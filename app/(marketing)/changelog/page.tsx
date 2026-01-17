import { Metadata } from 'next';
import Section from '../../components/ui/Section';
import Card from '../../components/ui/Card';

export const metadata: Metadata = {
  title: 'Changelog - Helderly',
  description: 'Bekijk alle updates en verbeteringen aan Helderly.',
};

const changelogEntries = [
  {
    date: '2025-01-16',
    version: '1.0.0',
    title: 'Eerste release',
    items: [
      'Vandaag overzicht met taken voor de dag',
      'Focus mode voor één taak tegelijk',
      'Basis kalender functionaliteit',
      'Mappen om taken te organiseren',
      'Mobile-first design met bottom navigatie',
    ],
  },
  {
    date: '2025-01-15',
    version: '0.9.0',
    title: 'Beta release',
    items: [
      'Taak bewerken met side panel',
      'Dagdeel toewijzen (ochtend/middag/avond)',
      'Datum toewijzen aan taken',
      'Later/Morgen functionaliteit in Focus mode',
    ],
  },
  {
    date: '2025-01-10',
    version: '0.8.0',
    title: 'Early access',
    items: [
      'Account systeem',
      'Data synchronisatie tussen apparaten',
      'LocalStorage backup',
      'Basis navigatie',
    ],
  },
];

export default function ChangelogPage() {
  return (
    <>
      <Section className="pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Changelog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Alle updates en verbeteringen aan Helderly
          </p>
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl mx-auto space-y-8">
          {changelogEntries.map((entry) => (
            <Card key={entry.date}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-1">
                    {entry.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(entry.date).toLocaleDateString('nl-NL', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <span className="text-sm font-medium text-[#6C63FF] bg-[#6C63FF]/10 px-3 py-1 rounded-full">
                  v{entry.version}
                </span>
              </div>
              <ul className="space-y-2">
                {entry.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start text-gray-600 dark:text-gray-400"
                  >
                    <span className="text-[#6C63FF] mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}

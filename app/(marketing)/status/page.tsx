import { Metadata } from 'next';
import Section from '../../components/ui/Section';
import Card from '../../components/ui/Card';

export const metadata: Metadata = {
  title: 'Status - Helderly',
  description: 'Controleer de status van Helderly services.',
};

export default function StatusPage() {
  const services = [
    { name: 'Webapp', status: 'Operationeel', description: 'De Helderly web applicatie' },
    { name: 'API', status: 'Operationeel', description: 'Backend API services' },
    { name: 'Database', status: 'Operationeel', description: 'Data opslag en synchronisatie' },
  ];

  return (
    <>
      <Section className="pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Status
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Huidige status van alle Helderly services
          </p>
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl mx-auto space-y-4">
          {services.map((service) => (
            <Card key={service.name}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {service.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium text-foreground">
                    {service.status}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section background="gradient">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Alle systemen functioneren normaal. Als je problemen ervaart, neem dan contact met ons op.
          </p>
          <a
            href="/contact"
            className="text-[#6C63FF] hover:underline font-medium"
          >
            Neem contact op →
          </a>
        </div>
      </Section>
    </>
  );
}

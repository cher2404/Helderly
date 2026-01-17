import { ReactNode } from 'react';
import Container from './Container';

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: 'default' | 'gradient';
}

export default function Section({
  children,
  className = '',
  background = 'default',
}: SectionProps) {
  const backgroundClasses =
    background === 'gradient'
      ? 'gradient-bg'
      : '';

  return (
    <section className={`py-12 md:py-16 lg:py-24 xl:py-32 ${backgroundClasses} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account - Helderly',
  description: 'Beheer je Helderly account en abonnement.',
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

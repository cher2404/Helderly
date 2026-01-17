import Link from 'next/link';
import Logo from '../ui/Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { href: '/product', label: 'Product' },
      { href: '/teams', label: 'Teams' },
      { href: '/hoe-werkt-het', label: 'Hoe werkt het' },
      { href: '/prijzen', label: 'Prijzen' },
      { href: '/changelog', label: 'Changelog' },
    ],
    Support: [
      { href: '/support', label: 'Support' },
      { href: '/contact', label: 'Contact' },
      { href: '/status', label: 'Status' },
    ],
    Juridisch: [
      { href: '/privacy', label: 'Privacy' },
      { href: '/voorwaarden', label: 'Voorwaarden' },
    ],
    Over: [
      { href: '/over-ons', label: 'Over ons' },
    ],
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Logo />
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Rustige planning voor mensen die focussen.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-foreground mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#8C46E0] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            © {currentYear} Helderly. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}

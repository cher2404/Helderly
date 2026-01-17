import { SVGProps } from 'react';

interface LogoProps extends SVGProps<SVGSVGElement> {
  variant?: 'full' | 'icon' | 'text';
  className?: string;
}

export default function Logo({ variant = 'full', className = '', ...props }: LogoProps) {
  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className}`}
        {...props}
      >
        {/* Focus circle with gradient */}
        <circle cx="20" cy="20" r="18" fill="url(#gradient1)" opacity="0.2" />
        <circle cx="20" cy="20" r="14" fill="url(#gradient1)" opacity="0.3" />
        
        {/* Central focus point */}
        <circle cx="20" cy="20" r="6" fill="url(#gradient1)" />
        
        {/* Calendar lines */}
        <path d="M10 10h20M10 16h20M10 22h20M10 28h20" stroke="url(#gradient1)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        
        <defs>
          <linearGradient id="gradient1" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8C46E0" />
            <stop offset="100%" stopColor="#6C63FF" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (variant === 'text') {
    return (
      <span className={`font-semibold bg-gradient-to-r from-[#8C46E0] to-[#6C63FF] bg-clip-text text-transparent ${className}`}>
        Helderly
      </span>
    );
  }

  // Full logo with icon + text
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8"
        {...props}
      >
        {/* Focus circles */}
        <circle cx="16" cy="16" r="14" fill="url(#logoGradient)" opacity="0.15" />
        <circle cx="16" cy="16" r="10" fill="url(#logoGradient)" opacity="0.25" />
        
        {/* Central focus point */}
        <circle cx="16" cy="16" r="5" fill="url(#logoGradient)" />
        
        {/* Subtle planning lines */}
        <path d="M6 8h20M6 14h20M6 20h20" stroke="url(#logoGradient)" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
        
        <defs>
          <linearGradient id="logoGradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8C46E0" />
            <stop offset="100%" stopColor="#6C63FF" />
          </linearGradient>
        </defs>
      </svg>
      <span className="text-xl font-semibold bg-gradient-to-r from-[#8C46E0] to-[#6C63FF] bg-clip-text text-transparent">
        Helderly
      </span>
    </div>
  );
}

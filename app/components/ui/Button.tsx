import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all touch-target';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-[#5B52E6] to-[#2A9DD8] !text-white font-bold drop-shadow-sm hover:from-[#5248D9] hover:to-[#258FC9] shadow-lg shadow-[#6C63FF]/20 hover:shadow-xl hover:shadow-[#6C63FF]/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 [&>*]:!text-white',
    secondary: 'bg-white dark:bg-gray-950 border border-gray-200/60 dark:border-gray-800/60 text-foreground hover:border-gray-300/80 dark:hover:border-gray-700/80 hover:shadow-md hover:shadow-gray-200/30 dark:hover:shadow-gray-900/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200',
    outline: 'border-2 border-[#6C63FF]/60 text-[#6C63FF] hover:bg-[#6C63FF]/5 hover:border-[#6C63FF]/80 hover:shadow-md hover:shadow-[#6C63FF]/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200',
    ghost: 'text-foreground hover:bg-gray-100/80 dark:hover:bg-gray-900/80 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}

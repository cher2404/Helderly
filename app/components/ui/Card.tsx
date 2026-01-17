import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg' | 'none';
}

export default function Card({ children, className = '', padding = 'md' }: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={`rounded-xl bg-white dark:bg-gray-950 border border-gray-100/80 dark:border-gray-900/80 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/40 dark:hover:shadow-gray-900/40 hover:border-gray-200/60 dark:hover:border-gray-800/60 hover:-translate-y-0.5 ${paddingClasses[padding]} ${className}`}
      style={{
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.03), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
      }}
    >
      {children}
    </div>
  );
}

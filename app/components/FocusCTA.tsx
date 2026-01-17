'use client';

import Link from 'next/link';

interface FocusCTAProps {
  focusTaskCount: number;
}

export default function FocusCTA({ focusTaskCount }: FocusCTAProps) {
  const hasFocusTasks = focusTaskCount > 0;

  if (!hasFocusTasks) {
    return null;
  }

  return (
    <Link
      href="/focus"
      className="block w-full px-5 py-3 rounded-lg bg-[#8C46E0] text-center transition-colors hover:bg-[#7B3FD0]"
    >
      <div className="flex items-center justify-center gap-2">
        <span className="text-white text-base font-semibold">
          Start focus ({focusTaskCount} {focusTaskCount === 1 ? 'taak' : 'taken'})
        </span>
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}

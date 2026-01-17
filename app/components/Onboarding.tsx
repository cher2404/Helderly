'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const steps = [
    {
      title: 'Welkom bij Helderly',
      description: 'Rustige planning voor mensen die focussen. Laten we je snel op weg helpen.',
      icon: (
        <svg className="w-16 h-16 text-[#8C46E0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Voeg taken toe',
      description: 'Klik op het + icoon onderaan om snel een taak toe te voegen. Voeg later details toe zoals een datum of map.',
      icon: (
        <svg className="w-16 h-16 text-[#8C46E0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
    },
    {
      title: 'Focus mode',
      description: 'Werk aan één taak tegelijk met focus mode. Klik op "Start focus" om afleiding buiten te houden.',
      icon: (
        <svg className="w-16 h-16 text-[#8C46E0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      title: 'Organiseer met mappen',
      description: 'Maak mappen aan om je taken te organiseren per project of context. Maximaal 3 mappen in het gratis plan.',
      icon: (
        <svg className="w-16 h-16 text-[#8C46E0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    localStorage.setItem('helderly-onboarding-completed', 'true');
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  if (!isVisible) return null;

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-gray-950 rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in zoom-in-95 duration-300">
        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                index <= currentStep
                  ? 'bg-[#8C46E0] w-8'
                  : 'bg-gray-200 dark:bg-gray-800 w-2'
              }`}
            />
          ))}
        </div>

        {/* Step content */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">{currentStepData.icon}</div>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            {currentStepData.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {currentStepData.description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleSkip}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          >
            Overslaan
          </button>
          <button
            onClick={handleNext}
            className="flex-1 px-4 py-3 rounded-lg bg-[#8C46E0] text-white text-sm font-medium hover:bg-[#7B3FD0] transition-colors"
          >
            {currentStep === steps.length - 1 ? 'Beginnen' : 'Volgende'}
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useDailyStore } from '../store/dailyStore';
import { useTaskStore } from '../store/taskStore';
import { Task } from '../types';

interface DailyStartProps {
  onComplete: () => void;
}

export default function DailyStart({ onComplete }: DailyStartProps) {
  const { setDailyQuestion, setSelectedFocusTasks, hasCompletedQuestion, hasSelectedFocusTasks } = useDailyStore();
  const { getTasksForToday } = useTaskStore();
  
  const [step, setStep] = useState<'question' | 'tasks'>('question');
  const [questionAnswer, setQuestionAnswer] = useState('');
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [availableTasks, setAvailableTasks] = useState<Task[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const todayTasks = getTasksForToday().filter((t) => t.status !== 'done');
    setAvailableTasks(todayTasks);
    
    // Check if user has already completed the flow
    if (hasCompletedQuestion() && hasSelectedFocusTasks()) {
      onComplete();
    } else if (hasCompletedQuestion()) {
      setStep('tasks');
    }
  }, [getTasksForToday, hasCompletedQuestion, hasSelectedFocusTasks, onComplete]);

  const handleQuestionSubmit = () => {
    if (questionAnswer.trim()) {
      setDailyQuestion(questionAnswer.trim());
      if (availableTasks.length > 0) {
        setStep('tasks');
      } else {
        // No tasks available, skip task selection
        onComplete();
      }
    }
  };

  const handleTaskToggle = (taskId: string) => {
    setSelectedTasks((prev) => {
      if (prev.includes(taskId)) {
        return prev.filter((id) => id !== taskId);
      } else if (prev.length < 3) {
        return [...prev, taskId];
      }
      return prev;
    });
  };

  const handleTasksSubmit = () => {
    if (selectedTasks.length > 0) {
      setSelectedFocusTasks(selectedTasks);
    }
    onComplete();
  };

  const handleSkip = () => {
    if (step === 'question') {
      // Skip question, but still initialize state
      setDailyQuestion('');
      if (availableTasks.length > 0) {
        setStep('tasks');
      } else {
        onComplete();
      }
    } else {
      // Skip task selection
      onComplete();
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {step === 'question' ? (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 leading-tight">
                Wat maakt vandaag geslaagd?
              </h2>
            </div>
            
            <div className="space-y-4">
              <textarea
                value={questionAnswer}
                onChange={(e) => setQuestionAnswer(e.target.value)}
                placeholder="Bijvoorbeeld: 'Die belangrijke presentatie afronden' of 'Tijd nemen voor mezelf'"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-foreground placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8C46E0] focus:border-transparent resize-none min-h-[120px] text-base"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    handleQuestionSubmit();
                  }
                }}
              />
              
              <div className="flex gap-3">
                <button
                  onClick={handleQuestionSubmit}
                  disabled={!questionAnswer.trim()}
                  className="flex-1 px-5 py-3 rounded-xl bg-[#8C46E0] text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#7B3FD0] transition-colors"
                >
                  Verder
                </button>
                <button
                  onClick={handleSkip}
                  className="px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  Overslaan
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2 leading-tight">
                Kies je focus voor vandaag
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Selecteer maximaal 3 taken waar je vandaag op wilt focussen
              </p>
            </div>
            
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {availableTasks.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-500 py-8">
                  Geen taken beschikbaar voor vandaag.
                </p>
              ) : (
                availableTasks.map((task) => {
                  const isSelected = selectedTasks.includes(task.id);
                  return (
                    <button
                      key={task.id}
                      onClick={() => handleTaskToggle(task.id)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        isSelected
                          ? 'border-[#8C46E0] bg-[#8C46E0]/5 dark:bg-[#8C46E0]/10'
                          : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-gray-300 dark:hover:border-gray-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isSelected
                            ? 'border-[#8C46E0] bg-[#8C46E0]'
                            : 'border-gray-300 dark:border-gray-700'
                        }`}>
                          {isSelected && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium ${isSelected ? 'text-foreground' : 'text-gray-700 dark:text-gray-300'}`}>
                            {task.title}
                          </p>
                          {task.timeOfDay && (
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                              {task.timeOfDay === 'morning' ? 'Ochtend' : task.timeOfDay === 'afternoon' ? 'Middag' : 'Avond'}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
            
            {selectedTasks.length > 0 && (
              <p className="text-xs text-center text-gray-500 dark:text-gray-500">
                {selectedTasks.length} van 3 geselecteerd
              </p>
            )}
            
            <div className="flex gap-3">
              <button
                onClick={handleTasksSubmit}
                className="flex-1 px-5 py-3 rounded-xl bg-[#8C46E0] text-white font-medium hover:bg-[#7B3FD0] transition-colors"
              >
                Start de dag
              </button>
              <button
                onClick={handleSkip}
                className="px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                Overslaan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

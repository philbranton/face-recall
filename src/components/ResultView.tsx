import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Person, GameResult } from '../types';
import { Trophy, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ResultViewProps {
  people: Person[];
  results: GameResult[];
  onRestart: () => void;
}

export function ResultView({ people, results, onRestart }: ResultViewProps) {
  const correctCount = results.filter(r => r.correct).length;
  const score = Math.round((correctCount / people.length) * 100);

  useEffect(() => {
    if (score >= 70) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4f46e5', '#818cf8', '#c7d2fe']
      });
    }
  }, [score]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
          <Trophy className="w-10 h-10 text-yellow-600" />
        </div>
        <h2 className="text-4xl font-bold text-slate-900 mb-2">Game Complete!</h2>
        <p className="text-xl text-slate-600">
          You scored <span className="font-bold text-indigo-600">{score}%</span>
        </p>
        <p className="text-slate-500 mt-1">
          ({correctCount} out of {people.length} correct)
        </p>
        
        <button
          onClick={onRestart}
          className="mt-8 inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95"
        >
          <RotateCcw className="w-5 h-5" />
          Try Again
        </button>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {people.map(person => {
          const result = results.find(r => r.personId === person.id);
          return (
            <div 
              key={person.id}
              className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm"
            >
              <img 
                src={person.imageUrl} 
                className="w-16 h-16 rounded-xl object-cover" 
                alt={person.name} 
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-900 truncate">{person.name}</p>
                <p className="text-sm text-slate-500 truncate">
                  Your answer: <span className={result?.correct ? 'text-emerald-600' : 'text-rose-600'}>
                    {result?.userAnswer || 'Skipped'}
                  </span>
                </p>
              </div>
              {result?.correct ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 text-rose-500 flex-shrink-0" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

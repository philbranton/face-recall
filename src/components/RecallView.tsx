import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Person, GameResult } from '../types';
import { Send } from 'lucide-react';

interface RecallViewProps {
  people: Person[];
  onComplete: (results: GameResult[]) => void;
}

export function RecallView({ people, onComplete }: RecallViewProps) {
  const [shuffledPeople] = useState(() => [...people].sort(() => Math.random() - 0.5));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [results, setResults] = useState<GameResult[]>([]);

  const currentPerson = shuffledPeople[currentIndex];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;

    const isCorrect = answer.trim().toLowerCase() === currentPerson.name.toLowerCase();
    const newResult: GameResult = {
      personId: currentPerson.id,
      correct: isCorrect,
      userAnswer: answer.trim()
    };

    const updatedResults = [...results, newResult];
    setResults(updatedResults);
    setAnswer('');

    if (currentIndex < shuffledPeople.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete(updatedResults);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Who is this?</h2>
        <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          {currentIndex + 1} / {shuffledPeople.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPerson.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100"
        >
          <div className="aspect-square bg-slate-100">
            <img
              src={currentPerson.imageUrl}
              alt="Challenge"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name-input" className="block text-sm font-medium text-slate-700 mb-2">
                  Type their full name
                </label>
                <input
                  id="name-input"
                  type="text"
                  autoFocus
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="First Last"
                  className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-lg font-medium"
                  autoComplete="off"
                />
              </div>
              <button
                type="submit"
                disabled={!answer.trim()}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
        <motion.div 
          className="bg-indigo-600 h-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex) / shuffledPeople.length) * 100}%` }}
        />
      </div>
    </div>
  );
}

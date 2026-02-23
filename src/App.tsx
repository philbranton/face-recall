import { useState, useEffect } from 'react';
import { GameState, Person, GameResult } from './types';
import { generatePeople } from './utils/gameUtils';
import { StartView } from './components/StartView';
import { MemorizeView } from './components/MemorizeView';
import { RecallView } from './components/RecallView';
import { ResultView } from './components/ResultView';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('START');
  const [people, setPeople] = useState<Person[]>([]);
  const [results, setResults] = useState<GameResult[]>([]);

  const startGame = (count: number) => {
    const newPeople = generatePeople(count);
    setPeople(newPeople);
    setResults([]);
    setGameState('MEMORIZE');
  };

  const startRecall = () => {
    setGameState('RECALL');
  };

  const finishGame = (finalResults: GameResult[]) => {
    setResults(finalResults);
    setGameState('FINISHED');
  };

  const restart = () => {
    setGameState('START');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs">FR</span>
            </div>
            <span>FaceRecall</span>
          </div>
          <div className="text-sm font-medium text-slate-500">
            Memory Training Tool
          </div>
        </div>
      </header>

      <main className="relative">
        <AnimatePresence mode="wait">
          {gameState === 'START' && (
            <motion.div
              key="start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <StartView onStart={startGame} />
            </motion.div>
          )}
          {gameState === 'MEMORIZE' && (
            <motion.div
              key="memorize"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MemorizeView people={people} onReady={startRecall} />
            </motion.div>
          )}
          {gameState === 'RECALL' && (
            <motion.div
              key="recall"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <RecallView people={people} onComplete={finishGame} />
            </motion.div>
          )}
          {gameState === 'FINISHED' && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ResultView people={people} results={results} onRestart={restart} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-auto py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} FaceRecall. Built for peak performance.</p>
        </div>
      </footer>
    </div>
  );
}

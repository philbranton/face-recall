import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Brain, Play, Users } from 'lucide-react';

interface StartViewProps {
  onStart: (count: number) => void;
}

export function StartView({ onStart }: StartViewProps) {
  const [selectedCount, setSelectedCount] = useState(10);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-12"
    >
      <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-indigo-200">
        <Brain className="w-12 h-12 text-white" />
      </div>
      <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-4">
        FaceRecall
      </h1>
      <p className="text-lg text-slate-600 max-w-md mb-8">
        Test your memory. Memorize faces and names, then see how many you can recall.
      </p>

      <div className="mb-10 w-full max-w-xs">
        <label className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">
          <Users className="w-4 h-4" />
          Number of Faces: <span className="text-indigo-600 font-bold text-lg">{selectedCount}</span>
        </label>
        <div className="px-2">
          <input
            type="range"
            min="3"
            max="12"
            step="1"
            value={selectedCount}
            onChange={(e) => setSelectedCount(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between mt-3 text-xs font-bold text-slate-400 px-1">
            <span>3</span>
            <span>6</span>
            <span>9</span>
            <span>12</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => onStart(selectedCount)}
        className="group relative flex items-center gap-3 bg-slate-900 text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-slate-800 transition-all active:scale-95 shadow-lg"
      >
        <Play className="w-5 h-5 fill-current" />
        Start Training
      </button>
    </motion.div>
  );
}

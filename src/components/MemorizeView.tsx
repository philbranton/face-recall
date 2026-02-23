import React from 'react';
import { motion } from 'motion/react';
import { Person } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface MemorizeViewProps {
  people: Person[];
  onReady: () => void;
}

export function MemorizeView({ people, onReady }: MemorizeViewProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Memorize Phase</h2>
          <p className="text-slate-600">Take your time to study these {people.length} individuals.</p>
        </div>
        <button
          onClick={onReady}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all active:scale-95 shadow-md"
        >
          <CheckCircle2 className="w-5 h-5" />
          I'm Ready
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {people.map((person, index) => (
          <motion.div
            key={person.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
          >
            <div className="aspect-square relative overflow-hidden bg-slate-100">
              <img
                src={person.imageUrl}
                alt="Face"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-4 text-center">
              <p className="font-bold text-slate-900 truncate">{person.name}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

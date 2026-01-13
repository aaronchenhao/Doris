import React from 'react';
import { GameEvent } from '../types';

interface Props {
  event: GameEvent;
  onChoice: (choiceIdx: number) => void;
  loading?: boolean;
}

export const EventCard: React.FC<Props> = ({ event, onChoice, loading }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 space-y-6 p-8">
        <div className="relative">
          <div className="w-12 h-12 border-3 border-t-transparent border-zinc-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-12 h-12 border-3 border-r-transparent border-zinc-700 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-zinc-400 font-mono text-base tracking-widest">{event.title || "命运推演中"}</p>
          {event.description && (
            <p className="text-zinc-600 text-sm max-w-md">{event.description}</p>
          )}
          <div className="flex items-center justify-center space-x-1 pt-2">
            <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></span>
            <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></span>
            <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-6 space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="space-y-4">
        <div className="flex items-center space-x-3 mb-2">
            <span className={`px-2 py-0.5 text-[10px] font-bold rounded border uppercase tracking-widest ${
                event.type === 'CORE' 
                ? 'border-indigo-500/30 text-indigo-400 bg-indigo-900/10' 
                : 'border-amber-500/30 text-amber-400 bg-amber-900/10'
            }`}>
                {event.type === 'CORE' ? '核心事件' : '随机事件'}
            </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-serif-sc font-bold text-zinc-100 leading-tight">
          {event.title}
        </h2>
        <p className="text-lg text-zinc-300 leading-relaxed font-light">
          {event.description}
        </p>
      </div>

      <div className="space-y-4 pt-4">
        {event.choices.map((choice, idx) => (
          <button
            key={choice.id}
            onClick={() => onChoice(idx)}
            className="group w-full text-left p-5 rounded-sm border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-800 hover:border-zinc-500 transition-all duration-200 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-0.5 h-full bg-zinc-800 group-hover:bg-zinc-200 transition-colors"></div>
            <div className="flex items-start justify-between">
                <span className="font-bold text-lg text-zinc-200 group-hover:text-white">{choice.text}</span>
                <span className="text-xs font-mono text-zinc-600 border border-zinc-800 rounded px-1.5 py-0.5 ml-2 group-hover:border-zinc-500">
                    {choice.id}
                </span>
            </div>
            
            <div className="mt-3 flex flex-wrap gap-3 text-xs font-mono opacity-50 group-hover:opacity-100 transition-opacity">
               {choice.consequences.cashChange !== 0 && (
                 <span className={choice.consequences.cashChange > 0 ? "text-emerald-400" : "text-red-400"}>
                    {choice.consequences.cashChange > 0 ? '+' : ''}¥{choice.consequences.cashChange}
                 </span>
               )}
               {choice.consequences.healthChange !== 0 && (
                 <span className={choice.consequences.healthChange > 0 ? "text-zinc-300" : "text-zinc-500"}>
                    健康 {choice.consequences.healthChange > 0 ? '+' : ''}{choice.consequences.healthChange}
                 </span>
               )}
               {choice.consequences.mentalChange !== 0 && (
                 <span className={choice.consequences.mentalChange > 0 ? "text-zinc-300" : "text-zinc-500"}>
                    心理 {choice.consequences.mentalChange > 0 ? '+' : ''}{choice.consequences.mentalChange}
                 </span>
               )}
               {choice.consequences.moralityChange !== 0 && (
                 <span className={choice.consequences.moralityChange > 0 ? "text-zinc-300" : "text-zinc-500"}>
                    道德 {choice.consequences.moralityChange > 0 ? '+' : ''}{choice.consequences.moralityChange}
                 </span>
               )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
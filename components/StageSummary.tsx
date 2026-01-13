import React from 'react';
import { StageSummaryData } from '../types';

interface Props {
  data: StageSummaryData;
  onContinue: () => void;
}

export const StageSummary: React.FC<Props> = ({ data, onContinue }) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-8 animate-in slide-in-from-bottom-5 duration-700">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-serif-sc font-bold tracking-widest">半年结算</h2>
        <div className="w-16 h-1 bg-zinc-800 mx-auto"></div>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded p-6 space-y-4 font-mono text-sm md:text-base">
        <div className="flex justify-between border-b border-zinc-800 pb-2">
          <span className="text-zinc-400">固定生活开销 (6个月)</span>
          <span className="text-red-400">-¥{data.fixedExpenses.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between border-b border-zinc-800 pb-2">
          <span className="text-zinc-400">理财/资产 收益与亏损</span>
          <span className={data.investmentReturn >= 0 ? "text-emerald-400" : "text-red-400"}>
             {data.investmentReturn >= 0 ? '+' : ''}¥{data.investmentReturn.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between items-center pt-2 text-lg font-bold">
          <span>净资产变动</span>
          <span className={data.netChange >= 0 ? "text-emerald-400" : "text-red-500"}>
            {data.netChange >= 0 ? '+' : ''}¥{data.netChange.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-bold text-zinc-600 uppercase tracking-widest">本阶段回顾</h3>
        <p className="text-zinc-300 italic text-sm leading-relaxed opacity-80 border-l-2 border-zinc-800 pl-4 py-2">
            "{data.eventsSummary}"
        </p>
      </div>

      <button 
        onClick={onContinue}
        className="w-full bg-zinc-100 text-black py-4 font-bold rounded-sm hover:bg-zinc-300 transition-transform active:scale-95 tracking-widest"
      >
        调整资产 / 下一阶段
      </button>
    </div>
  );
};
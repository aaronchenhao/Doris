import React from 'react';
import { PlayerStats } from '../types';
import { Heart, Brain, Scale, Wallet } from 'lucide-react';

interface Props {
  stats: PlayerStats;
  stage: number;
  subStage: number;
}

const StatBar: React.FC<{ icon: React.ReactNode, value: number, color: string, label: string }> = ({ icon, value, color, label }) => (
  <div className="flex flex-col items-center space-y-1 w-full">
    <div className="flex items-center space-x-1 text-[10px] md:text-xs text-zinc-400 uppercase tracking-widest">
      {icon} <span>{label}</span>
    </div>
    <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
      <div 
        className={`h-full transition-all duration-500 ${color}`} 
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
    <div className="text-[10px] font-mono opacity-80">{value}</div>
  </div>
);

export const Dashboard: React.FC<Props> = ({ stats, stage, subStage }) => {
  return (
    <div className="sticky top-0 z-50 w-full bg-zinc-950/90 backdrop-blur border-b border-zinc-800 shadow-2xl">
      <div className="max-w-3xl mx-auto px-4 py-3">
        {/* Top Row: Money & Stage */}
        <div className="flex justify-between items-end mb-3">
          <div className="flex items-center space-x-2 text-zinc-100">
            <Wallet size={18} className="text-zinc-500" />
            <span className={`text-xl font-mono font-bold tracking-tight ${stats.cash < 0 ? 'text-red-500' : 'text-zinc-100'}`}>
              ¥{stats.cash.toLocaleString()}
            </span>
          </div>
          <div className="text-right">
             <div className="text-[10px] text-zinc-500 uppercase tracking-wider">第 {Math.ceil(stage/2)} 年 - {stage % 2 !== 0 ? '上半年' : '下半年'}</div>
             <div className="text-zinc-300 font-serif-sc text-sm">阶段 {stage} <span className="text-zinc-600">/ 6</span></div>
          </div>
        </div>

        {/* Bottom Row: Core Stats */}
        <div className="grid grid-cols-3 gap-6 md:gap-12">
          <StatBar 
            icon={<Heart size={12} />} 
            value={stats.health} 
            color={stats.health < 20 ? "bg-red-600" : "bg-zinc-200"} 
            label="健康" 
          />
          <StatBar 
            icon={<Brain size={12} />} 
            value={stats.mental} 
            color={stats.mental < 20 ? "bg-red-600" : "bg-zinc-400"} 
            label="心理" 
          />
          <StatBar 
            icon={<Scale size={12} />} 
            value={stats.morality} 
            color={stats.morality < 20 ? "bg-red-600" : "bg-zinc-600"} 
            label="道德" 
          />
        </div>
      </div>
    </div>
  );
};
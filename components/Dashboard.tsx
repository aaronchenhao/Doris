import React from 'react';
import { PlayerStats } from '../types';
import { Heart, Brain, Scale, Wallet } from 'lucide-react';

interface Props {
  stats: PlayerStats;
  stage: number;
  subStage: number;
}

const StatBar: React.FC<{ icon: React.ReactNode, value: number, color: string, label: string }> = ({ icon, value, color, label }) => {
  const barColor = value < 20 ? '#ff006e' : value < 50 ? '#ffbe0b' : '#39ff14';
  return (
    <div className="flex flex-col items-center space-y-1 w-full">
      <div className="flex items-center space-x-1 text-[10px] md:text-xs font-mono uppercase tracking-widest" style={{ color: '#00ffff' }}>
        {icon} <span>{label}</span>
      </div>
      <div className="cyber-bar w-full h-2 overflow-hidden" style={{ borderColor: '#1a1a2e' }}>
        <div 
          className="h-full transition-all duration-500 relative" 
          style={{ 
            width: `${Math.max(0, Math.min(100, value))}%`,
            background: `linear-gradient(90deg, ${barColor}, ${barColor}dd)`,
            boxShadow: `0 0 10px ${barColor}`
          }}
        />
      </div>
      <div className="text-[10px] font-mono cyber-blink" style={{ color: barColor }}>{value}</div>
    </div>
  );
};

export const Dashboard: React.FC<Props> = ({ stats, stage, subStage }) => {
  return (
    <div className="sticky top-0 z-50 w-full backdrop-blur border-b shadow-2xl" style={{ 
      background: 'rgba(10, 10, 15, 0.95)', 
      borderColor: '#00ffff',
      boxShadow: '0 4px 20px rgba(0, 255, 255, 0.2)'
    }}>
      <div className="max-w-3xl mx-auto px-4 py-3">
        {/* Top Row: Money & Stage */}
        <div className="flex justify-between items-end mb-3">
          <div className="flex items-center space-x-2">
            <Wallet size={18} style={{ color: '#9d4edd' }} />
            <span className={`text-xl font-mono font-bold tracking-tight ${stats.cash < 0 ? 'text-red-500' : ''}`} style={{ 
              color: stats.cash < 0 ? '#ff006e' : '#39ff14',
              textShadow: stats.cash >= 0 ? '0 0 10px #39ff14' : '0 0 10px #ff006e'
            }}>
              ¥{stats.cash.toLocaleString()}
            </span>
          </div>
          <div className="text-right">
             <div className="text-[10px] font-mono uppercase tracking-wider" style={{ color: '#9d4edd' }}>
               第 {Math.ceil(stage/2)} 年 - {stage % 2 !== 0 ? '上半年' : '下半年'}
             </div>
             <div className="font-serif-sc text-sm cyber-glow" style={{ color: '#00ffff' }}>
               阶段 {stage} <span style={{ color: '#9d4edd' }}>/ 6</span>
             </div>
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
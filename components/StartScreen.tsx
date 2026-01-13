import React, { useState } from 'react';

interface Props {
  onStart: () => void;
}

export const StartScreen: React.FC<Props> = ({ onStart }) => {
  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center space-y-8 animate-in fade-in duration-1000 relative"
      style={{ 
        background: 'linear-gradient(rgba(0, 0, 0, 0.9), rgba(5, 5, 8, 0.95)), url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80&auto=format)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* 扫描线效果 */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(transparent 50%, rgba(0, 255, 255, 0.03) 50%)',
          backgroundSize: '100% 4px',
          animation: 'scanline 8s linear infinite'
      }}
      />
      <div className="relative z-10 w-full">
      <div className="space-y-4">
        <h1 className="text-6xl md:text-8xl font-bold font-serif-sc tracking-widest cyber-glow" style={{ color: '#00ffff' }}>
          城市漂流
        </h1>
        <p className="text-xl md:text-2xl font-mono font-light tracking-widest uppercase" style={{ color: '#9d4edd' }}>
          Urban Drift
        </p>
      </div>

      <div className="max-w-2xl text-lg leading-relaxed space-y-4 font-mono" style={{ color: '#e4e4e7' }}>
        <p>
          22-28岁。单身。手握20万现金。
          <br/>
          在这座吞噬梦想的城市里，你有三年时间。
        </p>
        <div className="cyber-border p-4 text-sm italic" style={{ borderColor: '#00ffff', color: '#9d4edd' }}>
          规则很简单：活下去。<br/>
          没有完美选项，只有"换一种损失方式"。<br/>
          90%的人会跌落底层，你会是那1%的幸存者吗？
        </div>
      </div>
      
      <div className="p-4 cyber-border text-xs max-w-md text-left" style={{ borderColor: '#1a1a2e', backgroundColor: 'rgba(26, 26, 46, 0.3)', color: '#9d4edd' }}>
        <h3 className="font-bold mb-2 font-mono" style={{ color: '#00ffff' }}>【免责声明 & 规则】</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>本故事纯属虚构，仅用于风险策略模拟。</li>
          <li>游戏不鼓励投机、赌博或违法行为。</li>
          <li>若两项核心数值(健康/心理/道德)同时过低，将直接出局。</li>
        </ul>
      </div>

      <button
        onClick={onStart}
        className="cyber-button text-xl font-bold relative z-10"
        style={{ color: '#00ffff', borderColor: '#00ffff' }}
      >
        开始漂流
      </button>
      </div>
    </div>
  );
};
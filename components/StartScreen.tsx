import React, { useState } from 'react';

interface Props {
  onStart: () => void;
}

export const StartScreen: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center space-y-8 animate-in fade-in duration-1000 bg-zinc-950 text-zinc-200">
      <div className="space-y-2">
        <h1 className="text-6xl md:text-8xl font-bold font-serif-sc tracking-widest text-zinc-100">
          城市漂流
        </h1>
        <p className="text-xl md:text-2xl text-zinc-500 font-light tracking-widest uppercase">
          Urban Drift
        </p>
      </div>

      <div className="max-w-2xl text-lg leading-relaxed text-zinc-400 space-y-4">
        <p>
          22-28岁。单身。手握20万现金。
          <br/>
          在这座吞噬梦想的城市里，你有三年时间。
        </p>
        <p className="text-sm border-t border-b border-zinc-800 py-4 italic">
          规则很简单：活下去。<br/>
          没有完美选项，只有"换一种损失方式"。<br/>
          90%的人会跌落底层，你会是那1%的幸存者吗？
        </p>
      </div>
      
      <div className="p-4 bg-zinc-900/50 rounded border border-zinc-800 text-xs text-zinc-600 max-w-md text-left">
        <h3 className="font-bold text-zinc-400 mb-1">【免责声明 & 规则】</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>本故事纯属虚构，仅用于风险策略模拟。</li>
          <li>游戏不鼓励投机、赌博或违法行为。</li>
          <li>若两项核心数值(健康/心理/道德)同时过低，将直接出局。</li>
        </ul>
      </div>

      <button
        onClick={onStart}
        className="px-10 py-4 text-xl font-bold rounded-sm tracking-widest transition-all duration-300 bg-zinc-100 text-black hover:bg-zinc-300 hover:scale-105"
      >
        开始漂流
      </button>
    </div>
  );
};
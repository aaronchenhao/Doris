import React from 'react';
import { PlayerStats } from '../types';

interface Props {
  stats: PlayerStats;
  history: string[];
  deathReason?: string;
}

export const EndingScreen: React.FC<Props> = ({ stats, history, deathReason }) => {
  let outcome = "未知结局";
  let description = "";
  let color = "text-zinc-500";

  // If a specific death reason was passed (Early Termination)
  if (deathReason) {
    outcome = "被城市吞噬";
    description = deathReason;
    color = "text-red-600";
  } else {
    // Normal Ending Logic (After 3 years)
    
    // Bottom 90%
    if (stats.cash < 50000) { // Includes Debt
        outcome = "底层沉沦";
        description = "三年过去了。你不仅没有攒下钱，甚至负债累累。这座城市不相信眼泪，你只是无数个失败案例中的一个。你回到了老家，或者在城中村继续苟延残喘。";
        color = "text-zinc-500";
    }
    // Middle 9%
    else if (stats.cash >= 50000 && stats.cash < 1000000) {
        outcome = "中产陷阱";
        description = "你留下来了。你有了一点积蓄，也许付了首付，但你不敢停下。你成了这座巨大机器中一颗合格的螺丝钉。平庸，疲惫，且安全。";
        color = "text-blue-400";
    }
    // Top 1%
    else {
        outcome = "阶级跨越";
        description = "奇迹发生了。通过运气、策略或某种不可言说的代价，你完成了资本的原始积累。你站在落地窗前俯瞰这座城市，它终于向你低头。";
        color = "text-amber-400";
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center space-y-8 animate-in zoom-in-90 duration-1000 bg-zinc-950 text-zinc-200">
      <div className="space-y-4">
        <h2 className="text-zinc-600 uppercase tracking-[0.2em] text-xs">模拟结束</h2>
        <h1 className={`text-5xl md:text-7xl font-black font-serif-sc ${color}`}>
          {outcome}
        </h1>
      </div>
      
      <p className="max-w-xl text-lg text-zinc-400 leading-relaxed font-light">
        {description}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl bg-zinc-900 p-6 rounded border border-zinc-800">
        <div>
            <div className="text-[10px] text-zinc-600 uppercase">最终现金</div>
            <div className={`font-mono text-xl ${stats.cash < 0 ? 'text-red-500' : 'text-zinc-200'}`}>
                ¥{stats.cash.toLocaleString()}
            </div>
        </div>
        <div>
            <div className="text-[10px] text-zinc-600 uppercase">健康</div>
            <div className="font-mono text-xl">{stats.health}</div>
        </div>
        <div>
            <div className="text-[10px] text-zinc-600 uppercase">心理</div>
            <div className="font-mono text-xl">{stats.mental}</div>
        </div>
        <div>
            <div className="text-[10px] text-zinc-600 uppercase">道德</div>
            <div className="font-mono text-xl">{stats.morality}</div>
        </div>
      </div>

      <button 
        onClick={() => window.location.reload()}
        className="px-8 py-3 border border-zinc-800 hover:bg-zinc-800 transition-colors rounded-sm text-sm uppercase tracking-widest text-zinc-400"
      >
        重新开始
      </button>
    </div>
  );
};
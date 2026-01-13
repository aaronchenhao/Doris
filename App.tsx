import React, { useState, useEffect, useRef } from 'react';
import { StartScreen } from './components/StartScreen';
import { AssetConfigPanel } from './components/AssetConfigPanel';
import { Dashboard } from './components/Dashboard';
import { EventCard } from './components/EventCard';
import { StageSummary } from './components/StageSummary';
import { EndingScreen } from './components/EndingScreen';
import { AudioPlayer } from './components/AudioPlayer';
import { GameState, Phase, Assets, GameEvent, StageSummaryData } from './types';
import { INITIAL_CASH, TOTAL_STAGES, EVENTS_PER_STAGE, FIXED_LIVING_COST_PER_MONTH, RENT_OPTIONS, CRITICAL_THRESHOLDS } from './constants';
import { selectEvent, resetUsedEvents } from './services/eventService';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    phase: Phase.START,
    stage: 1,
    subStage: 0,
    stats: {
      cash: INITIAL_CASH,
      health: 80,
      morality: 60,
      mental: 80,
    },
    assets: {
      rentChoice: 'SHARED',
      carType: 'NONE',
      fixedDeposit: 0,
      investments: { stocks: 0, funds: 0, insurance: false }
    },
    history: [],
    log: []
  });

  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null);
  const [summaryData, setSummaryData] = useState<StageSummaryData | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [gameState.log, currentEvent]);

  // --- Actions ---

  const handleStart = () => {
    setGameState(prev => ({ ...prev, phase: Phase.CONFIG }));
  };

  const handleConfigConfirm = (assets: Assets, remainingCash: number) => {
    // 新阶段开始，重置已使用事件
    resetUsedEvents();
    
    setGameState(prev => {
      const newState = {
        ...prev,
        assets: assets,
        stats: { ...prev.stats, cash: remainingCash },
        subStage: 1
      };
      
      // 直接选择并设置第一个事件
      const event = selectEvent({ ...newState, phase: Phase.PLAY_EVENT });
      setCurrentEvent(event);
      
      return {
        ...newState,
        phase: Phase.PLAY_EVENT
      };
    });
  };

  const checkCriticalFailure = (stats: typeof gameState.stats): string | null => {
    let failurePoints = 0;
    const reasons = [];

    if (stats.health < CRITICAL_THRESHOLDS.HEALTH) { failurePoints++; reasons.push("身体彻底垮了"); }
    if (stats.mental < CRITICAL_THRESHOLDS.MENTAL) { failurePoints++; reasons.push("精神崩溃"); }
    if (stats.morality < CRITICAL_THRESHOLDS.MORALITY) { failurePoints++; reasons.push("社会性死亡"); }
    if (stats.cash < CRITICAL_THRESHOLDS.DEBT) { failurePoints++; reasons.push("巨额债务"); } // Debt check if desired

    if (failurePoints >= 2) {
        return `多重崩溃: ${reasons.join(" + ")}`;
    }
    return null;
  };


  const handleChoice = (choiceIdx: number) => {
    if (!currentEvent) return;
    const choice = currentEvent.choices[choiceIdx];
    const cons = choice.consequences;

    setGameState(prev => {
      const newStats = {
        cash: prev.stats.cash + cons.cashChange,
        health: Math.max(0, Math.min(100, prev.stats.health + cons.healthChange)),
        mental: Math.max(0, Math.min(100, prev.stats.mental + cons.mentalChange)),
        morality: Math.max(0, Math.min(100, prev.stats.morality + cons.moralityChange)),
      };

      const newHistory = [...prev.history, `阶段 ${prev.stage}-${prev.subStage}: ${currentEvent.title} -> 选: ${choice.text}`];
      
      // Check Critical Failure immediately
      const deathReason = checkCriticalFailure(newStats);
      if (deathReason) {
        return { ...prev, stats: newStats, phase: Phase.ENDING, deathReason, history: newHistory };
      }

      let nextPhase: Phase;
      let nextSubStage = prev.subStage + 1;
      let nextStage = prev.stage;
      let nextEvent: GameEvent | null = null;

      if (nextSubStage > EVENTS_PER_STAGE) {
        // 阶段结束，进入总结
        nextPhase = Phase.STAGE_SUMMARY;
      } else {
        // 继续下一个事件
        nextPhase = Phase.PLAY_EVENT;
        // 选择下一个事件
        const tempState = {
          ...prev,
          stats: newStats,
          subStage: nextSubStage,
          stage: nextStage,
          phase: Phase.PLAY_EVENT
        };
        nextEvent = selectEvent(tempState);
      }

      // 如果有下一个事件，立即设置
      if (nextEvent) {
        setCurrentEvent(nextEvent);
      }

      return {
        ...prev,
        stats: newStats,
        history: newHistory,
        phase: nextPhase,
        subStage: nextSubStage,
        stage: nextStage
      };
    });
  };

  // Stage Summary Calculation
  useEffect(() => {
    if (gameState.phase === Phase.STAGE_SUMMARY) {
      const calculateSummary = () => {
        // 1. Fixed Expenses (Rent + Living)
        const rentCost = RENT_OPTIONS.find(r => r.id === gameState.assets.rentChoice)?.costMonth || 0;
        const totalFixed = (rentCost + FIXED_LIVING_COST_PER_MONTH) * 6;

        // 2. Investment Returns (Simplified logic)
        let investmentReturn = 0;
        
        // Stocks (-30% to +40%)
        if (gameState.assets.investments.stocks > 0) {
            const factor = (Math.random() * 0.7) - 0.3; 
            investmentReturn += Math.floor(gameState.assets.investments.stocks * factor);
        }
        // Funds (-10% to +15%)
        if (gameState.assets.investments.funds > 0) {
            const factor = (Math.random() * 0.25) - 0.1;
            investmentReturn += Math.floor(gameState.assets.investments.funds * factor);
        }
        // Fixed Deposit (1.5% for 6 months -> 3% annual)
        if (gameState.assets.fixedDeposit > 0) {
            investmentReturn += Math.floor(gameState.assets.fixedDeposit * 0.015);
        }

        // Car Cost (Gas maintenance)
        if (gameState.assets.carType === 'GAS') {
             // Random maintenance -3000 to 0
             investmentReturn -= Math.floor(Math.random() * 3000);
        }
        // EV: less maintenance
        if (gameState.assets.carType === 'EV') {
             investmentReturn -= Math.floor(Math.random() * 500);
        }

        setSummaryData({
          fixedExpenses: totalFixed,
          investmentReturn: investmentReturn,
          netChange: investmentReturn - totalFixed,
          eventsSummary: gameState.history.slice(-EVENTS_PER_STAGE).join(" | ")
        });
      };
      calculateSummary();
    }
  }, [gameState.phase]);

  const handleSummaryContinue = () => {
    if (!summaryData) return;
    
    setGameState(prev => {
        const newCash = prev.stats.cash + summaryData.netChange;
        
        // End game if stages complete
        if (prev.stage >= TOTAL_STAGES) {
            return {
                ...prev,
                stats: { ...prev.stats, cash: newCash },
                phase: Phase.ENDING
            };
        }

        return {
            ...prev,
            stats: { ...prev.stats, cash: newCash },
            stage: prev.stage + 1,
            phase: Phase.CONFIG, // Go back to config
            subStage: 0
        };
    });
  };

  // --- Render ---

  if (gameState.phase === Phase.START) {
    return <StartScreen onStart={handleStart} />;
  }

  if (gameState.phase === Phase.ENDING) {
    return <EndingScreen stats={gameState.stats} history={gameState.history} deathReason={gameState.deathReason} />;
  }

  return (
    <div className="min-h-screen pb-20 font-sans relative" style={{ 
      background: '#000000',
      color: '#e4e4e7'
    }}>
      <AudioPlayer />
      <Dashboard stats={gameState.stats} stage={gameState.stage} subStage={gameState.subStage} />

      <main className="container mx-auto px-4 py-8">
        
        {gameState.phase === Phase.CONFIG && (
          <AssetConfigPanel 
            currentStage={gameState.stage} 
            currentCash={gameState.stats.cash}
            currentAssets={gameState.assets}
            onConfirm={handleConfigConfirm}
          />
        )}

        {(gameState.phase === Phase.PLAY_EVENT && currentEvent) && (
          <EventCard 
            event={currentEvent} 
            onChoice={handleChoice} 
          />
        )}

        {(gameState.phase === Phase.STAGE_SUMMARY && summaryData) && (
          <StageSummary 
            data={summaryData} 
            onContinue={handleSummaryContinue} 
          />
        )}
        
        <div ref={bottomRef} />
      </main>
    </div>
  );
};

export default App;
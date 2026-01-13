import React from 'react';
import { GameEvent } from '../types';
import { getEventBackground } from '../data/eventBackgrounds';

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

  const backgroundImage = getEventBackground(event.type, event.title);

  return (
    <div 
      className="w-full max-w-4xl mx-auto relative overflow-hidden rounded-lg"
      style={{
        minHeight: '600px',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(5, 5, 8, 0.9)), url(${backgroundImage})`,
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
      
      {/* 内容区域 */}
      <div className="relative z-10 p-6 md:p-10 space-y-8">
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 text-xs font-mono font-bold rounded border uppercase tracking-widest cyber-border" style={{
              borderColor: event.type === 'CORE' ? '#9d4edd' : '#ffbe0b',
              color: event.type === 'CORE' ? '#9d4edd' : '#ffbe0b',
              backgroundColor: event.type === 'CORE' ? 'rgba(157, 78, 221, 0.15)' : 'rgba(255, 190, 11, 0.15)',
              boxShadow: event.type === 'CORE' ? '0 0 15px rgba(157, 78, 221, 0.5)' : '0 0 15px rgba(255, 190, 11, 0.5)'
            }}>
              {event.type === 'CORE' ? '核心事件' : '随机事件'}
            </span>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif-sc font-bold leading-tight cyber-glow" style={{ 
              color: '#00ffff',
              textShadow: '0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.4)'
            }}>
              {event.title}
            </h2>
            <p className="text-lg md:text-xl leading-relaxed font-light font-mono" style={{ 
              color: '#e4e4e7',
              lineHeight: '1.8',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)'
            }}>
              {event.description}
            </p>
          </div>
        </div>

        <div className="space-y-4 pt-6">
          {event.choices.map((choice, idx) => (
            <button
              key={choice.id}
              onClick={() => onChoice(idx)}
              className="group w-full text-left p-6 cyber-border transition-all duration-300 relative overflow-hidden"
              style={{
                borderColor: '#1a1a2e',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#00ffff';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.5), inset 0 0 30px rgba(0, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateX(5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1a1a2e';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              {/* 左侧发光条 */}
              <div 
                className="absolute top-0 left-0 w-1 h-full transition-all duration-300" 
                style={{ 
                  backgroundColor: '#1a1a2e'
                }}
              />
              
              <div className="flex items-start justify-between gap-4">
                <span className="font-bold text-lg md:text-xl font-mono transition-colors flex-1" style={{ 
                  color: '#e4e4e7',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)'
                }}>
                  {choice.text}
                </span>
                <span className="text-sm font-mono border rounded px-3 py-1 cyber-border flex-shrink-0" style={{
                  borderColor: '#9d4edd',
                  color: '#9d4edd',
                  backgroundColor: 'rgba(157, 78, 221, 0.2)',
                  boxShadow: '0 0 10px rgba(157, 78, 221, 0.3)'
                }}>
                  {choice.id}
                </span>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-3 text-xs font-mono opacity-60 group-hover:opacity-100 transition-opacity">
                {choice.consequences.cashChange !== 0 && (
                  <span 
                    className="px-2 py-1 rounded"
                    style={{ 
                      color: choice.consequences.cashChange > 0 ? '#39ff14' : '#ff006e',
                      backgroundColor: choice.consequences.cashChange > 0 ? 'rgba(57, 255, 20, 0.1)' : 'rgba(255, 0, 110, 0.1)',
                      boxShadow: `0 0 10px ${choice.consequences.cashChange > 0 ? 'rgba(57, 255, 20, 0.3)' : 'rgba(255, 0, 110, 0.3)'}`
                    }}
                  >
                    {choice.consequences.cashChange > 0 ? '+' : ''}¥{choice.consequences.cashChange}
                  </span>
                )}
                {choice.consequences.healthChange !== 0 && (
                  <span 
                    className="px-2 py-1 rounded"
                    style={{ 
                      color: choice.consequences.healthChange > 0 ? '#39ff14' : '#ff006e',
                      backgroundColor: choice.consequences.healthChange > 0 ? 'rgba(57, 255, 20, 0.1)' : 'rgba(255, 0, 110, 0.1)'
                    }}
                  >
                    健康 {choice.consequences.healthChange > 0 ? '+' : ''}{choice.consequences.healthChange}
                  </span>
                )}
                {choice.consequences.mentalChange !== 0 && (
                  <span 
                    className="px-2 py-1 rounded"
                    style={{ 
                      color: choice.consequences.mentalChange > 0 ? '#39ff14' : '#ff006e',
                      backgroundColor: choice.consequences.mentalChange > 0 ? 'rgba(57, 255, 20, 0.1)' : 'rgba(255, 0, 110, 0.1)'
                    }}
                  >
                    心理 {choice.consequences.mentalChange > 0 ? '+' : ''}{choice.consequences.mentalChange}
                  </span>
                )}
                {choice.consequences.moralityChange !== 0 && (
                  <span 
                    className="px-2 py-1 rounded"
                    style={{ 
                      color: choice.consequences.moralityChange > 0 ? '#39ff14' : '#ff006e',
                      backgroundColor: choice.consequences.moralityChange > 0 ? 'rgba(57, 255, 20, 0.1)' : 'rgba(255, 0, 110, 0.1)'
                    }}
                  >
                    道德 {choice.consequences.moralityChange > 0 ? '+' : ''}{choice.consequences.moralityChange}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
import { GameState, GameEvent } from '../types';
import { ALL_STAGE_EVENTS, matchesCondition, EventData } from '../data/events';
import { EVENTS_PER_STAGE } from '../constants';

/**
 * 事件选择服务
 * 根据游戏状态选择合适的本地事件
 */

// 已使用的事件ID记录（用于避免重复）
const usedEventIds = new Set<string>();

/**
 * 重置已使用事件记录（新阶段开始时调用）
 */
export function resetUsedEvents(): void {
  usedEventIds.clear();
}

/**
 * 根据游戏状态选择事件
 */
export function selectEvent(gameState: GameState): GameEvent {
  const { stage, subStage, assets } = gameState;
  
  // 确定事件类型：前3个是核心事件，后2个是随机事件
  const isCore = subStage <= 3;
  const eventType = isCore ? 'CORE' : 'RANDOM';
  
  // 获取当前阶段的所有事件
  const stageEvents = ALL_STAGE_EVENTS[stage] || ALL_STAGE_EVENTS[1]; // 如果阶段不存在，使用阶段1的事件
  
  // 筛选符合条件的事件
  let candidates: EventData[] = [];
  
  if (isCore) {
    // 核心事件：必须匹配资产配置条件
    candidates = stageEvents.filter(event => 
      event.type === 'CORE' && 
      matchesCondition(event, assets, stage) &&
      !usedEventIds.has(event.id)
    );
    
    // 如果没有完全匹配的，尝试找没有条件限制的核心事件
    if (candidates.length === 0) {
      candidates = stageEvents.filter(event => 
        event.type === 'CORE' && 
        !event.condition &&
        !usedEventIds.has(event.id)
      );
    }
  } else {
    // 随机事件：可以随机选择，但优先选择未使用过的
    candidates = stageEvents.filter(event => 
      event.type === 'RANDOM' &&
      !usedEventIds.has(event.id)
    );
    
    // 如果所有随机事件都用过了，允许重复使用
    if (candidates.length === 0) {
      candidates = stageEvents.filter(event => event.type === 'RANDOM');
    }
  }
  
  // 如果还是没有候选事件，使用默认事件
  if (candidates.length === 0) {
    console.warn(`[EventService] 阶段 ${stage} 没有可用的事件，使用默认事件`);
    return getDefaultEvent(eventType);
  }
  
  // 随机选择一个候选事件
  const selectedEvent = candidates[Math.floor(Math.random() * candidates.length)];
  
  // 标记为已使用
  usedEventIds.add(selectedEvent.id);
  
  console.log(`[EventService] 选择事件: ${selectedEvent.id} (${eventType}, 阶段 ${stage}-${subStage})`);
  
  // 返回事件（移除id和condition字段，只返回GameEvent）
  const { id, condition, ...gameEvent } = selectedEvent;
  return gameEvent;
}

/**
 * 获取默认事件（当没有匹配的事件时使用）
 */
function getDefaultEvent(type: 'CORE' | 'RANDOM'): GameEvent {
  if (type === 'CORE') {
    return {
      title: '日常的抉择',
      description: '生活中总是充满了各种选择，每一个决定都会带来不同的后果。',
      type: 'CORE',
      choices: [
        {
          id: 'A',
          text: '选择A',
          consequences: {
            cashChange: 0,
            healthChange: -2,
            mentalChange: -2,
            moralityChange: 0,
            narrativeResult: '你做出了选择，但结果并不如你所愿。'
          }
        },
        {
          id: 'B',
          text: '选择B',
          consequences: {
            cashChange: 0,
            healthChange: -2,
            mentalChange: -2,
            moralityChange: 0,
            narrativeResult: '你做出了另一个选择，但同样付出了代价。'
          }
        }
      ]
    };
  } else {
    return {
      title: '意外的插曲',
      description: '生活中总有一些意外，打乱你的计划，让你不得不做出调整。',
      type: 'RANDOM',
      choices: [
        {
          id: 'A',
          text: '应对方式A',
          consequences: {
            cashChange: -500,
            healthChange: -1,
            mentalChange: -2,
            moralityChange: 0,
            narrativeResult: '你处理了意外，但付出了一些代价。'
          }
        },
        {
          id: 'B',
          text: '应对方式B',
          consequences: {
            cashChange: 0,
            healthChange: -2,
            mentalChange: -3,
            moralityChange: 0,
            narrativeResult: '你选择了另一种应对方式，但同样不容易。'
          }
        }
      ]
    };
  }
}

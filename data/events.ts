import { GameEvent } from '../types';
import { Assets } from '../types';

/**
 * 事件数据文件
 * 
 * 结构说明：
 * - 6个阶段，每个阶段包含多个事件池
 * - 核心事件 (CORE): 与资产配置相关，需要根据玩家配置选择
 * - 随机事件 (RANDOM): 突发状况，可以随机选择
 * 
 * 维护指南：
 * 1. 每个事件必须有两个选择（A和B），都没有完美选项
 * 2. 核心事件需要标注适用的资产配置条件（如：有车/无车、独居/合租等）
 * 3. 数值变化要合理，符合"换一种损失方式"的原则
 * 4. 遵循core.md中的设计原则
 */

// 事件条件类型
export interface EventCondition {
  rentChoice?: 'SHARED' | 'SOLO' | 'ANY';
  carType?: 'NONE' | 'GAS' | 'EV' | 'ANY';
  hasStocks?: boolean;
  hasFunds?: boolean;
  hasInsurance?: boolean;
  hasFixedDeposit?: boolean;
  minStage?: number;
  maxStage?: number;
}

export interface EventData extends GameEvent {
  id: string;
  condition?: EventCondition; // 核心事件的条件，用于匹配资产配置
}

// ==================== 阶段1：第1年上半 ====================
export const STAGE_1_EVENTS: EventData[] = [
  // 核心事件 1-1: 租房相关
  {
    id: 's1-core-1',
    title: '合租室友的深夜',
    description: '凌晨两点，隔壁房间传来持续不断的争吵声。你明天还有重要会议，但房租合同里没有关于噪音的条款。',
    type: 'CORE',
    condition: { rentChoice: 'SHARED' },
    choices: [
      {
        id: 'A',
        text: '敲墙提醒，但可能引发冲突',
        consequences: {
          cashChange: 0,
          healthChange: -3,
          mentalChange: -5,
          moralityChange: 0,
          narrativeResult: '对方反而更大声，你整夜未眠，第二天状态极差。'
        }
      },
      {
        id: 'B',
        text: '忍到天亮，用耳塞',
        consequences: {
          cashChange: -50,
          healthChange: -2,
          mentalChange: -3,
          moralityChange: 0,
          narrativeResult: '你买了降噪耳塞，但长期睡眠不足开始影响健康。'
        }
      }
    ]
  },
  {
    id: 's1-core-1-alt',
    title: '独居的代价',
    description: '深夜，你突然感到胸口不适。独自一人住在市中心，叫救护车还是自己打车去医院？',
    type: 'CORE',
    condition: { rentChoice: 'SOLO' },
    choices: [
      {
        id: 'A',
        text: '叫救护车，安全但昂贵',
        consequences: {
          cashChange: -800,
          healthChange: 5,
          mentalChange: 2,
          moralityChange: 0,
          narrativeResult: '检查结果是过度疲劳，但账单让你心疼。'
        }
      },
      {
        id: 'B',
        text: '自己打车，省钱但风险',
        consequences: {
          cashChange: -50,
          healthChange: -2,
          mentalChange: -5,
          moralityChange: 0,
          narrativeResult: '幸好只是胃痛，但独自面对未知的恐惧让你更加焦虑。'
        }
      }
    ]
  },
  // 核心事件 1-2: 通勤相关
  {
    id: 's1-core-2',
    title: '早高峰的地铁',
    description: '连续第三周，你在地铁上被挤得无法呼吸。今天有人因为拥挤发生了争执，车厢里弥漫着压抑的气氛。',
    type: 'CORE',
    condition: { carType: 'NONE' },
    choices: [
      {
        id: 'A',
        text: '提前半小时出门，避开高峰',
        consequences: {
          cashChange: 0,
          healthChange: 2,
          mentalChange: -3,
          moralityChange: 0,
          narrativeResult: '你每天少睡半小时，身体稍好但精神更疲惫。'
        }
      },
      {
        id: 'B',
        text: '继续忍受，但开始考虑买车',
        consequences: {
          cashChange: 0,
          healthChange: -3,
          mentalChange: -5,
          moralityChange: 0,
          narrativeResult: '你开始认真考虑买车的可能性，但资金压力让你焦虑。'
        }
      }
    ]
  },
  {
    id: 's1-core-2-alt',
    title: '第一次事故',
    description: '雨天路滑，你在路口追尾了前车。虽然只是轻微剐蹭，但对方要求私了，金额不小。',
    type: 'CORE',
    condition: { carType: 'GAS' },
    choices: [
      {
        id: 'A',
        text: '私了，快速解决但花钱',
        consequences: {
          cashChange: -3000,
          healthChange: 0,
          mentalChange: -3,
          moralityChange: 0,
          narrativeResult: '你付了钱，但心里总觉得被坑了。'
        }
      },
      {
        id: 'B',
        text: '走保险，流程复杂但可能省钱',
        consequences: {
          cashChange: -500,
          healthChange: -2,
          mentalChange: -5,
          moralityChange: 0,
          narrativeResult: '保险流程拖了半个月，期间你每天挤地铁，身心俱疲。'
        }
      }
    ]
  },
  {
    id: 's1-core-2-alt2',
    title: '充电桩的焦虑',
    description: '你的电车电量告急，但附近的充电桩都被占满。你需要在附近等待，还是冒险开到更远的地方？',
    type: 'CORE',
    condition: { carType: 'EV' },
    choices: [
      {
        id: 'A',
        text: '等待，但可能迟到',
        consequences: {
          cashChange: 0,
          healthChange: 0,
          mentalChange: -4,
          moralityChange: 0,
          narrativeResult: '你等了四十分钟才充上电，上班迟到被扣了全勤奖。'
        }
      },
      {
        id: 'B',
        text: '冒险开到更远的地方',
        consequences: {
          cashChange: -200,
          healthChange: -2,
          mentalChange: -3,
          moralityChange: 0,
          narrativeResult: '你差点没电，最后高价在私人充电站充了电，还因为焦虑过度紧张。'
        }
      }
    ]
  },
  // 核心事件 1-3: 职场压力
  {
    id: 's1-core-3',
    title: '加班还是拒绝',
    description: '老板要求你周末加班完成一个紧急项目，没有加班费，但会影响你的晋升机会。',
    type: 'CORE',
    condition: {},
    choices: [
      {
        id: 'A',
        text: '接受，牺牲休息时间',
        consequences: {
          cashChange: 0,
          healthChange: -5,
          mentalChange: -4,
          moralityChange: 0,
          narrativeResult: '你连续工作了两天，身体和精神都到了极限。'
        }
      },
      {
        id: 'B',
        text: '拒绝，保护自己的时间',
        consequences: {
          cashChange: 0,
          healthChange: 2,
          mentalChange: -2,
          moralityChange: 0,
          narrativeResult: '你保住了周末，但明显感觉到老板对你的态度变冷了。'
        }
      }
    ]
  },
  // 随机事件 1-4
  {
    id: 's1-random-1',
    title: '突如其来的病',
    description: '你突然发高烧，需要请假看病。但你的工作堆积如山，请假意味着要面对更大的压力。',
    type: 'RANDOM',
    choices: [
      {
        id: 'A',
        text: '请假看病，但工作堆积',
        consequences: {
          cashChange: -300,
          healthChange: 5,
          mentalChange: -3,
          moralityChange: 0,
          narrativeResult: '你看了医生吃了药，但回来发现工作堆积如山，压力更大。'
        }
      },
      {
        id: 'B',
        text: '硬撑上班，吃药应付',
        consequences: {
          cashChange: -100,
          healthChange: -5,
          mentalChange: -4,
          moralityChange: 0,
          narrativeResult: '你硬撑着上班，但病情拖得更久，身体和精神都受到更大伤害。'
        }
      }
    ]
  },
  // 随机事件 1-5
  {
    id: 's1-random-2',
    title: '朋友的求助',
    description: '一个很久没联系的朋友突然找你借钱，说是急用，承诺下个月还。你手头并不宽裕。',
    type: 'RANDOM',
    choices: [
      {
        id: 'A',
        text: '借一部分，但可能收不回',
        consequences: {
          cashChange: -2000,
          healthChange: 0,
          mentalChange: -3,
          moralityChange: 2,
          narrativeResult: '你借了钱，但心里一直担心对方不还，影响心情。'
        }
      },
      {
        id: 'B',
        text: '拒绝，但可能失去朋友',
        consequences: {
          cashChange: 0,
          healthChange: 0,
          mentalChange: -2,
          moralityChange: -2,
          narrativeResult: '你拒绝了，朋友明显不高兴，你们的关系变得尴尬。'
        }
      }
    ]
  }
];

// ==================== 阶段2：第1年下半年 ====================
export const STAGE_2_EVENTS: EventData[] = [
  // 核心事件 2-1: 投资相关
  {
    id: 's2-core-1',
    title: '股市的波动',
    description: '你持有的股票突然大跌，账面亏损不小。是割肉止损，还是继续持有等待反弹？',
    type: 'CORE',
    condition: { hasStocks: true },
    choices: [
      {
        id: 'A',
        text: '割肉止损，减少损失',
        consequences: {
          cashChange: -5000,
          healthChange: 0,
          mentalChange: -5,
          moralityChange: 0,
          narrativeResult: '你卖掉了股票，承受了实际亏损，心情低落。'
        }
      },
      {
        id: 'B',
        text: '继续持有，等待反弹',
        consequences: {
          cashChange: 0,
          healthChange: -2,
          mentalChange: -6,
          moralityChange: 0,
          narrativeResult: '你选择等待，但每天盯着股价让你焦虑不安，睡眠质量下降。'
        }
      }
    ]
  },
  {
    id: 's2-core-1-alt',
    title: '定存的诱惑',
    description: '银行推出高息定存活动，但你现有的定存还没到期。提前取出会损失利息，不取又错过机会。',
    type: 'CORE',
    condition: { hasFixedDeposit: true },
    choices: [
      {
        id: 'A',
        text: '提前取出，转存高息',
        consequences: {
          cashChange: -500,
          healthChange: 0,
          mentalChange: -2,
          moralityChange: 0,
          narrativeResult: '你损失了部分利息，但获得了更高的利率，心情复杂。'
        }
      },
      {
        id: 'B',
        text: '保持现状，不折腾',
        consequences: {
          cashChange: 0,
          healthChange: 0,
          mentalChange: -3,
          moralityChange: 0,
          narrativeResult: '你错过了机会，心里一直后悔没有及时调整。'
        }
      }
    ]
  },
  {
    id: 's2-core-1-alt2',
    title: '投资的焦虑',
    description: '你还没有任何投资，看着身边的人都在讨论理财，你开始焦虑是否应该入场。',
    type: 'CORE',
    condition: { hasStocks: false, hasFunds: false },
    choices: [
      {
        id: 'A',
        text: '小额试水，但可能亏损',
        consequences: {
          cashChange: -3000,
          healthChange: 0,
          mentalChange: -4,
          moralityChange: 0,
          narrativeResult: '你投入了一小笔钱，但市场波动让你每天都提心吊胆。'
        }
      },
      {
        id: 'B',
        text: '继续观望，但可能错过机会',
        consequences: {
          cashChange: 0,
          healthChange: 0,
          mentalChange: -3,
          moralityChange: 0,
          narrativeResult: '你选择观望，但看着别人赚钱，心里越来越焦虑。'
        }
      }
    ]
  },
  // 核心事件 2-2: 租房续约
  {
    id: 's2-core-2',
    title: '房租要涨了',
    description: '房东通知你，下个季度房租要涨500元。你可以选择续租，或者重新找房子。',
    type: 'CORE',
    condition: { rentChoice: 'SHARED' },
    choices: [
      {
        id: 'A',
        text: '接受涨价，避免搬家麻烦',
        consequences: {
          cashChange: 0,
          healthChange: 0,
          mentalChange: -3,
          moralityChange: 0,
          narrativeResult: '你接受了涨价，但每个月的压力更大了。'
        }
      },
      {
        id: 'B',
        text: '重新找房，但可能更远更差',
        consequences: {
          cashChange: -1000,
          healthChange: -2,
          mentalChange: -4,
          moralityChange: 0,
          narrativeResult: '你花了很多时间找房，最后找到的房子更远，通勤时间更长。'
        }
      }
    ]
  },
  {
    id: 's2-core-2-alt',
    title: '独居的成本',
    description: '你的独居公寓出现了各种小问题：水管漏水、电路故障。维修费用不菲，但找房东处理又很麻烦。',
    type: 'CORE',
    condition: { rentChoice: 'SOLO' },
    choices: [
      {
        id: 'A',
        text: '自己花钱修，快速解决',
        consequences: {
          cashChange: -1500,
          healthChange: 0,
          mentalChange: -2,
          moralityChange: 0,
          narrativeResult: '你花了钱快速解决了问题，但心里觉得不公平。'
        }
      },
      {
        id: 'B',
        text: '找房东处理，但可能拖很久',
        consequences: {
          cashChange: 0,
          healthChange: -3,
          mentalChange: -5,
          moralityChange: 0,
          narrativeResult: '房东拖了两周才来修，期间你生活很不方便，心情烦躁。'
        }
      }
    ]
  },
  // 核心事件 2-3: 职场发展
  {
    id: 's2-core-3',
    title: '跳槽的机会',
    description: '猎头联系你，有一个薪资更高的职位，但需要你立即入职，而且工作强度更大。',
    type: 'CORE',
    condition: {},
    choices: [
      {
        id: 'A',
        text: '接受，追求更高收入',
        consequences: {
          cashChange: 2000,
          healthChange: -4,
          mentalChange: -5,
          moralityChange: 0,
          narrativeResult: '你跳槽了，收入增加了，但新工作压力巨大，你开始怀疑是否值得。'
        }
      },
      {
        id: 'B',
        text: '拒绝，保持现状',
        consequences: {
          cashChange: 0,
          healthChange: 2,
          mentalChange: -3,
          moralityChange: 0,
          narrativeResult: '你拒绝了机会，但看着身边人都在跳槽涨薪，你开始怀疑自己的选择。'
        }
      }
    ]
  },
  // 随机事件 2-4
  {
    id: 's2-random-1',
    title: '意外的支出',
    description: '你的手机突然坏了，需要换新。是买便宜的凑合用，还是买好一点的但超出预算？',
    type: 'RANDOM',
    choices: [
      {
        id: 'A',
        text: '买便宜的，但可能很快又坏',
        consequences: {
          cashChange: -1500,
          healthChange: 0,
          mentalChange: -2,
          moralityChange: 0,
          narrativeResult: '你买了便宜的手机，但用起来很不顺手，影响工作效率。'
        }
      },
      {
        id: 'B',
        text: '买好一点的，但超出预算',
        consequences: {
          cashChange: -4000,
          healthChange: 0,
          mentalChange: -3,
          moralityChange: 0,
          narrativeResult: '你买了更好的手机，但花掉了你一个月的积蓄，压力更大。'
        }
      }
    ]
  },
  // 随机事件 2-5
  {
    id: 's2-random-2',
    title: '家人的期望',
    description: '父母打电话来，暗示你应该考虑买房或者回老家发展。你感到压力，但现在的条件都不允许。',
    type: 'RANDOM',
    choices: [
      {
        id: 'A',
        text: '如实说明情况，但可能让父母担心',
        consequences: {
          cashChange: 0,
          healthChange: 0,
          mentalChange: -4,
          moralityChange: -2,
          narrativeResult: '你告诉了父母实情，他们虽然理解但明显失望，你心里很愧疚。'
        }
      },
      {
        id: 'B',
        text: '敷衍过去，但内心压力更大',
        consequences: {
          cashChange: 0,
          healthChange: -2,
          mentalChange: -5,
          moralityChange: 0,
          narrativeResult: '你敷衍了父母，但内心的压力和愧疚感让你更加焦虑。'
        }
      }
    ]
  }
];

// ==================== 阶段3：第2年上半年 ====================
export const STAGE_3_EVENTS: EventData[] = [
  {
    id: 's3-core-1',
    title: '工作的瓶颈',
    description: '你在当前岗位已经工作了一段时间，感觉遇到了瓶颈。是继续深耕，还是寻找新的方向？',
    type: 'CORE',
    condition: {},
    choices: [
      {
        id: 'A',
        text: '继续深耕，但可能错过机会',
        consequences: {
          cashChange: 0,
          healthChange: 0,
          mentalChange: -4,
          moralityChange: 0,
          narrativeResult: '你选择继续，但看着同龄人都在进步，你开始怀疑自己的选择。'
        }
      },
      {
        id: 'B',
        text: '尝试新方向，但风险很大',
        consequences: {
          cashChange: -2000,
          healthChange: -3,
          mentalChange: -5,
          moralityChange: 0,
          narrativeResult: '你尝试了新方向，但起步很艰难，收入和稳定性都受到影响。'
        }
      }
    ]
  },
  {
    id: 's3-core-2',
    title: '保险的理赔',
    description: '你因为工作压力过大导致身体不适，需要就医。如果你买了重疾险，可以申请理赔。',
    type: 'CORE',
    condition: { hasInsurance: true },
    choices: [
      {
        id: 'A',
        text: '申请理赔，但流程复杂',
        consequences: {
          cashChange: 2000,
          healthChange: 3,
          mentalChange: -3,
          moralityChange: 0,
          narrativeResult: '你获得了理赔，但整个流程让你身心俱疲。'
        }
      },
      {
        id: 'B',
        text: '自费治疗，快速解决',
        consequences: {
          cashChange: -1500,
          healthChange: 5,
          mentalChange: 2,
          moralityChange: 0,
          narrativeResult: '你自费治疗，快速恢复了，但花了不少钱。'
        }
      }
    ]
  },
  {
    id: 's3-core-2-alt',
    title: '没有保险的代价',
    description: '你因为工作压力过大导致身体不适，需要就医。你没有买保险，所有费用都要自付。',
    type: 'CORE',
    condition: { hasInsurance: false },
    choices: [
      {
        id: 'A',
        text: '去大医院，但费用高',
        consequences: {
          cashChange: -2000,
          healthChange: 5,
          mentalChange: -2,
          moralityChange: 0,
          narrativeResult: '你去了大医院，得到了好的治疗，但费用让你心疼。'
        }
      },
      {
        id: 'B',
        text: '去小诊所，省钱但可能效果差',
        consequences: {
          cashChange: -500,
          healthChange: 2,
          mentalChange: -4,
          moralityChange: 0,
          narrativeResult: '你去了小诊所，花了更少的钱，但治疗效果一般，恢复较慢。'
        }
      }
    ]
  },
  {
    id: 's3-core-3',
    title: '资产的重置',
    description: '你开始重新审视自己的资产配置。是继续当前的策略，还是做出调整？',
    type: 'CORE',
    condition: {},
    choices: [
      {
        id: 'A',
        text: '保持现状，但可能错过优化机会',
        consequences: {
          cashChange: 0,
          healthChange: 0,
          mentalChange: -3,
          moralityChange: 0,
          narrativeResult: '你保持了现状，但心里一直担心是否应该调整。'
        }
      },
      {
        id: 'B',
        text: '做出调整，但需要承担交易成本',
        consequences: {
          cashChange: -1000,
          healthChange: 0,
          mentalChange: -2,
          moralityChange: 0,
          narrativeResult: '你调整了资产配置，但交易成本和一些损失让你心疼。'
        }
      }
    ]
  },
  {
    id: 's3-random-1',
    title: '市场的波动',
    description: '你持有的基金突然大跌，你开始怀疑自己的投资决策。',
    type: 'RANDOM',
    condition: { hasFunds: true },
    choices: [
      {
        id: 'A',
        text: '赎回止损',
        consequences: {
          cashChange: -3000,
          healthChange: 0,
          mentalChange: -4,
          moralityChange: 0,
          narrativeResult: '你赎回了基金，承受了亏损，心情低落。'
        }
      },
      {
        id: 'B',
        text: '继续持有',
        consequences: {
          cashChange: 0,
          healthChange: -2,
          mentalChange: -6,
          moralityChange: 0,
          narrativeResult: '你选择继续持有，但每天看着亏损让你焦虑不安。'
        }
      }
    ]
  },
  {
    id: 's3-random-2',
    title: '意外的机会',
    description: '一个朋友邀请你参与一个投资项目，回报看起来很诱人，但风险也不小。',
    type: 'RANDOM',
    choices: [
      {
        id: 'A',
        text: '参与投资，但可能亏损',
        consequences: {
          cashChange: -5000,
          healthChange: 0,
          mentalChange: -5,
          moralityChange: 0,
          narrativeResult: '你参与了投资，但项目进展不如预期，你开始担心本金。'
        }
      },
      {
        id: 'B',
        text: '拒绝，但可能错过机会',
        consequences: {
          cashChange: 0,
          healthChange: 0,
          mentalChange: -3,
          moralityChange: 0,
          narrativeResult: '你拒绝了，但后来听说项目成功了，你开始后悔。'
        }
      }
    ]
  }
];

// ==================== 阶段4：第2年下半年 ====================
export const STAGE_4_EVENTS: EventData[] = [
  // 核心事件 4-1: 职场危机
  {
    id: 's4-core-1',
    title: '裁员的风声',
    description: '公司传出要裁员的消息，你的部门也在名单上。是提前找下家，还是等待结果？',
    type: 'CORE',
    condition: {},
    choices: [
      {
        id: 'A',
        text: '提前跳槽，但可能错过补偿',
        consequences: {
          cashChange: 0,
          healthChange: -2,
          mentalChange: -4,
          moralityChange: 0,
          narrativeResult: '你提前跳槽了，避免了被裁的风险，但失去了可能的补偿金。'
        }
      },
      {
        id: 'B',
        text: '等待结果，但可能被裁',
        consequences: {
          cashChange: 5000,
          healthChange: -3,
          mentalChange: -6,
          moralityChange: 0,
          narrativeResult: '你被裁了，拿到了补偿金，但找新工作的压力让你焦虑不安。'
        }
      }
    ]
  },
  // 核心事件 4-2: 投资决策
  {
    id: 's4-core-2',
    title: '股票的回本',
    description: '你之前亏损的股票终于回本了，甚至还有小幅盈利。是继续持有还是卖出？',
    type: 'CORE',
    condition: { hasStocks: true },
    choices: [
      {
        id: 'A',
        text: '卖出获利，但可能错过上涨',
        consequences: {
          cashChange: 2000,
          healthChange: 0,
          mentalChange: -2,
          moralityChange: 0,
          narrativeResult: '你卖出了股票，获得了收益，但后来看到继续上涨你有些后悔。'
        }
      },
      {
        id: 'B',
        text: '继续持有，但可能再次下跌',
        consequences: {
          cashChange: 0,
          healthChange: -1,
          mentalChange: -5,
          moralityChange: 0,
          narrativeResult: '你选择继续持有，但每天盯着股价让你焦虑，担心再次亏损。'
        }
      }
    ]
  },
  {
    id: 's4-core-2-alt',
    title: '定存的到期',
    description: '你的定存到期了，银行利率下降了。是续存还是取出做其他投资？',
    type: 'CORE',
    condition: { hasFixedDeposit: true },
    choices: [
      {
        id: 'A',
        text: '续存，但利率更低',
        consequences: {
          cashChange: 0,
          healthChange: 0,
          mentalChange: -2,
          moralityChange: 0,
          narrativeResult: '你续存了，但利率下降让你觉得收益太少。'
        }
      },
      {
        id: 'B',
        text: '取出投资，但风险更大',
        consequences: {
          cashChange: -1000,
          healthChange: 0,
          mentalChange: -4,
          moralityChange: 0,
          narrativeResult: '你取出了定存进行投资，但市场波动让你损失了一些本金。'
        }
      }
    ]
  },
  {
    id: 's4-core-2-alt2',
    title: '投资的焦虑',
    description: '你看着身边的人都在讨论投资理财，而你还没有任何投资。是否应该入场？',
    type: 'CORE',
    condition: { hasStocks: false, hasFunds: false },
    choices: [
      {
        id: 'A',
        text: '开始投资，但可能亏损',
        consequences: {
          cashChange: -4000,
          healthChange: 0,
          mentalChange: -5,
          moralityChange: 0,
          narrativeResult: '你开始投资了，但市场波动让你每天都提心吊胆，担心亏损。'
        }
      },
      {
        id: 'B',
        text: '继续观望，但可能错过机会',
        consequences: {
          cashChange: 0,
          healthChange: 0,
          mentalChange: -4,
          moralityChange: 0,
          narrativeResult: '你选择观望，但看着别人赚钱，心里的焦虑越来越重。'
        }
      }
    ]
  },
  // 核心事件 4-3: 生活成本
  {
    id: 's4-core-3',
    title: '房租的谈判',
    description: '房东又要涨房租了，这次涨幅不小。你可以选择谈判，或者直接接受。',
    type: 'CORE',
    condition: { rentChoice: 'SHARED' },
    choices: [
      {
        id: 'A',
        text: '谈判，但可能谈崩',
        consequences: {
          cashChange: -500,
          healthChange: -1,
          mentalChange: -4,
          moralityChange: 0,
          narrativeResult: '你尝试谈判，但房东态度强硬，最终只降了一点，过程让你很疲惫。'
        }
      },
      {
        id: 'B',
        text: '接受涨价，但压力更大',
        consequences: {
          cashChange: 0,
          healthChange: -2,
          mentalChange: -5,
          moralityChange: 0,
          narrativeResult: '你接受了涨价，但每个月的压力更大了，开始考虑是否应该搬家。'
        }
      }
    ]
  },
  {
    id: 's4-core-3-alt',
    title: '独居的孤独',
    description: '你独自住在市中心，虽然方便但很孤独。朋友建议你考虑合租，可以省钱也有伴。',
    type: 'CORE',
    condition: { rentChoice: 'SOLO' },
    choices: [
      {
        id: 'A',
        text: '继续独居，但成本高',
        consequences: {
          cashChange: 0,
          healthChange: 0,
          mentalChange: -4,
          moralityChange: 0,
          narrativeResult: '你选择继续独居，但孤独感和经济压力让你越来越焦虑。'
        }
      },
      {
        id: 'B',
        text: '考虑合租，但失去隐私',
        consequences: {
          cashChange: 2000,
          healthChange: -2,
          mentalChange: -3,
          moralityChange: 0,
          narrativeResult: '你开始考虑合租，虽然能省钱，但想到要失去隐私和自由，你有些犹豫。'
        }
      }
    ]
  },
  // 随机事件 4-1
  {
    id: 's4-random-1',
    title: '身体的警告',
    description: '你开始频繁感到疲劳和不适，体检报告显示有些指标异常。需要重视但治疗费用不菲。',
    type: 'RANDOM',
    choices: [
      {
        id: 'A',
        text: '积极治疗，但费用高',
        consequences: {
          cashChange: -3000,
          healthChange: 5,
          mentalChange: -2,
          moralityChange: 0,
          narrativeResult: '你积极治疗了，身体好转了，但医疗费用让你心疼。'
        }
      },
      {
        id: 'B',
        text: '先观察，但可能恶化',
        consequences: {
          cashChange: -500,
          healthChange: -4,
          mentalChange: -5,
          moralityChange: 0,
          narrativeResult: '你选择先观察，但症状没有好转，你开始担心是否应该早点治疗。'
        }
      }
    ]
  },
  // 随机事件 4-2
  {
    id: 's4-random-2',
    title: '朋友的婚礼',
    description: '一个好朋友要结婚了，邀请你做伴郎/伴娘。需要准备礼金和服装，费用不小。',
    type: 'RANDOM',
    choices: [
      {
        id: 'A',
        text: '参加并准备充分，但花费大',
        consequences: {
          cashChange: -2000,
          healthChange: 0,
          mentalChange: 2,
          moralityChange: 1,
          narrativeResult: '你参加了婚礼，朋友很开心，但花费让你有些压力。'
        }
      },
      {
        id: 'B',
        text: '简单参加，但可能显得不够重视',
        consequences: {
          cashChange: -800,
          healthChange: 0,
          mentalChange: -3,
          moralityChange: -1,
          narrativeResult: '你简单参加了，但感觉朋友有些失望，你心里有些愧疚。'
        }
      }
    ]
  }
];

// ==================== 阶段5：第3年上半年 ====================
export const STAGE_5_EVENTS: EventData[] = [
  // 核心事件 5-1: 职业发展
  {
    id: 's5-core-1',
    title: '晋升的机会',
    description: '公司有一个晋升机会，但需要你承担更多责任和压力。是争取还是放弃？',
    type: 'CORE',
    condition: {},
    choices: [
      {
        id: 'A',
        text: '争取晋升，但压力巨大',
        consequences: {
          cashChange: 3000,
          healthChange: -5,
          mentalChange: -6,
          moralityChange: 0,
          narrativeResult: '你获得了晋升，收入增加了，但工作压力让你身心俱疲。'
        }
      },
      {
        id: 'B',
        text: '放弃机会，保持现状',
        consequences: {
          cashChange: 0,
          healthChange: 2,
          mentalChange: -4,
          moralityChange: 0,
          narrativeResult: '你放弃了晋升机会，压力小了，但看着别人升职加薪，你开始怀疑自己的选择。'
        }
      }
    ]
  },
  // 核心事件 5-2: 资产调整
  {
    id: 's5-core-2',
    title: '车辆的维护',
    description: '你的车需要大修了，费用不菲。是修还是考虑换车？',
    type: 'CORE',
    condition: { carType: 'GAS' },
    choices: [
      {
        id: 'A',
        text: '大修，但可能很快又坏',
        consequences: {
          cashChange: -4000,
          healthChange: 0,
          mentalChange: -3,
          moralityChange: 0,
          narrativeResult: '你花了大价钱修车，但担心很快又会出现新问题。'
        }
      },
      {
        id: 'B',
        text: '考虑换车，但资金压力大',
        consequences: {
          cashChange: -15000,
          healthChange: 0,
          mentalChange: -5,
          moralityChange: 0,
          narrativeResult: '你换了新车，但资金压力让你焦虑，开始担心未来的财务状况。'
        }
      }
    ]
  },
  {
    id: 's5-core-2-alt',
    title: '电车的电池',
    description: '你的电车电池开始衰减，续航明显下降。是更换电池还是考虑换车？',
    type: 'CORE',
    condition: { carType: 'EV' },
    choices: [
      {
        id: 'A',
        text: '更换电池，但费用高',
        consequences: {
          cashChange: -8000,
          healthChange: 0,
          mentalChange: -3,
          moralityChange: 0,
          narrativeResult: '你更换了电池，续航恢复了，但费用让你心疼。'
        }
      },
      {
        id: 'B',
        text: '继续使用，但续航焦虑',
        consequences: {
          cashChange: 0,
          healthChange: -2,
          mentalChange: -5,
          moralityChange: 0,
          narrativeResult: '你选择继续使用，但续航焦虑让你每次出门都担心，影响心情。'
        }
      }
    ]
  },
  {
    id: 's5-core-2-alt2',
    title: '买车的冲动',
    description: '你一直挤地铁，看着身边有车的人，你开始认真考虑是否应该买车。',
    type: 'CORE',
    condition: { carType: 'NONE' },
    choices: [
      {
        id: 'A',
        text: '买油车，但维护成本高',
        consequences: {
          cashChange: -50000,
          healthChange: 3,
          mentalChange: 2,
          moralityChange: 0,
          narrativeResult: '你买了油车，通勤方便了，但维护和油费让你压力不小。'
        }
      },
      {
        id: 'B',
        text: '继续挤地铁，但身心疲惫',
        consequences: {
          cashChange: 0,
          healthChange: -4,
          mentalChange: -5,
          moralityChange: 0,
          narrativeResult: '你选择继续挤地铁，但长期的身心消耗让你越来越疲惫。'
        }
      }
    ]
  },
  // 核心事件 5-3: 投资风险
  {
    id: 's5-core-3',
    title: '投资的回撤',
    description: '你的投资出现了较大回撤，账面亏损不小。是止损还是继续持有？',
    type: 'CORE',
    condition: { hasStocks: true },
    choices: [
      {
        id: 'A',
        text: '止损离场，承受实际亏损',
        consequences: {
          cashChange: -8000,
          healthChange: 0,
          mentalChange: -6,
          moralityChange: 0,
          narrativeResult: '你止损离场了，承受了实际亏损，心情沉重，开始怀疑自己的投资能力。'
        }
      },
      {
        id: 'B',
        text: '继续持有，但可能继续下跌',
        consequences: {
          cashChange: 0,
          healthChange: -3,
          mentalChange: -7,
          moralityChange: 0,
          narrativeResult: '你选择继续持有，但每天看着亏损扩大让你焦虑不安，睡眠质量下降。'
        }
      }
    ]
  },
  {
    id: 's5-core-3-alt',
    title: '保险的理赔',
    description: '你因为工作压力导致身体出现问题，需要治疗。如果你有保险，可以申请理赔。',
    type: 'CORE',
    condition: { hasInsurance: true },
    choices: [
      {
        id: 'A',
        text: '申请理赔，但流程复杂',
        consequences: {
          cashChange: 3000,
          healthChange: 4,
          mentalChange: -4,
          moralityChange: 0,
          narrativeResult: '你获得了理赔，但整个流程让你身心俱疲，感觉被各种手续折磨。'
        }
      },
      {
        id: 'B',
        text: '自费治疗，快速解决',
        consequences: {
          cashChange: -2500,
          healthChange: 5,
          mentalChange: 1,
          moralityChange: 0,
          narrativeResult: '你自费治疗了，快速恢复了，但费用让你心疼，后悔没有早点用保险。'
        }
      }
    ]
  },
  {
    id: 's5-core-3-alt2',
    title: '理财的困惑',
    description: '你开始认真思考自己的理财策略，是应该更激进还是更保守？',
    type: 'CORE',
    condition: {},
    choices: [
      {
        id: 'A',
        text: '更激进，追求更高收益',
        consequences: {
          cashChange: -5000,
          healthChange: -2,
          mentalChange: -6,
          moralityChange: 0,
          narrativeResult: '你选择了更激进的策略，但市场波动让你损失不小，心情沉重。'
        }
      },
      {
        id: 'B',
        text: '更保守，但收益有限',
        consequences: {
          cashChange: 1000,
          healthChange: 0,
          mentalChange: -3,
          moralityChange: 0,
          narrativeResult: '你选择了更保守的策略，收益稳定但有限，看着别人赚更多你有些焦虑。'
        }
      }
    ]
  },
  // 随机事件 5-1
  {
    id: 's5-random-1',
    title: '市场的黑天鹅',
    description: '市场突然出现大幅波动，你的投资受到了冲击。是恐慌还是冷静应对？',
    type: 'RANDOM',
    condition: { hasStocks: true },
    choices: [
      {
        id: 'A',
        text: '恐慌卖出，减少损失',
        consequences: {
          cashChange: -6000,
          healthChange: -2,
          mentalChange: -6,
          moralityChange: 0,
          narrativeResult: '你恐慌卖出了，承受了较大亏损，心情沉重，开始怀疑自己的判断。'
        }
      },
      {
        id: 'B',
        text: '冷静持有，但可能继续下跌',
        consequences: {
          cashChange: 0,
          healthChange: -3,
          mentalChange: -7,
          moralityChange: 0,
          narrativeResult: '你选择冷静持有，但每天看着亏损让你焦虑不安，影响工作和生活。'
        }
      }
    ]
  },
  {
    id: 's5-random-1-alt',
    title: '意外的机会',
    description: '一个意外的机会出现在你面前，可能带来收益，但也需要承担风险。',
    type: 'RANDOM',
    choices: [
      {
        id: 'A',
        text: '抓住机会，但风险很大',
        consequences: {
          cashChange: -4000,
          healthChange: -2,
          mentalChange: -5,
          moralityChange: 0,
          narrativeResult: '你抓住了机会，但结果不如预期，损失了一些资金，心情低落。'
        }
      },
      {
        id: 'B',
        text: '放弃机会，但可能后悔',
        consequences: {
          cashChange: 0,
          healthChange: 0,
          mentalChange: -4,
          moralityChange: 0,
          narrativeResult: '你放弃了机会，但后来听说别人成功了，你开始后悔自己的保守。'
        }
      }
    ]
  },
  // 随机事件 5-2
  {
    id: 's5-random-2',
    title: '家庭的期望',
    description: '家人开始催促你考虑买房或者回老家发展，你感到压力，但现在的条件都不允许。',
    type: 'RANDOM',
    choices: [
      {
        id: 'A',
        text: '如实说明，但让家人担心',
        consequences: {
          cashChange: 0,
          healthChange: 0,
          mentalChange: -5,
          moralityChange: -2,
          narrativeResult: '你告诉了家人实情，他们虽然理解但明显失望，你心里很愧疚，压力更大。'
        }
      },
      {
        id: 'B',
        text: '敷衍过去，但内心压力更大',
        consequences: {
          cashChange: 0,
          healthChange: -2,
          mentalChange: -6,
          moralityChange: 0,
          narrativeResult: '你敷衍了家人，但内心的压力和愧疚感让你更加焦虑，开始怀疑自己的选择。'
        }
      }
    ]
  }
];

// ==================== 阶段6：第3年下半年 ====================
export const STAGE_6_EVENTS: EventData[] = [
  // 核心事件 6-1: 三年总结
  {
    id: 's6-core-1',
    title: '三年的反思',
    description: '三年即将结束，你开始反思自己的选择。是继续现在的路，还是做出改变？',
    type: 'CORE',
    condition: {},
    choices: [
      {
        id: 'A',
        text: '继续现在的路，但可能没有突破',
        consequences: {
          cashChange: 0,
          healthChange: 0,
          mentalChange: -5,
          moralityChange: 0,
          narrativeResult: '你选择继续现在的路，但看着时间流逝，你开始怀疑是否应该早点改变。'
        }
      },
      {
        id: 'B',
        text: '做出改变，但需要承担风险',
        consequences: {
          cashChange: -3000,
          healthChange: -3,
          mentalChange: -6,
          moralityChange: 0,
          narrativeResult: '你做出了改变，但新的选择带来了新的不确定性，你开始担心是否做错了。'
        }
      }
    ]
  },
  // 核心事件 6-2: 最终资产
  {
    id: 's6-core-2',
    title: '资产的清算',
    description: '三年即将结束，你需要决定如何处理现有的资产。是变现还是继续持有？',
    type: 'CORE',
    condition: { hasStocks: true },
    choices: [
      {
        id: 'A',
        text: '变现，锁定收益或损失',
        consequences: {
          cashChange: 0, // 实际变化取决于当前价值
          healthChange: 0,
          mentalChange: -3,
          moralityChange: 0,
          narrativeResult: '你变现了资产，锁定了结果，但看着市场后续走势，你心情复杂。'
        }
      },
      {
        id: 'B',
        text: '继续持有，但可能继续波动',
        consequences: {
          cashChange: 0,
          healthChange: -1,
          mentalChange: -5,
          moralityChange: 0,
          narrativeResult: '你选择继续持有，但市场波动让你焦虑，不知道未来会怎样。'
        }
      }
    ]
  },
  {
    id: 's6-core-2-alt',
    title: '定存的抉择',
    description: '你的定存即将到期，是续存还是取出用于其他用途？',
    type: 'CORE',
    condition: { hasFixedDeposit: true },
    choices: [
      {
        id: 'A',
        text: '续存，但利率更低',
        consequences: {
          cashChange: 0,
          healthChange: 0,
          mentalChange: -2,
          moralityChange: 0,
          narrativeResult: '你续存了，但利率下降让你觉得收益太少，开始怀疑是否应该做其他投资。'
        }
      },
      {
        id: 'B',
        text: '取出，但可能找不到更好的投资',
        consequences: {
          cashChange: 0,
          healthChange: 0,
          mentalChange: -4,
          moralityChange: 0,
          narrativeResult: '你取出了定存，但找不到更好的投资渠道，资金闲置让你焦虑。'
        }
      }
    ]
  },
  {
    id: 's6-core-2-alt2',
    title: '最后的投资',
    description: '三年即将结束，你还有一笔资金。是保守存起来，还是最后搏一次？',
    type: 'CORE',
    condition: {},
    choices: [
      {
        id: 'A',
        text: '保守存起来，但收益有限',
        consequences: {
          cashChange: 500,
          healthChange: 0,
          mentalChange: -3,
          moralityChange: 0,
          narrativeResult: '你选择了保守，资金安全但收益有限，看着别人可能赚更多你有些遗憾。'
        }
      },
      {
        id: 'B',
        text: '最后搏一次，但风险很大',
        consequences: {
          cashChange: -4000,
          healthChange: -2,
          mentalChange: -6,
          moralityChange: 0,
          narrativeResult: '你选择了最后搏一次，但结果不如预期，损失了一些资金，心情沉重。'
        }
      }
    ]
  },
  // 核心事件 6-3: 生活选择
  {
    id: 's6-core-3',
    title: '生活的方向',
    description: '三年即将结束，你需要决定未来的方向。是继续在大城市打拼，还是考虑其他选择？',
    type: 'CORE',
    condition: {},
    choices: [
      {
        id: 'A',
        text: '继续打拼，但压力更大',
        consequences: {
          cashChange: 0,
          healthChange: -4,
          mentalChange: -5,
          moralityChange: 0,
          narrativeResult: '你选择继续在大城市打拼，但压力让你身心俱疲，开始怀疑是否值得。'
        }
      },
      {
        id: 'B',
        text: '考虑其他选择，但可能失去机会',
        consequences: {
          cashChange: -2000,
          healthChange: 2,
          mentalChange: -4,
          moralityChange: 0,
          narrativeResult: '你开始考虑其他选择，但想到可能失去的机会，你心情复杂。'
        }
      }
    ]
  },
  // 随机事件 6-1
  {
    id: 's6-random-1',
    title: '最后的考验',
    description: '在最后阶段，你遇到了一个意外的考验。是勇敢面对还是逃避？',
    type: 'RANDOM',
    choices: [
      {
        id: 'A',
        text: '勇敢面对，但可能损失更大',
        consequences: {
          cashChange: -2000,
          healthChange: -3,
          mentalChange: -5,
          moralityChange: 1,
          narrativeResult: '你勇敢面对了考验，虽然付出了一些代价，但你没有逃避，心里有些安慰。'
        }
      },
      {
        id: 'B',
        text: '选择逃避，但内心不安',
        consequences: {
          cashChange: -500,
          healthChange: -1,
          mentalChange: -6,
          moralityChange: -2,
          narrativeResult: '你选择了逃避，虽然损失更小，但内心的不安和愧疚让你更加焦虑。'
        }
      }
    ]
  },
  // 随机事件 6-2
  {
    id: 's6-random-2',
    title: '时间的流逝',
    description: '三年时间即将结束，你开始回顾自己的选择。是满意还是遗憾？',
    type: 'RANDOM',
    choices: [
      {
        id: 'A',
        text: '接受现实，但有些遗憾',
        consequences: {
          cashChange: 0,
          healthChange: 0,
          mentalChange: -4,
          moralityChange: 0,
          narrativeResult: '你接受了现实，虽然有些遗憾，但你知道这就是生活。'
        }
      },
      {
        id: 'B',
        text: '反思过去，但可能更焦虑',
        consequences: {
          cashChange: 0,
          healthChange: -2,
          mentalChange: -6,
          moralityChange: 0,
          narrativeResult: '你开始反思过去的选择，越想越焦虑，开始怀疑自己是否做错了什么。'
        }
      }
    ]
  }
];

// 所有阶段的事件池
export const ALL_STAGE_EVENTS: Record<number, EventData[]> = {
  1: STAGE_1_EVENTS,
  2: STAGE_2_EVENTS,
  3: STAGE_3_EVENTS,
  4: STAGE_4_EVENTS,
  5: STAGE_5_EVENTS,
  6: STAGE_6_EVENTS,
};

/**
 * 检查事件条件是否匹配
 */
export function matchesCondition(event: EventData, assets: Assets, stage: number): boolean {
  if (!event.condition) return true; // 没有条件限制的事件总是匹配

  const cond = event.condition;

  // 检查阶段范围
  if (cond.minStage && stage < cond.minStage) return false;
  if (cond.maxStage && stage > cond.maxStage) return false;

  // 检查租房选择
  if (cond.rentChoice && cond.rentChoice !== 'ANY' && cond.rentChoice !== assets.rentChoice) {
    return false;
  }

  // 检查车辆类型
  if (cond.carType && cond.carType !== 'ANY' && cond.carType !== assets.carType) {
    return false;
  }

  // 检查投资
  if (cond.hasStocks !== undefined && (assets.investments.stocks > 0) !== cond.hasStocks) {
    return false;
  }
  if (cond.hasFunds !== undefined && (assets.investments.funds > 0) !== cond.hasFunds) {
    return false;
  }
  if (cond.hasInsurance !== undefined && assets.investments.insurance !== cond.hasInsurance) {
    return false;
  }
  if (cond.hasFixedDeposit !== undefined && (assets.fixedDeposit > 0) !== cond.hasFixedDeposit) {
    return false;
  }

  return true;
}

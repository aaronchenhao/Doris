export const INITIAL_CASH = 200000;
export const TOTAL_STAGES = 6;
export const EVENTS_PER_STAGE = 5; // 3 Core + 2 Random

export const RENT_OPTIONS = [
  { id: 'SHARED', label: '合租房/郊区', costMonth: 2000, desc: '通勤久，环境嘈杂，但便宜。' },
  { id: 'SOLO', label: '市中心独居', costMonth: 5500, desc: '私密性好，通勤短，租金高昂。' },
] as const;

export const CAR_OPTIONS = [
  { id: 'NONE', label: '公共交通', cost: 0, desc: '省钱，但挤地铁消耗精力。' },
  { id: 'GAS', label: '燃油车 (二手)', cost: 50000, desc: '维护费高，油费波动。' },
  { id: 'EV', label: '电车 (新)', cost: 120000, desc: '车贷压力或全款痛感，日常省钱。' },
] as const;

export const INSURANCE_COST = 8000; // Annual/Lump sum cost for the simulation period context

export const FIXED_LIVING_COST_PER_MONTH = 3000; // Basic survival: food, utilities

export const CRITICAL_THRESHOLDS = {
  HEALTH: 10,
  MENTAL: 10,
  MORALITY: 10,
  DEBT: -500000 
};
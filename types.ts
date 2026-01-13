export enum Phase {
  START = 'START',
  CONFIG = 'CONFIG',
  PLAY_EVENT = 'PLAY_EVENT',
  STAGE_SUMMARY = 'STAGE_SUMMARY',
  ENDING = 'ENDING',
}

export interface Investments {
  stocks: number;
  funds: number;
  insurance: boolean;
}

export type RentType = 'SHARED' | 'SOLO';
export type CarType = 'NONE' | 'GAS' | 'EV';

export interface Assets {
  rentChoice: RentType;
  carType: CarType;
  fixedDeposit: number;
  investments: Investments;
}

export interface PlayerStats {
  cash: number;        // 流动资产
  health: number;      // 身体健康
  morality: number;    // 道德分数
  mental: number;      // 心理健康
}

export interface GameState {
  phase: Phase;
  stage: number; // 1 to 6 (3 years, 6 months per stage)
  subStage: number; // Events within a stage
  stats: PlayerStats;
  assets: Assets;
  history: string[]; // Text log
  log: string[]; // Display log
  deathReason?: string;
}

export interface ChoiceConsequence {
  cashChange: number;
  healthChange: number;
  moralityChange: number;
  mentalChange: number;
  narrativeResult: string;
}

export interface GameEvent {
  title: string;
  description: string;
  type: 'CORE' | 'RANDOM';
  choices: {
    id: 'A' | 'B';
    text: string;
    consequences: ChoiceConsequence;
  }[];
}

export interface StageSummaryData {
  fixedExpenses: number;
  investmentReturn: number;
  netChange: number;
  eventsSummary: string;
}
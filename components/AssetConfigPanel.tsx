import React, { useState, useEffect } from 'react';
import { Assets, RentType, CarType } from '../types';
import { RENT_OPTIONS, CAR_OPTIONS, INSURANCE_COST } from '../constants';

interface Props {
  currentStage: number;
  currentCash: number;
  currentAssets: Assets; // Need previous assets to calculate resale/changes
  onConfirm: (assets: Assets, remainingCash: number) => void;
}

export const AssetConfigPanel: React.FC<Props> = ({ currentStage, currentCash, currentAssets, onConfirm }) => {
  // State
  const [rent, setRent] = useState<RentType>(currentAssets.rentChoice);
  const [car, setCar] = useState<CarType>(currentAssets.carType);
  const [fixedDeposit, setFixedDeposit] = useState<number>(currentAssets.fixedDeposit);
  const [stocks, setStocks] = useState<number>(currentAssets.investments.stocks);
  const [funds, setFunds] = useState<number>(currentAssets.investments.funds);
  const [hasInsurance, setHasInsurance] = useState<boolean>(currentAssets.investments.insurance);

  // Financial Calculations
  // Logic: 
  // Available Capital = Current Liquid Cash + Liquidation Value of Previous Assets (if re-configuring)
  // But to keep it simple and consistent with prompt "adjust config... remaining is cash flow":
  // We calculate the NET COST of the new configuration relative to the old one.
  // Initial (Stage 1): Old assets are 0. Cost is full price.
  // Later (Stage > 1): 
  //   - Changing Car: Sell old (50% value), Buy new (100% value).
  //   - Changing Deposit: Difference is added/subtracted.
  //   - Changing Investments: Difference is added/subtracted.
  //   - Rent: We don't deduct rent here (it's monthly expense in summary), but we select the TYPE here.
  //   - Insurance: If buying newly, pay cost. If already had, assume kept (no new cost? or annual? Let's say one-time buy for simplicity or per 3-year term. Prompt says "Investment choice... heavy disease insurance". Let's treat it as a sunk cost asset. If you have it, you have it. If you didn't have it and buy it, you pay. You can't really "sell" insurance).

  // Let's implement a "Transaction Ledger" approach.
  
  const getCarValue = (type: CarType, isSell: boolean) => {
    const opt = CAR_OPTIONS.find(c => c.id === type);
    if (!opt) return 0;
    return isSell ? Math.floor(opt.cost * 0.6) : opt.cost; // 60% resale value
  };

  const calculateNetBalance = () => {
    let balance = currentCash;

    // 1. Car Transactions
    if (car !== currentAssets.carType) {
        // Sell old if any
        if (currentAssets.carType !== 'NONE') {
            balance += getCarValue(currentAssets.carType, true);
        }
        // Buy new if any
        if (car !== 'NONE') {
            balance -= getCarValue(car, false);
        }
    }

    // 2. Deposit Adjustment
    // If new > old, we put money in (cost). If new < old, we take money out (gain).
    balance -= (fixedDeposit - currentAssets.fixedDeposit);

    // 3. Investment Adjustments
    balance -= (stocks - currentAssets.investments.stocks);
    balance -= (funds - currentAssets.investments.funds);

    // 4. Insurance
    // If we didn't have it and now we want it, we pay.
    // If we had it and remove it, we don't get money back (sunk cost).
    if (hasInsurance && !currentAssets.investments.insurance) {
        balance -= INSURANCE_COST;
    }

    return balance;
  };

  const projectedCash = calculateNetBalance();
  const isValid = projectedCash >= 0;

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-6 space-y-6 animate-in slide-in-from-bottom-10 fade-in duration-500 pb-24">
      <div className="space-y-2">
        <h2 className="text-3xl font-serif-sc font-bold text-zinc-100">
          {currentStage === 1 ? "初始资产配置" : "资产重组"}
        </h2>
        <p className="text-zinc-400 text-sm">
          {currentStage === 1 ? "你手握20万启动资金。请慎重分配。" : "这是你调整策略的机会。卖出资产折旧率40%。"}
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Housing Choice */}
        <div className="bg-zinc-900/50 p-4 rounded border border-zinc-800">
            <h3 className="text-sm font-bold text-zinc-300 uppercase mb-3">居住环境 (Rent)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {RENT_OPTIONS.map(opt => (
                    <button
                        key={opt.id}
                        onClick={() => setRent(opt.id as RentType)}
                        className={`text-left p-3 rounded border transition-all ${
                            rent === opt.id ? 'border-zinc-200 bg-zinc-800' : 'border-zinc-700 hover:border-zinc-600'
                        }`}
                    >
                        <div className="flex justify-between font-bold text-sm">
                            <span>{opt.label}</span>
                            <span>¥{opt.costMonth}/月</span>
                        </div>
                        <p className="text-xs text-zinc-500 mt-1">{opt.desc}</p>
                    </button>
                ))}
            </div>
        </div>

        {/* Car Choice */}
        <div className="bg-zinc-900/50 p-4 rounded border border-zinc-800">
            <h3 className="text-sm font-bold text-zinc-300 uppercase mb-3">出行方式 (Vehicle)</h3>
            <div className="grid grid-cols-1 gap-2">
                {CAR_OPTIONS.map(opt => (
                    <button
                        key={opt.id}
                        onClick={() => setCar(opt.id as CarType)}
                        className={`text-left p-3 rounded border transition-all flex justify-between items-center ${
                            car === opt.id ? 'border-zinc-200 bg-zinc-800' : 'border-zinc-700 hover:border-zinc-600'
                        }`}
                    >
                        <div>
                            <div className="font-bold text-sm">{opt.label}</div>
                            <div className="text-xs text-zinc-500">{opt.desc}</div>
                        </div>
                        <div className="text-sm font-mono">
                           {opt.cost > 0 ? `¥${opt.cost.toLocaleString()}` : '¥0'}
                        </div>
                    </button>
                ))}
            </div>
        </div>

        {/* Financial Assets */}
        <div className="bg-zinc-900/50 p-4 rounded border border-zinc-800 space-y-4">
            <h3 className="text-sm font-bold text-zinc-300 uppercase">理财配置 (Investments)</h3>
            
            {/* Fixed Deposit */}
            <div>
                <div className="flex justify-between text-xs text-zinc-400 mb-1">
                    <span>定期存款 (低风险，灵活性差)</span>
                    <span>¥{fixedDeposit.toLocaleString()}</span>
                </div>
                <input 
                    type="range" min="0" max="200000" step="10000"
                    value={fixedDeposit}
                    onChange={(e) => setFixedDeposit(parseInt(e.target.value))}
                    className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-zinc-200"
                />
            </div>

            {/* Stocks */}
            <div>
                <div className="flex justify-between text-xs text-zinc-400 mb-1">
                    <span>股票 (高风险，高回报)</span>
                    <span>¥{stocks.toLocaleString()}</span>
                </div>
                <input 
                    type="range" min="0" max="100000" step="5000"
                    value={stocks}
                    onChange={(e) => setStocks(parseInt(e.target.value))}
                    className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-red-400"
                />
            </div>

            {/* Funds */}
            <div>
                <div className="flex justify-between text-xs text-zinc-400 mb-1">
                    <span>基金 (中风险)</span>
                    <span>¥{funds.toLocaleString()}</span>
                </div>
                <input 
                    type="range" min="0" max="100000" step="5000"
                    value={funds}
                    onChange={(e) => setFunds(parseInt(e.target.value))}
                    className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-400"
                />
            </div>

            {/* Insurance */}
            <div className="flex items-center justify-between pt-2">
                <div className="text-sm text-zinc-300">
                    <div>重疾险 (防止因病返贫)</div>
                    <div className="text-xs text-zinc-500">费用: ¥{INSURANCE_COST} (一次性)</div>
                </div>
                <button 
                    onClick={() => {
                        // Can only toggle on if not already owned. If owned, cannot remove (sunk cost logic? Or allowed?)
                        // Prompt says "Player can choose not to configure". Re-config allows adjusting.
                        // Let's allow toggle.
                        setHasInsurance(!hasInsurance);
                    }}
                    className={`px-4 py-2 rounded text-xs font-bold border ${
                        hasInsurance ? 'bg-emerald-900/30 border-emerald-500 text-emerald-400' : 'border-zinc-700 text-zinc-500'
                    }`}
                >
                    {hasInsurance ? "已配置" : "未配置"}
                </button>
            </div>
        </div>

      </div>

      {/* Footer Status */}
      <div className="fixed bottom-0 left-0 w-full bg-zinc-950 border-t border-zinc-800 p-4 backdrop-blur-md bg-opacity-95 z-50">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
           <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest">剩余现金流 (Cash Flow)</div>
              <div className={`text-2xl font-mono font-bold ${projectedCash < 0 ? 'text-red-500' : 'text-emerald-400'}`}>
                ¥{projectedCash.toLocaleString()}
              </div>
           </div>
           <button
             onClick={() => onConfirm({ 
                 rentChoice: rent, 
                 carType: car, 
                 fixedDeposit, 
                 investments: { stocks, funds, insurance: hasInsurance } 
             }, projectedCash)}
             disabled={!isValid}
             className="bg-zinc-100 text-black px-8 py-3 font-bold text-sm tracking-widest hover:bg-zinc-300 disabled:bg-zinc-800 disabled:text-zinc-600 transition-colors"
           >
             {currentStage === 1 ? "确认开局" : "确认调整"}
           </button>
        </div>
      </div>
    </div>
  );
};
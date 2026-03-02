import { Holding } from "../models/Holding";
import { CashEvent } from "../models/CashEvent";
import { calculateHoldingsValue, calculateHoldingsProfit } from "./calculateHoldingsValue";
import { calculateCashBalance } from "./calculateCashBalance";

export interface PortfolioTotals {
  holdingsValue: number;
  cashBalance: number;
  totalValue: number;
  profit: number;
  returnPct: number;
}

export function calculatePortfolioTotals(
  holdings: Holding[],
  cashEvents: CashEvent[],
  investedCapital: number
): PortfolioTotals {
  const holdingsValue = calculateHoldingsValue(holdings);
  const holdingsProfit = calculateHoldingsProfit(holdings);
  const cashBalance = calculateCashBalance(cashEvents);

  const totalValue = holdingsValue + cashBalance;
  const profit = holdingsProfit + cashBalance;
  const returnPct = investedCapital > 0 ? (profit / investedCapital) * 100 : 0;

  return {
    holdingsValue,
    cashBalance,
    totalValue,
    profit,
    returnPct,
  };
}
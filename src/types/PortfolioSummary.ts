// src/types/PortfolioSummary.ts

export type Trade = {
  id: string;
  ticker: string;
  quantity: number;
  price: number;
  currency: string;
  date: string;
};

export type Dividend = {
  id: string;
  amount: number;
  currency: string;
  date: string;
};

export type CashFlow = {
  id: string;
  type: 'deposit' | 'withdrawal' | 'fee' | 'interest';
  amount: number;
  currency: string;
  date: string;
};

export type Holding = {
  id: string;
  name: string;
  quantity: number;
  avgCost: number;
  currency: string;
  fxRate: number;
  currentPrice: number;
  fees: number;
};

export type PortfolioSummary = {
  totalValue: number;
  totalCost: number;
  totalPnL: number;
  totalMarketValue: number;
  dividends: Dividend[];
  cashFlows: CashFlow[];
  trades: Trade[];
  holdings: Holding[];
};
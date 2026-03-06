// src/types/PortfolioTypes.ts

export interface ParsedDividend {
  amount: number;
  date: string;
  description: string;
  cashManagementFee: number;
  vat: number;
}

export interface ParsedCashFlow {
  id: string;
  date: string;
  amount: number;
  type: string;
}

export interface ParsedHolding {
  id: string;
  symbol: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
}

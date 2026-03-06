// src/utils/parseTransactionHistory.ts
import { ParsedDividend } from '@src/types/PortfolioTypes';

interface RawDividend {
  amount: number;
  date: string;
  description?: string;
  cashManagementFee?: number;
  vat?: number;
}

export function parseTransactionHistory(raw: RawDividend[]): ParsedDividend[] {
  return raw.map(item => ({
    amount: item.amount,
    date: item.date,
    description: item.description ?? '',
    cashManagementFee: item.cashManagementFee ?? 0,
    vat: item.vat ?? 0,
  }));
}

import { CashEvent } from "../models/CashEvent";

export function calculateCashBalance(events: CashEvent[]): number {
  return events.reduce((balance, e) => balance + e.amountZAR, 0);
}
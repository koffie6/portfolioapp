import { Holding } from "../models/Holding";

export function calculateHoldingsValue(holdings: Holding[]): number {
  return holdings.reduce((total, h) => total + h.currentValueZAR, 0);
}

export function calculateHoldingsProfit(holdings: Holding[]): number {
  return holdings.reduce((total, h) => total + h.gainLossZAR, 0);
}
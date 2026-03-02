export interface CashEvent {
  eventId: string;
  type: "dividend" | "interest" | "vat" | "gift" | "realizedTrade" | "fee";
  amountZAR: number;
  currency: "ZAR" | "USD";
  date: Date;
  notes?: string;
}
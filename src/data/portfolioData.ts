import { Holding } from "../models/Holding";
import { CashEvent } from "../models/CashEvent";

// --- South Africa Holdings (example snapshot Feb 24, 2026) ---
export const SAHoldings: Holding[] = [
  {
    instrumentId: "DSY",
    name: "Discovery",
    quantity: 0.1083,
    avgPurchasePrice: 0,            // gifted shares
    costBasisZAR: 0,
    currentPriceZAR: 1500.00,       // example current value
    currentValueZAR: 162.00,
    gainLossZAR: 162.00,
    returnPct: 100,
  },
  // Add other SA instruments here...
];

// --- US Holdings (converted at USD/ZAR 16.03) ---
export const USHoldings: Holding[] = [
  {
    instrumentId: "NVDA",
    name: "Nvidia",
    quantity: 1.9772,
    avgPurchasePrice: 287.00,
    costBasisZAR: 5675.00,
    currentPriceUSD: 191.55,
    currentPriceZAR: 3050.00,
    currentValueZAR: 6050.00,
    gainLossZAR: 375.00,
    returnPct: 6.6,
    lastUpdated: new Date("2026-02-23T22:00:00Z"),
    forexRate: 16.03,
  },
  {
    instrumentId: "META",
    name: "Meta Platforms",
    quantity: 0.2755,
    avgPurchasePrice: 450.00,
    costBasisZAR: 3450.00,
    currentPriceUSD: 637.25,
    currentPriceZAR: 2850.00,
    currentValueZAR: 2850.00,
    gainLossZAR: -600.00,
    returnPct: -17.4,
    lastUpdated: new Date("2026-02-23T22:00:00Z"),
    forexRate: 16.03,
  },
  {
    instrumentId: "GOOGL",
    name: "Alphabet",
    quantity: 0.0334,
    avgPurchasePrice: 135.00,
    costBasisZAR: 135.00,
    currentPriceUSD: 311.49,
    currentPriceZAR: 162.00,
    currentValueZAR: 162.00,
    gainLossZAR: 27.00,
    returnPct: 20.0,
    lastUpdated: new Date("2026-02-23T22:00:00Z"),
    forexRate: 16.03,
  },
];

// --- Cash Events (SA + US dividends, interest, VAT, fees) ---
export const CashEvents: CashEvent[] = [
  {
    eventId: "CASH-2025-08-01",
    type: "interest",
    amountZAR: 41.83,
    currency: "ZAR",
    date: new Date("2025-08-01"),
    notes: "Interest income",
  },
  {
    eventId: "CASH-2025-08-01-FEE",
    type: "fee",
    amountZAR: -9.03,
    currency: "ZAR",
    date: new Date("2025-08-01"),
    notes: "Cash management fee",
  },
  {
    eventId: "CASH-2025-08-01-VAT",
    type: "vat",
    amountZAR: -1.35,
    currency: "ZAR",
    date: new Date("2025-08-01"),
    notes: "VAT on cash management fee",
  },
  {
    eventId: "CASH-2025-10-01",
    type: "interest",
    amountZAR: 0.27,
    currency: "ZAR",
    date: new Date("2025-10-01"),
    notes: "Interest income",
  },
];
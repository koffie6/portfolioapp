export type ParsedHolding = {
  ticker: string;
  company: string;
  quantity: number;
  price?: number;
  value?: number;
  sector?: string;
  costBasis?: number;
  currency: string; // "ZAR" or "USD"
  gifted?: boolean; // flag for gifted shares
};

export type ParsedDividend = {
  ticker: string;
  company: string;
  date: string;
  gross: number;
  tax: number;
  net: number;
  currency: string;
};

export type ParsedCashFlow = {
  date: string;
  type: string; // Deposit, Withdrawal, Fee, Interest, Major Deposit, Sell Proceeds
  amount: number;
  currency: string;
  highlight?: boolean; // flag for major deposits
  realizedGainLoss?: number; // for SELL transactions
};

export type CorporateAction = {
  ticker: string;
  date: string;
  type: string; // SPLIT or CONSOLIDATION
  ratio: number; // e.g. 5 for 1 split = 5
};

export function parseTransactionHistory(rawText: string): {
  holdings: ParsedHolding[];
  dividends: ParsedDividend[];
  cashFlows: ParsedCashFlow[];
  corporateActions: CorporateAction[];
} {
  const lines = rawText.split("\n").map((l) => l.trim()).filter(Boolean);

  const holdingsMap: Record<string, ParsedHolding> = {};
  const dividends: ParsedDividend[] = [];
  const cashFlows: ParsedCashFlow[] = [];
  const corporateActions: CorporateAction[] = [];

  for (const line of lines) {
    const parts = line.split(",");
    if (parts.length < 5) continue;

    const [date, type, ticker, company, qtyStr, priceStr, amountStr, currency] =
      parts.map((p) => p.trim());

    const quantity = parseFloat(qtyStr) || 0;
    const price = parseFloat(priceStr) || 0;
    const amount = parseFloat(amountStr) || 0;
    const curr = currency || "ZAR";

    // BUY → update holdings
    if (type.toUpperCase() === "BUY") {
      const existing = holdingsMap[ticker] || {
        ticker,
        company,
        quantity: 0,
        costBasis: 0,
        currency: curr,
      };

      existing.quantity += quantity;
      existing.costBasis = (existing.costBasis ?? 0) + amount;

      holdingsMap[ticker] = existing;

      cashFlows.push({
        date,
        type: "Withdrawal",
        amount,
        currency: curr,
      });
    }

    // SELL → reduce holdings and record realized proceeds
    if (type.toUpperCase() === "SELL") {
      const existing = holdingsMap[ticker];
      let realizedGL = 0;

      if (existing) {
        const avgCostPerShare = (existing.costBasis ?? 0) / (existing.quantity || 1);
        const costReduction = avgCostPerShare * quantity;

        realizedGL = amount - costReduction;

        existing.quantity -= quantity;
        existing.costBasis = (existing.costBasis ?? 0) - costReduction;

        holdingsMap[ticker] = existing;
      }

      cashFlows.push({
        date,
        type: "Sell Proceeds",
        amount,
        currency: curr,
        realizedGainLoss: realizedGL,
      });
    }

    // DIV → record dividend (scaled to current share count)
    if (type.toUpperCase() === "DIV") {
      const grossPerShare = amount;
      const taxPerShare = grossPerShare * 0.2;
      const netPerShare = grossPerShare - taxPerShare;

      const holding = holdingsMap[ticker];
      let adjustedGross = grossPerShare;
      let adjustedNet = netPerShare;

      if (holding && holding.quantity > 0) {
        adjustedGross = grossPerShare * holding.quantity;
        adjustedNet = netPerShare * holding.quantity;
      }

      dividends.push({
        ticker,
        company,
        date,
        gross: adjustedGross,
        tax: adjustedGross - adjustedNet,
        net: adjustedNet,
        currency: curr,
      });
    }

    // Cash flow events (Deposits, Withdrawals, Fees, Interest)
    if (["DEPOSIT", "WITHDRAWAL", "FEE", "INTEREST"].includes(type.toUpperCase())) {
      let flowType = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
      let highlight = false;

      if (flowType === "Deposit" && curr === "ZAR" && amount >= 100000) {
        flowType = "Major Deposit";
        highlight = true;
      }
      if (flowType === "Deposit" && curr === "USD" && amount * 17.2 >= 100000) {
        flowType = "Major Deposit";
        highlight = true;
      }

      cashFlows.push({
        date,
        type: flowType,
        amount,
        currency: curr,
        highlight,
      });
    }

    // Gifted shares → cost basis = 0
    if (type.toUpperCase() === "GIFT") {
      holdingsMap[ticker] = {
        ticker,
        company,
        quantity,
        costBasis: 0,
        currency: curr,
        gifted: true,
      };
    }

    // Corporate Actions
    if (type.toUpperCase() === "CORPORATE ACTION") {
      const ratio = quantity > 0 ? quantity : 1;
      corporateActions.push({
        ticker,
        date,
        type: "SPLIT",
        ratio,
      });
    }
  }

  // Apply corporate actions
  for (const action of corporateActions) {
    const holding = holdingsMap[action.ticker];
    if (holding) {
      if (action.type === "SPLIT") {
        holding.quantity = action.ratio;
      }
      if (action.type === "CONSOLIDATION") {
        holding.quantity = action.ratio;
      }
      holdingsMap[action.ticker] = holding;
    }
  }

  const holdings = Object.values(holdingsMap).map((h) => {
    if ((h.costBasis ?? 0) === 0) {
      return { ...h, gifted: true };
    }
    return h;
  });

  return { holdings, dividends, cashFlows, corporateActions };
}
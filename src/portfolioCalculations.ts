// src/portfolioCalculations.ts

export type Holdings = {
  shares: number;
  cash: number;
};

export type Transaction = {
  shares: number;
  price: number;
};

/**
 * Weighted average purchase price across multiple transactions.
 * Gifted shares (price = 0) are excluded from the calculation.
 */
export function calculateWeightedAverage(transactions: Transaction[]): number {
  const costTransactions = transactions.filter(t => t.price > 0);

  const totalCost = costTransactions.reduce((sum, t) => sum + t.shares * t.price, 0);
  const totalShares = costTransactions.reduce((sum, t) => sum + t.shares, 0);

  return totalShares === 0 ? 0 : totalCost / totalShares;
}

/**
 * Route dividends into cash account.
 */
export function applyDividend(holdings: Holdings, dividend: number): Holdings {
  return { ...holdings, cash: holdings.cash + dividend };
}

/**
 * Apply brokerage/statutory fee with optional VAT.
 */
export function applyFee(holdings: Holdings, fee: number, vatRate = 0): Holdings {
  const totalFee = fee + fee * vatRate;
  return { ...holdings, cash: holdings.cash - totalFee };
}

/**
 * Record partner deposit (cash inflow).
 */
export function applyDeposit(holdings: Holdings, amount: number): Holdings {
  return { ...holdings, cash: holdings.cash + amount };
}

/**
 * Record partner withdrawal (cash outflow).
 */
export function applyWithdrawal(holdings: Holdings, amount: number): Holdings {
  return { ...holdings, cash: holdings.cash - amount };
}

/**
 * Add gifted shares with zero cost basis.
 * These should not affect weighted average purchase price.
 */
export function applyGift(transactions: Transaction[], giftedShares: number): Transaction[] {
  return [...transactions, { shares: giftedShares, price: 0 }];
}

/**
 * Transfer cash between accounts.
 * Negative amount = transfer out, positive = transfer in.
 */
export function applyTransfer(holdings: Holdings, amount: number): Holdings {
  return { ...holdings, cash: holdings.cash + amount };
}

/**
 * Apply interest income.
 */
export function applyInterest(holdings: Holdings, interest: number): Holdings {
  return { ...holdings, cash: holdings.cash + interest };
}

/**
 * Get a summary of the portfolio:
 * - Weighted average cost basis (ignores gifted shares)
 * - Total shares (includes gifted shares)
 * - Current cash balance
 */
export function getPortfolioSummary(
  transactions: Transaction[],
  holdings: Holdings
): { weightedAverageCost: number; totalShares: number; cashBalance: number } {
  const weightedAverageCost = calculateWeightedAverage(transactions);
  const totalShares = transactions.reduce((sum, t) => sum + t.shares, 0);
  const cashBalance = holdings.cash;

  return { weightedAverageCost, totalShares, cashBalance };
}
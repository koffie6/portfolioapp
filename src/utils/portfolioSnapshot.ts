import {
  ParsedTrade,
  ParsedDividend,
  ParsedCashFlow,
  ParsedHolding,
  PortfolioSummary,
} from "../types/PortfolioTypes";

/**
 * Generate a PortfolioSummary snapshot from trades, dividends, and cash flows.
 * Uses weighted average accounting for cost basis (EasyEquities methodology).
 */
export function generatePortfolioSnapshot(
  trades: ParsedTrade[],
  dividends: ParsedDividend[],
  cashFlows: ParsedCashFlow[],
  currentPrices: Record<string, number>
): PortfolioSummary {
  const holdingsMap: Record<string, ParsedHolding> = {};

  trades.forEach((trade) => {
    const existing = holdingsMap[trade.ticker];

    if (trade.type === "buy" || trade.type === "transferIn") {
      // Add shares at purchase cost
      if (!existing) {
        holdingsMap[trade.ticker] = {
          ticker: trade.ticker,
          company: trade.company,
          quantity: trade.quantity,
          averageCost: trade.net / trade.quantity,
          currentPrice: currentPrices[trade.ticker] ?? trade.price,
          marketValue: (currentPrices[trade.ticker] ?? trade.price) * trade.quantity,
          costBasis: trade.net,
          unrealizedPnL:
            (currentPrices[trade.ticker] ?? trade.price) * trade.quantity - trade.net,
          referenceIds: trade.referenceId ? [trade.referenceId] : [],
        };
      } else {
        const newQuantity = existing.quantity + trade.quantity;
        const newCostBasis = existing.costBasis + trade.net;
        const avgCost = newCostBasis / newQuantity;

        holdingsMap[trade.ticker] = {
          ...existing,
          quantity: newQuantity,
          averageCost: avgCost,
          costBasis: newCostBasis,
          currentPrice: currentPrices[trade.ticker] ?? existing.currentPrice,
          marketValue:
            (currentPrices[trade.ticker] ?? existing.currentPrice) * newQuantity,
          unrealizedPnL:
            (currentPrices[trade.ticker] ?? existing.currentPrice) * newQuantity -
            newCostBasis,
          referenceIds: existing.referenceIds?.concat(trade.referenceId ?? []),
        };
      }
    }

    if (trade.type === "sell" || trade.type === "transferOut") {
      if (existing) {
        const avgCostPerShare = existing.costBasis / existing.quantity;
        const costReduction = avgCostPerShare * trade.quantity;

        const newQuantity = existing.quantity - trade.quantity;
        const newCostBasis = existing.costBasis - costReduction;

        holdingsMap[trade.ticker] = {
          ...existing,
          quantity: newQuantity,
          costBasis: newCostBasis,
          averageCost: newQuantity > 0 ? newCostBasis / newQuantity : avgCostPerShare,
          currentPrice: currentPrices[trade.ticker] ?? existing.currentPrice,
          marketValue:
            (currentPrices[trade.ticker] ?? existing.currentPrice) * newQuantity,
          unrealizedPnL:
            (currentPrices[trade.ticker] ?? existing.currentPrice) * newQuantity -
            newCostBasis,
        };
      }
    }
  });

  const holdings = Object.values(holdingsMap);

  const totalMarketValue = holdings.reduce((sum, h) => sum + h.marketValue, 0);
  const totalCostBasis = holdings.reduce((sum, h) => sum + h.costBasis, 0);
  const totalUnrealizedPnL = holdings.reduce((sum, h) => sum + h.unrealizedPnL, 0);

  const netCashBalance = cashFlows.reduce((sum, cf) => sum + cf.amount, 0);

  const realizedPnL = trades
    .filter((t) => t.type === "sell" || t.type === "transferOut")
    .reduce((sum, t) => sum + t.net, 0);

  return {
    holdings,
    dividends,
    cashFlows,
    trades,
    totalMarketValue,
    totalCostBasis,
    totalUnrealizedPnL,
    netCashBalance,
    realizedPnL,
  };
}
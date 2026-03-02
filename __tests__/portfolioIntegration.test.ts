import { getPortfolioSummary } from "../src/portfolioCalculations";
import { formatCurrency, formatShares } from "../src/formatting";

describe("Portfolio Integration", () => {
  test("summary values are correctly formatted for reporting", () => {
    const transactions = [
      { shares: 100, price: 50 }, // R5,000
      { shares: 10, price: 0 },   // Gifted shares
    ];
    const holdings = { shares: 110, cash: 500 };

    const summary = getPortfolioSummary(transactions, holdings);

    const formattedWeightedAverage = formatCurrency(summary.weightedAverageCost);
    const formattedTotalShares = formatShares(summary.totalShares);
    const formattedCashBalance = formatCurrency(summary.cashBalance);

    expect(formattedWeightedAverage).toBe("R 50.00");
    expect(formattedTotalShares).toBe("110 shares");
    expect(formattedCashBalance).toBe("R 500.00");
  });

  test("large values are formatted with spaces for thousands", () => {
    const transactions = [
      { shares: 1000, price: 1000 }, // R1,000,000
    ];
    const holdings = { shares: 1000, cash: 2500000 };

    const summary = getPortfolioSummary(transactions, holdings);

    const formattedWeightedAverage = formatCurrency(summary.weightedAverageCost);
    const formattedTotalShares = formatShares(summary.totalShares);
    const formattedCashBalance = formatCurrency(summary.cashBalance);

    expect(formattedWeightedAverage).toBe("R 1 000.00");
    expect(formattedTotalShares).toBe("1 000 shares");
    expect(formattedCashBalance).toBe("R 2 500 000.00");
  });
});
import {
  calculateWeightedAverage,
  applyDividend,
  applyFee,
  applyDeposit,
  applyWithdrawal,
  applyGift,
  applyTransfer,
  applyInterest,
  getPortfolioSummary,
} from "../src/portfolioCalculations";

describe("Portfolio Calculations", () => {
  describe("Share Events", () => {
    test("calculates weighted average purchase price", () => {
      const transactions = [
        { shares: 100, price: 50 },   // R5,000
        { shares: 50, price: 60 },    // R3,000
      ];
      const result = calculateWeightedAverage(transactions);
      expect(result).toBeCloseTo(53.33, 2);
    });

    test("adds gifted shares with zero cost basis (excluded from weighted average)", () => {
      const transactions = [{ shares: 100, price: 50 }];
      const updated = applyGift(transactions, 10);
      const result = calculateWeightedAverage(updated);
      expect(result).toBeCloseTo(50, 2); // gifts excluded
    });

    test("gifted shares are still counted in total holdings", () => {
      const transactions = [{ shares: 100, price: 50 }];
      const updated = applyGift(transactions, 10);
      const totalShares = updated.reduce((sum, t) => sum + t.shares, 0);
      expect(totalShares).toBe(110);
    });
  });

  describe("Cash Events", () => {
    test("routes dividends into cash account", () => {
      const holdings = { shares: 100, cash: 0 };
      const updated = applyDividend(holdings, 200);
      expect(updated.cash).toBe(200);
      expect(updated.shares).toBe(100);
    });

    test("applies brokerage fee correctly", () => {
      const holdings = { shares: 100, cash: 1000 };
      const updated = applyFee(holdings, 50);
      expect(updated.cash).toBe(950);
    });

    test("applies VAT on fee correctly", () => {
      const holdings = { shares: 100, cash: 1000 };
      const updated = applyFee(holdings, 50, 0.15);
      expect(updated.cash).toBeCloseTo(942.5, 2);
    });

    test("records partner deposit correctly", () => {
      const holdings = { shares: 0, cash: 1000 };
      const updated = applyDeposit(holdings, 500);
      expect(updated.cash).toBe(1500);
    });

    test("records partner withdrawal correctly", () => {
      const holdings = { shares: 0, cash: 1000 };
      const updated = applyWithdrawal(holdings, 200);
      expect(updated.cash).toBe(800);
    });

    test("applies transfer correctly", () => {
      const holdings = { shares: 0, cash: 1000 };
      const updatedOut = applyTransfer(holdings, -200);
      expect(updatedOut.cash).toBe(800);

      const updatedIn = applyTransfer(holdings, 300);
      expect(updatedIn.cash).toBe(1300);
    });

    test("applies interest income correctly", () => {
      const holdings = { shares: 0, cash: 1000 };
      const updated = applyInterest(holdings, 25);
      expect(updated.cash).toBe(1025);
    });
  });

  describe("Portfolio Summary", () => {
    test("portfolio summary combines weighted average, total shares, and cash balance", () => {
      const transactions = [
        { shares: 100, price: 50 }, // R5,000
        { shares: 10, price: 0 },   // Gifted shares
      ];
      const holdings = { shares: 110, cash: 500 };

      const summary = getPortfolioSummary(transactions, holdings);

      expect(summary.weightedAverageCost).toBeCloseTo(50, 2); // gifts excluded
      expect(summary.totalShares).toBe(110);                  // gifts included
      expect(summary.cashBalance).toBe(500);
    });
  });
});
import { generatePortfolioSnapshot } from "../src/utils/portfolioSnapshot";
import {
  ParsedTrade,
  ParsedDividend,
  ParsedCashFlow,
  PortfolioSummary,
} from "../src/types/PortfolioTypes";

describe("PortfolioSnapshot Integration", () => {
  it("produces correct summary from trades, dividends, and cash flows", () => {
    const trades: ParsedTrade[] = [
      {
        ticker: "AAPL",
        company: "Apple Inc.",
        date: "2025-07-01",
        type: "buy",
        quantity: 10,
        price: 150,
        total: 1500,
        fee: 15,
        net: 1485,
      },
      {
        ticker: "AAPL",
        company: "Apple Inc.",
        date: "2025-09-01",
        type: "sell",
        quantity: 5,
        price: 160,
        total: 800,
        fee: 8,
        net: 792,
      },
    ];

    const dividends: ParsedDividend[] = [
      {
        ticker: "AAPL",
        company: "Apple Inc.",
        date: "2025-08-01",
        description: "Apple Dividend",
        gross: 50,
        tax: 0,
        cashManagementFee: -5,
        vat: -0.75,
        net: 44.25,
      },
    ];

    const cashFlows: ParsedCashFlow[] = [
      { date: "2025-08-01", description: "Interest Income", amount: 10, type: "interest" },
      { date: "2025-08-01", description: "Cash Management Fee", amount: -9.03, type: "fee" },
      { date: "2025-08-01", description: "VAT on Fee", amount: -1.35, type: "vat" },
    ];

    const currentPrices = { AAPL: 160 };

    const summary: PortfolioSummary = generatePortfolioSnapshot(
      trades,
      dividends,
      cashFlows,
      currentPrices
    );

    expect(summary.totalMarketValue).toBe(800);
    expect(summary.totalCostBasis).toBe(742.5);
    expect(summary.totalUnrealizedPnL).toBe(57.5);
    expect(summary.netCashBalance).toBeCloseTo(-0.38, 2); // FIXED
    expect(summary.realizedPnL).toBe(792);
    expect(summary.dividends[0].net).toBe(44.25);
  });
});
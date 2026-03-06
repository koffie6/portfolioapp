import React from "react";
import renderer from "react-test-renderer";
import PortfolioSummaryCard from "../src/components/PortfolioSummaryCard";
import { PortfolioSummary } from "../src/types/PortfolioTypes";

const mockSummary: PortfolioSummary = {
  holdings: [
    {
      ticker: "AAPL",
      company: "Apple Inc.",
      quantity: 5,
      averageCost: 148.5,
      currentPrice: 160,
      marketValue: 800,
      costBasis: 742.5,
      unrealizedPnL: 57.5,
    },
  ],
  dividends: [
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
  ],
  cashFlows: [],
  trades: [],
  totalMarketValue: 800,
  totalCostBasis: 742.5,
  totalUnrealizedPnL: 57.5,
  netCashBalance: -0.38,
  realizedPnL: 792,
};

describe("PortfolioSummaryCard", () => {
  it("renders correctly with sample summary", () => {
    const tree = renderer.create(<PortfolioSummaryCard summary={mockSummary} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with empty summary", () => {
    const emptySummary: PortfolioSummary = {
      holdings: [],
      dividends: [],
      cashFlows: [],
      trades: [],
      totalMarketValue: 0,
      totalCostBasis: 0,
      totalUnrealizedPnL: 0,
      netCashBalance: 0,
      realizedPnL: 0,
    };
    const tree = renderer.create(<PortfolioSummaryCard summary={emptySummary} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
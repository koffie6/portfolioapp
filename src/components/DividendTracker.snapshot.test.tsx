import React from "react";
import DividendTracker from "./DividendTracker";
import renderer from "react-test-renderer";
import { ParsedDividend } from "../utils/parseTransactionHistory";

// ✅ Provide mock dividends that satisfy ParsedDividend type
const mockDividends: ParsedDividend[] = [
  {
    date: "2025-01-15",
    ticker: "DSY",
    company: "Discovery",
    gross: 150.0,
    tax: 29.5,
    net: 120.5,
    currency: "ZAR",
  },
  {
    date: "2025-02-20",
    ticker: "NPN",
    company: "Naspers",
    gross: 300.0,
    tax: 50.0,
    net: 250.0,
    currency: "ZAR",
  },
];

describe("DividendTracker Snapshot", () => {
  it("matches the snapshot with sample dividends", () => {
    const tree = renderer.create(<DividendTracker dividends={mockDividends} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("matches the snapshot with no dividends", () => {
    const tree = renderer.create(<DividendTracker dividends={[]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
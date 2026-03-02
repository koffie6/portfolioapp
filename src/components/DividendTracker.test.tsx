import React from "react";
import { render } from "@testing-library/react-native";
import DividendTracker from "./DividendTracker";
import { ParsedDividend } from "../utils/parseTransactionHistory";

describe("DividendTracker Component", () => {
  it("renders with dividend ticker", () => {
    const dividends: ParsedDividend[] = [
      {
        ticker: "MSFT",
        company: "Microsoft Corp.",
        date: "2025-01-01",
        currency: "USD",
        gross: 50,
        tax: 10,
        net: 40,
      },
    ];

    const { getByText } = render(<DividendTracker dividends={dividends} />);
    expect(getByText(/MSFT/)).toBeTruthy();
  });
});
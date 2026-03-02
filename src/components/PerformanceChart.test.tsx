import React from "react";
import { render } from "@testing-library/react-native";
import PerformanceChart from "./PerformanceChart";
import { ParsedHolding } from "../utils/parseTransactionHistory";

describe("PerformanceChart Component", () => {
  it("renders with holding details", () => {
    const holdings: ParsedHolding[] = [
      {
        ticker: "AAPL",
        company: "Apple Inc.",
        quantity: 10,
        costBasis: 1000,
        currency: "USD",
      },
    ];

    const { getByText } = render(<PerformanceChart holdings={holdings} />);
    expect(getByText("Apple Inc. (AAPL) – 10 USD")).toBeTruthy();
  });
});
import React from "react";
import { render } from "@testing-library/react-native";
import CashFlowChart from "./CashFlowChart";
import { ParsedCashFlow } from "../utils/parseTransactionHistory";

describe("CashFlowChart Component", () => {
  it("renders with cash flow type", () => {
    const cashFlows: ParsedCashFlow[] = [
      {
        type: "Deposit",
        amount: 1000,
        date: "2025-02-01",
        currency: "USD",
      },
    ];

    const { getByText } = render(<CashFlowChart cashFlows={cashFlows} />);
    expect(getByText("Deposit – 1000 USD")).toBeTruthy();
  });
});
import React from "react";
import CashFlowChart from "./CashFlowChart";
import renderer from "react-test-renderer";
import { ParsedCashFlow } from "../utils/parseTransactionHistory";

// ✅ Mock Chart.js components to avoid canvas complexity
jest.mock("react-chartjs-2", () => ({
  Line: (props: any) => (
    <canvas role="img" aria-label={props?.data?.datasets?.[0]?.label || "Line Chart"} />
  ),
}));

describe("CashFlowChart Snapshot", () => {
  it("matches the snapshot with sample cash flows", () => {
    const cashFlows: ParsedCashFlow[] = [
      { date: "2025-01-01", amount: 1000, type: "deposit", currency: "ZAR" },
      { date: "2025-02-01", amount: -500, type: "withdrawal", currency: "ZAR" },
      { date: "2025-03-01", amount: 2000, type: "deposit", currency: "ZAR" },
    ];

    const tree = renderer.create(
      <CashFlowChart cashFlows={cashFlows} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
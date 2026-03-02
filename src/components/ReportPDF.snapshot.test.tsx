import React from "react";
import ReportPDF from "./ReportPDF";
import renderer from "react-test-renderer";
import { ParsedHolding, ParsedCashFlow } from "../utils/parseTransactionHistory";

// ✅ Mock Chart.js components
jest.mock("react-chartjs-2", () => ({
  Line: (props: any) => (
    <canvas role="img" aria-label={props?.data?.datasets?.[0]?.label || "Line Chart"} />
  ),
  Doughnut: (props: any) => (
    <canvas role="img" aria-label={props?.data?.datasets?.[0]?.label || "Doughnut Chart"} />
  ),
}));

describe("ReportPDF Snapshot", () => {
  it("matches the snapshot", () => {
    const holdings: ParsedHolding[] = [
      { ticker: "DSY", company: "Discovery", sector: "Finance", quantity: 100, currency: "ZAR", value: 5000 },
      { ticker: "NPN", company: "Naspers", sector: "Technology", quantity: 50, currency: "ZAR", value: 12000 },
    ];
    const cashFlows: ParsedCashFlow[] = [
      { date: "2025-01-01", amount: 1000, type: "deposit", currency: "ZAR" },
      { date: "2025-02-01", amount: -500, type: "withdrawal", currency: "ZAR" },
    ];

    const tree = renderer.create(
      <ReportPDF
        ownerName="Gerhard"
        holdings={holdings}
        cashFlows={cashFlows}
        dividends={[]}
        usdToZar={18.5}
        totalValue={17000}
        totalCost={15000}
        totalGainLoss={2000}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
import React from "react";
import PerformanceChart from "./PerformanceChart";
import renderer from "react-test-renderer";
import { ParsedHolding } from "../utils/parseTransactionHistory";

// ✅ Mock Chart.js components to avoid canvas complexity
jest.mock("react-chartjs-2", () => ({
  Line: (props: any) => (
    <canvas role="img" aria-label={props?.data?.datasets?.[0]?.label || "Performance Chart"} />
  ),
}));

describe("PerformanceChart Snapshot", () => {
  it("matches the snapshot with sample holdings", () => {
    const holdings: ParsedHolding[] = [
      {
        ticker: "DSY",
        company: "Discovery",
        sector: "Finance",
        quantity: 100,
        currency: "ZAR",
        value: 5000,
      },
      {
        ticker: "NPN",
        company: "Naspers",
        sector: "Technology",
        quantity: 50,
        currency: "ZAR",
        value: 12000,
      },
      {
        ticker: "SHP",
        company: "Shoprite",
        sector: "Retail",
        quantity: 75,
        currency: "ZAR",
        value: 8000,
      },
    ];

    const tree = renderer.create(
      <PerformanceChart holdings={holdings} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
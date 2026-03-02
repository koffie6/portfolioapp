import React from "react";
import SectorChart from "./SectorChart";
import renderer from "react-test-renderer";
import { ParsedHolding } from "../utils/parseTransactionHistory";

// ✅ Mock Chart.js components to avoid canvas complexity
jest.mock("react-chartjs-2", () => ({
  Doughnut: (props: any) => (
    <canvas role="img" aria-label={props?.data?.datasets?.[0]?.label || "Sector Chart"} />
  ),
}));

describe("SectorChart Snapshot", () => {
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
      <SectorChart holdings={holdings} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
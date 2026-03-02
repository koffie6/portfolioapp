import React from "react";
import { render } from "@testing-library/react-native";
import SectorChart from "./SectorChart";
import { ParsedHolding } from "../utils/parseTransactionHistory";

describe("SectorChart Component", () => {
  it("renders with sector label", () => {
    const holdings: ParsedHolding[] = [
      {
        ticker: "TSLA",
        company: "Tesla Inc.",
        quantity: 5,
        costBasis: 2000,
        currency: "USD",
        sector: "Automotive",
      },
    ];

    const { getByText } = render(<SectorChart holdings={holdings} />);
    expect(getByText("Automotive")).toBeTruthy();
  });
});
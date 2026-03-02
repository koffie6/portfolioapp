import React from "react";
import renderer from "react-test-renderer";
import PortfolioSummaryCard from "../src/components/PortfolioSummaryCard";

describe("PortfolioSummaryCard", () => {
  it("renders correctly with sample data", () => {
    const transactions = [
      { shares: 100, price: 50 },
      { shares: 10, price: 0 }, // gifted
    ];
    const holdings = { shares: 110, cash: 500 };

    const tree = renderer
      .create(<PortfolioSummaryCard transactions={transactions} holdings={holdings} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with large values", () => {
    const transactions = [{ shares: 1000, price: 1000 }];
    const holdings = { shares: 1000, cash: 2500000 };

    const tree = renderer
      .create(<PortfolioSummaryCard transactions={transactions} holdings={holdings} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
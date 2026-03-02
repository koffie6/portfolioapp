import React from "react";
import renderer from "react-test-renderer";
import PortfolioInput from "./PortfolioInput";

describe("PortfolioInput Snapshot", () => {
  it("matches snapshot with placeholder", () => {
    const tree = renderer
      .create(<PortfolioInput placeholder="Enter amount" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
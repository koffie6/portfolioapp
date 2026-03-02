import React from "react";
import renderer from "react-test-renderer";
import Dashboard from "./Dashboard";

describe("Dashboard Integration Snapshot", () => {
  it("matches snapshot with chart data", () => {
    const chartData = {
      datasets: [{ label: "Snapshot Chart", data: [10, 20, 30] }],
    };

    const tree = renderer.create(<Dashboard chartData={chartData} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
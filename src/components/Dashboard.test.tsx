import React from "react";
import { render } from "@testing-library/react-native";
import Dashboard from "./Dashboard";

describe("Dashboard Component", () => {
  it("renders chart with dataset label text", () => {
    const chartData = {
      datasets: [{ label: "Portfolio Performance", data: [1, 2, 3] }],
    };

    const { getByText } = render(<Dashboard chartData={chartData} />);
    expect(getByText("Portfolio Performance")).toBeTruthy();
  });
});
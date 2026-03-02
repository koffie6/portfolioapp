import React from "react";
import { render } from "@testing-library/react-native";
import Dashboard from "./Dashboard";

describe("Dashboard Integration", () => {
  it("renders dashboard with integration chart label", () => {
    const chartData = {
      datasets: [{ label: "Integration Chart", data: [5, 10, 15] }],
    };

    const { getByText } = render(<Dashboard chartData={chartData} />);
    expect(getByText("Integration Chart")).toBeTruthy();
  });
});
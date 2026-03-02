import React from "react";
import { render } from "@testing-library/react-native";
import SentimentGauge from "./SentimentGauge";

describe("SentimentGauge Component", () => {
  it("renders with sentiment percentage", () => {
    const { getByText } = render(<SentimentGauge sentiment={0.75} />);
    expect(getByText("75% Positive")).toBeTruthy();
  });
});
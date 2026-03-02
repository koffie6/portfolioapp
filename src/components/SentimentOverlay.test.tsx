import React from "react";
import { render } from "@testing-library/react-native";
import SentimentOverlay from "./SentimentOverlay";

// Mock SentimentGauge safely: require Text inside the factory
jest.mock("./SentimentGauge", () => {
  const { Text } = require("react-native");
  return ({ sentiment }: { sentiment: number }) => (
    <Text>{`Gauge sentiment: ${sentiment}`}</Text>
  );
});

describe("SentimentOverlay Component", () => {
  it("renders overlay with mocked gauge", () => {
    const { getByText } = render(<SentimentOverlay sentiment={0.8} />);
    expect(getByText("Gauge sentiment: 0.8")).toBeTruthy();
  });
});
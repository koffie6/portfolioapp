import React from "react";
import renderer from "react-test-renderer";
import SentimentGauge from "./SentimentGauge";

describe("SentimentGauge Snapshot", () => {
  it("matches snapshot with sentiment value", () => {
    const tree = renderer.create(<SentimentGauge sentiment={0.75} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
import React from "react";
import renderer from "react-test-renderer";
import SentimentOverlay from "./SentimentOverlay";

describe("SentimentOverlay Snapshot", () => {
  it("matches the snapshot with sentiment gauges", () => {
    // Provide a valid sentiment prop so the component renders correctly
    const tree = renderer.create(<SentimentOverlay sentiment={0.65} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
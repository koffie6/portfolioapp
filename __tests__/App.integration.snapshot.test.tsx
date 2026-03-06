import React from "react";
import renderer from "react-test-renderer";
import App from "../App";

describe("App Integration Snapshot", () => {
  it("matches the snapshot for the full App tree", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
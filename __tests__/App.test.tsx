import React from "react";
import ReactTestRenderer from "react-test-renderer";
import App from "../App";

describe("App Component", () => {
  it("renders correctly", () => {
    const tree = ReactTestRenderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
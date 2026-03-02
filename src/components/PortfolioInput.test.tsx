import React from "react";
import { render } from "@testing-library/react-native";
import PortfolioInput from "./PortfolioInput";

describe("PortfolioInput Component", () => {
  it("renders input field with placeholder", () => {
    const { getByPlaceholderText } = render(
      <PortfolioInput placeholder="Enter amount" />
    );

    expect(getByPlaceholderText("Enter amount")).toBeTruthy();
  });
});
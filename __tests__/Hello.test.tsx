import React from "react";
import { render } from "@testing-library/react-native";
import { Text } from "react-native";

const Hello = () => <Text>Hello, Gerhard!</Text>;

test("renders greeting", () => {
  const { getByText } = render(<Hello />);
  expect(getByText("Hello, Gerhard!")).toBeTruthy();
});
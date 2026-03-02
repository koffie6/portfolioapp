import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Text, TouchableOpacity } from "react-native";

const Button = ({ onPress, title }: { onPress: () => void; title: string }) => (
  <TouchableOpacity onPress={onPress} testID="button">
    <Text>{title}</Text>
  </TouchableOpacity>
);

describe("Button component", () => {
  it("renders with the correct title", () => {
    const { getByText } = render(<Button onPress={() => {}} title="Click Me" />);
    expect(getByText("Click Me")).toBeTruthy();
  });

  it("calls onPress when tapped", () => {
    const mockPress = jest.fn();
    const { getByTestId } = render(<Button onPress={mockPress} title="Tap" />);
    fireEvent.press(getByTestId("button"));
    expect(mockPress).toHaveBeenCalledTimes(1);
  });
});
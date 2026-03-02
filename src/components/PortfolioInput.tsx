import React from "react";
import { TextInput, StyleSheet, View } from "react-native";

interface Props {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

const PortfolioInput: React.FC<Props> = ({ placeholder, value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
});

export default PortfolioInput;
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ParsedHolding } from "../utils/parseTransactionHistory";

interface Props {
  holdings: ParsedHolding[];
}

const PerformanceChart: React.FC<Props> = ({ holdings }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Performance Chart</Text>
      {holdings.map((h, idx) => (
        <Text key={idx} style={styles.holdingLabel}>
          {h.company} ({h.ticker}) – {h.quantity} {h.currency}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  holdingLabel: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
});

export default PerformanceChart;
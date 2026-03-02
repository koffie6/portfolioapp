import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ParsedCashFlow } from "../utils/parseTransactionHistory";

interface Props {
  cashFlows: ParsedCashFlow[];
}

const CashFlowChart: React.FC<Props> = ({ cashFlows }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cash Flow Chart</Text>
      {cashFlows.map((cf, idx) => (
        <Text key={idx} style={styles.flowLabel}>
          {cf.type} – {cf.amount} {cf.currency}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  flowLabel: { fontSize: 14, color: "#333", marginBottom: 4 },
});

export default CashFlowChart;
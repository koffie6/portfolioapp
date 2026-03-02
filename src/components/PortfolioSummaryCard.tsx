import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { getPortfolioSummary, Transaction, Holdings } from "../portfolioCalculations";
import { formatCurrency, formatShares } from "../formatting";

type Props = {
  transactions: Transaction[];
  holdings: Holdings;
};

const PortfolioSummaryCard: React.FC<Props> = ({ transactions, holdings }) => {
  const summary = getPortfolioSummary(transactions, holdings);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Portfolio Summary</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Weighted Avg Cost:</Text>
        <Text style={styles.value}>{formatCurrency(summary.weightedAverageCost)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Total Shares:</Text>
        <Text style={styles.value}>{formatShares(summary.totalShares)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Cash Balance:</Text>
        <Text style={styles.value}>{formatCurrency(summary.cashBalance)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#555",
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
});

export default PortfolioSummaryCard;
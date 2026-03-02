import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ParsedDividend } from "../utils/parseTransactionHistory";

interface Props {
  dividends: ParsedDividend[];
}

const DividendTracker: React.FC<Props> = ({ dividends }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dividend Tracker</Text>
      {dividends.map((d, idx) => (
        <Text key={idx} style={styles.dividendLabel}>
          {d.ticker} – Gross: {d.gross} {d.currency}, Tax: {d.tax}, Net: {d.net}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  dividendLabel: { fontSize: 14, color: "#333", marginBottom: 4 },
});

export default DividendTracker;
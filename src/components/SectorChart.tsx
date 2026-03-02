import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ParsedHolding } from "../utils/parseTransactionHistory";

interface Props {
  holdings: ParsedHolding[];
}

const SectorChart: React.FC<Props> = ({ holdings }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sector Chart</Text>
      {holdings.map((h, idx) => (
        <Text key={idx} style={styles.sectorLabel}>
          {h.sector}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  sectorLabel: { fontSize: 14, color: "#333", marginBottom: 4 },
});

export default SectorChart;
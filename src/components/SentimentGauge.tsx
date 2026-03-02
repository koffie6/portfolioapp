import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  sentiment: number; // 0 to 1
}

const SentimentGauge: React.FC<Props> = ({ sentiment }) => {
  const percentage = Math.round(sentiment * 100);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sentiment Gauge</Text>
      <Text style={styles.value}>{percentage}% Positive</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  value: { fontSize: 14, color: "#333" },
});

export default SentimentGauge;
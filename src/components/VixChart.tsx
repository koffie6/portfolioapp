import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

interface VixRecord {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface Props {
  data: VixRecord[];
}

const VixChart: React.FC<Props> = ({ data }) => {
  // Take last 30 records for readability
  const recent = data.slice(-30);

  const labels = recent.map(r => r.date);
  const closes = recent.map(r => r.close);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>VIX Trend (Last 30 Days)</Text>
      <LineChart
        data={{
          labels,
          datasets: [{ data: closes }],
        }}
        width={Dimensions.get("window").width - 32}
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#f5f5f5",
          backgroundGradientTo: "#e0e0e0",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: "3",
            strokeWidth: "1",
            stroke: "#000",
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  chart: {
    borderRadius: 8,
  },
});

export default VixChart;
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Dataset {
  label: string;
  data: number[];
}

interface ChartData {
  datasets: Dataset[];
}

interface Props {
  chartData: ChartData;
}

const Dashboard: React.FC<Props> = ({ chartData }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      {chartData.datasets.map((ds, idx) => (
        <Text key={idx} style={styles.datasetLabel}>
          {ds.label}
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
  datasetLabel: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
});

export default Dashboard;
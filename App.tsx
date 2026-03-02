import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Dashboard from "./src/components/Dashboard";

const App: React.FC = () => {
  // Provide default chartData so Dashboard always has valid props
  const chartData = {
    datasets: [{ label: "Default Chart", data: [5, 10, 15] }],
  };

  return (
    <SafeAreaView style={styles.container}>
      <Dashboard chartData={chartData} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;
import React from "react";
import { View, StyleSheet } from "react-native";
import SentimentGauge from "./SentimentGauge";

interface Props {
  sentiment: number; // 0 to 1
}

const SentimentOverlay: React.FC<Props> = ({ sentiment }) => {
  return (
    <View style={styles.overlay}>
      <SentimentGauge sentiment={sentiment} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});

export default SentimentOverlay;
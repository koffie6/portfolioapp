import { Text, View } from 'react-native';

type SentimentGaugeProps = {
  sentiment?: number | null;
  accessibilityLabel?: string;
};

export default function SentimentGauge({
  sentiment,
  accessibilityLabel,
}: SentimentGaugeProps): JSX.Element {
  let displayValue: string;

  if (sentiment === undefined || sentiment === null) {
    displayValue = 'No data available';
  } else {
    const percentage =
      sentiment <= 1 && sentiment >= 0
        ? Math.round(sentiment * 100)
        : sentiment;
    displayValue = `${percentage}% Positive`;
  }

  return (
    <View accessibilityLabel={accessibilityLabel}>
      <Text>Sentiment Gauge</Text>
      <Text>{displayValue}</Text>
    </View>
  );
}

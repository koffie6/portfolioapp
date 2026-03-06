import { Text, View } from 'react-native';

export type ParsedDividend = {
  date: string;
  amount?: number;
  ticker: string;
  description?: string;
  cashManagementFee?: number;
  vat?: number;
};

type DividendTrackerProps = {
  dividends?: ParsedDividend[] | null;
  accessibilityLabel?: string;
};

export default function DividendTracker({
  dividends,
  accessibilityLabel,
}: DividendTrackerProps): JSX.Element {
  const safeDividends = dividends ?? [];

  return (
    <View accessibilityLabel={accessibilityLabel}>
      <Text>Dividend Tracker</Text>
      {safeDividends.length === 0 ? (
        <Text>No data available</Text>
      ) : (
        safeDividends.map((d, idx) => {
          const amountText =
            typeof d.amount === 'number' ? `R${d.amount.toFixed(2)}` : 'R0.00';
          const descriptionText = d.description ? ` ${d.description}` : '';
          return (
            <Text key={idx}>
              {d.date} — {d.ticker}: {amountText}
              {descriptionText}
            </Text>
          );
        })
      )}
    </View>
  );
}

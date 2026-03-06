import { StyleSheet, Text, View } from 'react-native';

type Holding = {
  ticker: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
};

type Summary = {
  totalMarketValue: number;
  totalCostBasis: number;
  totalGainLoss: number;
};

type Props = {
  holdings?: Holding[];
  summary?: Summary;
};

export default function PortfolioSummaryCard({
  holdings = [],
  summary,
}: Props) {
  const hasData = summary && holdings.length > 0;

  if (!hasData) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Portfolio Summary</Text>
        <Text style={styles.empty}>No data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Portfolio Summary</Text>
      <Text style={styles.value}>
        Total Market Value: R{summary!.totalMarketValue.toFixed(2)}
      </Text>
      <Text style={styles.value}>
        Total Cost Basis: R{summary!.totalCostBasis.toFixed(2)}
      </Text>
      <Text style={styles.value}>
        Total Gain/Loss: R{summary!.totalGainLoss.toFixed(2)}
      </Text>

      {holdings.map((h, idx) => (
        <View key={idx} style={styles.holding}>
          <Text style={styles.ticker}>{h.ticker}</Text>
          <Text style={styles.detail}>Shares: {h.shares}</Text>
          <Text style={styles.detail}>Avg Price: R{h.avgPrice.toFixed(2)}</Text>
          <Text style={styles.detail}>
            Current Price: R{h.currentPrice.toFixed(2)}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  empty: {
    fontSize: 14,
    color: '#888',
  },
  value: {
    fontSize: 14,
    marginBottom: 4,
  },
  holding: {
    marginTop: 8,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  ticker: {
    fontSize: 16,
    fontWeight: '600',
  },
  detail: {
    fontSize: 14,
  },
});

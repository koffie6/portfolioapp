// src/components/Dashboard.tsx
import { Text, View } from 'react-native';
import CashFlowChart from './CashFlowChart';
import DividendTracker from './DividendTracker';
import SentimentGauge from './SentimentGauge';

type DashboardProps = {
  sentiment?: number | null;
  dividends?: any[] | null;
  cashFlows?: any[] | null;
};

export default function Dashboard({
  sentiment,
  dividends,
  cashFlows,
}: DashboardProps): JSX.Element {
  const safeSentiment = sentiment ?? null;
  const safeDividends = dividends ?? [];
  const safeCashFlows = cashFlows ?? [];

  return (
    <View>
      <Text>Dashboard</Text>
      <SentimentGauge sentiment={safeSentiment} />
      <DividendTracker dividends={safeDividends} />
      <CashFlowChart cashFlows={safeCashFlows} />
    </View>
  );
}

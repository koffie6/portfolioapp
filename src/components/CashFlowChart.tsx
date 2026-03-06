import { Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

type CashFlow = {
  date: string;
  inflow?: number;
  outflow?: number;
};

type CashFlowChartProps = {
  cashFlows?: CashFlow[] | null;
  accessibilityLabel?: string;
};

export default function CashFlowChart({
  cashFlows,
  accessibilityLabel,
}: CashFlowChartProps): JSX.Element {
  const safeCashFlows = cashFlows ?? [];

  if (safeCashFlows.length === 0) {
    return (
      <View accessibilityLabel={accessibilityLabel}>
        <Text>Cash Flow Chart</Text>
        <Text>No data available</Text>
      </View>
    );
  }

  const labels = safeCashFlows.map((cf) => cf.date);
  const inflows = safeCashFlows.map((cf) => cf.inflow ?? 0);
  const outflows = safeCashFlows.map((cf) => cf.outflow ?? 0);

  return (
    <View accessibilityLabel={accessibilityLabel}>
      <Text>Cash Flow Chart</Text>
      {safeCashFlows.map((cf, idx) => {
        const inflowText = cf.inflow !== undefined ? cf.inflow.toString() : '0';
        return <Text key={idx}>Deposit – {inflowText} USD</Text>;
      })}
      <LineChart
        data={{
          labels,
          datasets: [
            { data: inflows, color: () => 'green', strokeWidth: 2 },
            { data: outflows, color: () => 'red', strokeWidth: 2 },
          ],
          legend: ['Inflows', 'Outflows'],
        }}
        width={320}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#f5f5f5',
          backgroundGradientTo: '#e0e0e0',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
        }}
        bezier
        style={{ marginVertical: 8 }}
      />
    </View>
  );
}

// __tests__/PerformanceChart.stressModes.test.tsx
import { render } from '@testing-library/react-native';
import PerformanceChart from '../src/components/PerformanceChart';

describe('PerformanceChart Stress Modes', () => {
  it('renders without crashing under normal conditions', () => {
    const holdings = [
      { ticker: 'AAPL', shares: 10, avgPrice: 150, currentPrice: 175 },
      { ticker: 'MSFT', shares: 5, avgPrice: 250, currentPrice: 300 },
    ];

    const { getByText } = render(<PerformanceChart holdings={holdings} />);
    expect(getByText(/Performance Chart/i)).toBeTruthy();
  });

  it('renders with edge case: empty holdings', () => {
    const holdings: any[] = [];
    const { getByText } = render(<PerformanceChart holdings={holdings} />);
    expect(getByText(/Performance Chart/i)).toBeTruthy();
    // No "No data available" text, just heading
  });

  it('renders with edge case: negative values', () => {
    const holdings = [
      { ticker: 'LOSS', shares: 10, avgPrice: 200, currentPrice: 50 },
    ];

    const { getByText, queryByText } = render(
      <PerformanceChart holdings={holdings} />,
    );
    expect(getByText(/Performance Chart/i)).toBeTruthy();
    // Match ticker substring regardless of formatting
    expect(queryByText(/LOSS/)).toBeTruthy();
  });

  it('renders with edge case: large dataset', () => {
    const holdings = Array.from({ length: 100 }).map((_, i) => ({
      ticker: `TICK${i}`,
      shares: i + 1,
      avgPrice: 100 + i,
      currentPrice: 150 + i,
    }));

    const { getByText, queryByText } = render(
      <PerformanceChart holdings={holdings} />,
    );
    expect(getByText(/Performance Chart/i)).toBeTruthy();
    // Match ticker substring regardless of parentheses/spaces
    expect(queryByText(/TICK0/)).toBeTruthy();
  });
});

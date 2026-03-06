import { render } from '@testing-library/react-native';
import PortfolioSummaryCard from '../src/components/PortfolioSummaryCard';

function generateStressSummary() {
  return {
    totalMarketValue: Math.floor(Math.random() * 100000),
    totalCostBasis: Math.floor(Math.random() * 80000),
    totalGainLoss: Math.floor(Math.random() * 20000),
  };
}

function generateStressHoldings(count: number) {
  const tickers = ['AAPL', 'MSFT', 'TSLA', 'GOOG', 'AMZN'];
  return Array.from({ length: count }).map((_, i) => ({
    ticker: tickers[i % tickers.length],
    shares: Math.floor(Math.random() * 100),
    avgPrice: parseFloat((Math.random() * 1000).toFixed(2)),
    currentPrice: parseFloat((Math.random() * 1200).toFixed(2)),
  }));
}

describe('PortfolioSummaryCard Stress Modes', () => {
  it('renders without crashing with stress summary and holdings', () => {
    const summary = generateStressSummary();
    const holdings = generateStressHoldings(5);

    const { getByText } = render(
      <PortfolioSummaryCard summary={summary} holdings={holdings} />,
    );

    // Basic structure assertions
    expect(getByText('Portfolio Summary')).toBeTruthy();

    // Ensure at least one ticker is rendered
    expect(getByText(holdings[0].ticker)).toBeTruthy();
  });

  it('renders with edge cases (zero and negative values)', () => {
    const summary = {
      totalMarketValue: 0,
      totalCostBasis: -100,
      totalGainLoss: -100,
    };

    const holdings = [
      { ticker: 'ZERO', shares: 0, avgPrice: 0, currentPrice: 0 },
      { ticker: 'NEG', shares: -5, avgPrice: -100, currentPrice: -50 },
    ];

    const { getByText } = render(
      <PortfolioSummaryCard summary={summary} holdings={holdings} />,
    );

    expect(getByText('Portfolio Summary')).toBeTruthy();
    expect(getByText('ZERO')).toBeTruthy();
    expect(getByText('NEG')).toBeTruthy();
  });
});

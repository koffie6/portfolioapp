// src/components/PortfolioSummaryCard.integration.test.tsx
import { render } from '@testing-library/react-native';
import PortfolioSummaryCard from './PortfolioSummaryCard';

describe('PortfolioSummaryCard Integration', () => {
  it('renders with empty state', () => {
    const { getByText } = render(<PortfolioSummaryCard holdings={[]} />);
    expect(getByText('Portfolio Summary')).toBeTruthy();
    expect(getByText('No data available')).toBeTruthy();
  });

  it('renders with populated holdings and summary', () => {
    const mockSummary = {
      totalMarketValue: 10000,
      totalCostBasis: 8000,
      totalGainLoss: 2000,
    };

    const mockHoldings = [
      { ticker: 'AAPL', shares: 10, avgPrice: 150.0, currentPrice: 175.0 },
      { ticker: 'MSFT', shares: 5, avgPrice: 250.0, currentPrice: 300.0 },
    ];

    const { getByText } = render(
      <PortfolioSummaryCard summary={mockSummary} holdings={mockHoldings} />,
    );

    expect(getByText('Portfolio Summary')).toBeTruthy();
    expect(getByText('AAPL')).toBeTruthy();
    expect(getByText('MSFT')).toBeTruthy();
    expect(getByText(/R150\.00/)).toBeTruthy();
    expect(getByText(/R175\.00/)).toBeTruthy();
    expect(getByText(/R250\.00/)).toBeTruthy();
    expect(getByText(/R300\.00/)).toBeTruthy();
  });
});

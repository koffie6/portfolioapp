import { render } from '@testing-library/react-native';
import PortfolioSummaryCard from './PortfolioSummaryCard';

describe('PortfolioSummaryCard Snapshot', () => {
  it('matches snapshot with empty state', () => {
    const tree = render(<PortfolioSummaryCard holdings={[]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot with populated holdings', () => {
    const mockHoldings = [
      { ticker: 'AAPL', shares: 10, avgPrice: 150.0, currentPrice: 175.0 },
      { ticker: 'MSFT', shares: 5, avgPrice: 250.0, currentPrice: 300.0 },
    ];

    const tree = render(
      <PortfolioSummaryCard holdings={mockHoldings} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

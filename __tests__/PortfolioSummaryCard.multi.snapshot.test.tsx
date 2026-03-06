import renderer from 'react-test-renderer';
import PortfolioSummaryCard from '../src/components/PortfolioSummaryCard';

describe('PortfolioSummaryCard Multi-Holding Snapshot', () => {
  it('renders correctly with multiple holdings and summary', () => {
    const summary = {
      totalMarketValue: 20000,
      totalCostBasis: 15000,
      totalGainLoss: 5000,
    };

    const holdings = [
      { ticker: 'AAPL', shares: 10, avgPrice: 150.0, currentPrice: 175.0 },
      { ticker: 'MSFT', shares: 5, avgPrice: 250.0, currentPrice: 300.0 },
      { ticker: 'TSLA', shares: 2, avgPrice: 700.0, currentPrice: 800.0 },
    ];

    const tree = renderer
      .create(<PortfolioSummaryCard summary={summary} holdings={holdings} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

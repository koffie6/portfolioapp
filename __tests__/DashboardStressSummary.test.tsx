import { render } from '@testing-library/react-native';
import PerformanceChart from '../src/components/PerformanceChart';
import PortfolioInput from '../src/components/PortfolioInput';
import SectorChart from '../src/components/SectorChart';
import SentimentOverlay from '../src/components/SentimentOverlay';

// Define a local Holding type for tests
interface Holding {
  ticker: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  sector?: string;
}

describe('Dashboard Stress Summary', () => {
  // ... existing tests ...

  it('handles chaotic dataset across all components', () => {
    const holdings: Holding[] = [
      {
        ticker: 'NEG',
        shares: -10,
        avgPrice: 150,
        currentPrice: 175,
        sector: 'Technology',
      }, // negative shares
      {
        ticker: 'ZERO',
        shares: 0,
        avgPrice: 200,
        currentPrice: 0,
        sector: 'Finance',
      }, // zero shares & price
      {
        ticker: 'HIGH',
        shares: 1,
        avgPrice: 1,
        currentPrice: 1000000,
        sector: 'Energy',
      }, // extreme price
      {
        ticker: 'MIX',
        shares: 5,
        avgPrice: 0,
        currentPrice: 50,
        sector: 'Healthcare',
      }, // avgPrice = 0
    ];

    const tree = render(
      <>
        <PerformanceChart holdings={holdings} />
        <SectorChart holdings={holdings} />
        <SentimentOverlay sentiment={-0.25} />
        <PortfolioInput />
      </>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

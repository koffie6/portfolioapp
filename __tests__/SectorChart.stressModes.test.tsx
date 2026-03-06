// __tests__/SectorChart.stressModes.test.tsx
import { render } from '@testing-library/react-native';
import SectorChart from '../src/components/SectorChart';

describe('SectorChart Stress Modes', () => {
  it('renders without crashing under normal conditions', () => {
    const holdings = [
      {
        ticker: 'AAPL',
        shares: 10,
        avgPrice: 150,
        currentPrice: 175,
        sector: 'Technology',
      },
      {
        ticker: 'JPM',
        shares: 5,
        avgPrice: 100,
        currentPrice: 120,
        sector: 'Finance',
      },
      {
        ticker: 'PFE',
        shares: 8,
        avgPrice: 50,
        currentPrice: 60,
        sector: 'Healthcare',
      },
    ];

    const { getByText } = render(<SectorChart holdings={holdings} />);
    expect(getByText(/Sector Chart/i)).toBeTruthy();
  });

  it('renders with edge case: empty holdings', () => {
    const holdings: any[] = [];
    const { getByText } = render(<SectorChart holdings={holdings} />);
    expect(getByText(/Sector Chart/i)).toBeTruthy();
  });

  it('renders with edge case: extreme distribution', () => {
    const holdings = [
      {
        ticker: 'XOM',
        shares: 100,
        avgPrice: 50,
        currentPrice: 60,
        sector: 'Energy',
      },
      {
        ticker: 'DUK',
        shares: 1,
        avgPrice: 80,
        currentPrice: 85,
        sector: 'Utilities',
      },
    ];

    const { getByText, queryByText } = render(
      <SectorChart holdings={holdings} />,
    );
    expect(getByText(/Sector Chart/i)).toBeTruthy();
    expect(queryByText(/Energy/)).toBeTruthy();
    expect(queryByText(/Utilities/)).toBeTruthy();
  });

  it('renders with edge case: large dataset', () => {
    const holdings = Array.from({ length: 50 }).map((_, i) => ({
      ticker: `TICK${i}`,
      shares: i + 1,
      avgPrice: 100 + i,
      currentPrice: 150 + i,
      sector: `Sector${i}`,
    }));

    const { getByText, queryByText } = render(
      <SectorChart holdings={holdings} />,
    );
    expect(getByText(/Sector Chart/i)).toBeTruthy();
    expect(queryByText(/Sector0/)).toBeTruthy();
  });
});

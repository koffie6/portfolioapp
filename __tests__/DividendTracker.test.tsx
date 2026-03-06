// __tests__/DividendTracker.test.tsx
import DividendTracker from '@src/components/DividendTracker';
import { render } from '@testing-library/react-native';

describe('DividendTracker Component', () => {
  const mockDividends = [
    { date: '2025-01-15', amount: 250.0, ticker: 'AAPL' },
    { date: '2025-02-20', amount: 180.5, ticker: 'MSFT' },
  ];

  it('renders tracker heading', () => {
    const { getByText } = render(<DividendTracker dividends={mockDividends} />);
    expect(getByText('Dividend Tracker')).toBeTruthy();
  });

  it('renders dividend entries', () => {
    const { getByText } = render(<DividendTracker dividends={mockDividends} />);
    expect(getByText(/AAPL/)).toBeTruthy();
    expect(getByText(/MSFT/)).toBeTruthy();
  });

  it('matches snapshot', () => {
    const tree = render(<DividendTracker dividends={mockDividends} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

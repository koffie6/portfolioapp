import { render } from '@testing-library/react-native';
import DividendTracker from '../src/components/DividendTracker';

describe('DividendTracker Stress Modes', () => {
  it('renders with valid dividends', () => {
    const mockDividends = [
      {
        date: '2026-03-01',
        amount: 123.45,
        ticker: 'TICK0',
        description: 'Dividend 0',
      },
    ];
    const { getByText } = render(<DividendTracker dividends={mockDividends} />);
    expect(getByText('Dividend Tracker')).toBeTruthy();
    expect(getByText(/R123\.45/)).toBeTruthy();
  });

  it('renders empty state when dividends are undefined', () => {
    const { getByText } = render(
      <DividendTracker dividends={undefined as any} />,
    );
    expect(getByText('Dividend Tracker')).toBeTruthy();
    expect(getByText('No data available')).toBeTruthy();
  });

  it('renders empty state when dividends are null', () => {
    const { getByText } = render(<DividendTracker dividends={null as any} />);
    expect(getByText('Dividend Tracker')).toBeTruthy();
    expect(getByText('No data available')).toBeTruthy();
  });
});

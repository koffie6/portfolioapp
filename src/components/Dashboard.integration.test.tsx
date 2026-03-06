import { render } from '@testing-library/react-native';
import Dashboard from './Dashboard';

describe('Dashboard Integration', () => {
  it('renders dashboard with empty state', () => {
    const { getByText, getAllByText } = render(<Dashboard />);
    expect(getByText('Dashboard')).toBeTruthy();
    expect(getByText('Sentiment Gauge')).toBeTruthy();
    expect(getByText('Dividend Tracker')).toBeTruthy();
    expect(getByText('Cash Flow Chart')).toBeTruthy();

    const emptyStates = getAllByText('No data available');
    expect(emptyStates.length).toBeGreaterThanOrEqual(3);
  });

  it('renders dashboard with populated props', () => {
    const mockProps = {
      sentiment: 75,
      dividends: [
        {
          date: '2026-03-01',
          amount: 250.0,
          ticker: 'TICK1',
          description: 'Dividend 1',
        },
      ],
      cashFlows: [{ date: '2026-03-01', inflow: 2000, outflow: 500 }],
    };

    const { getByText } = render(<Dashboard {...mockProps} />);
    expect(getByText('Dashboard')).toBeTruthy();
    expect(getByText('Sentiment Gauge')).toBeTruthy();
    expect(getByText(/% Positive/)).toBeTruthy();
    expect(getByText('Dividend Tracker')).toBeTruthy();
    expect(getByText(/R250\.00/)).toBeTruthy();
    expect(getByText('Cash Flow Chart')).toBeTruthy();
    expect(getByText('Deposit – 2000 USD')).toBeTruthy();
  });
});

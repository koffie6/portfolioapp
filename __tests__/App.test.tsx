import { render } from '@testing-library/react-native';
import App from '../App';

describe('App Component', () => {
  it('renders correctly with empty state', () => {
    const { getByText, getAllByText } = render(<App />);
    expect(getByText('Dashboard')).toBeTruthy();
    expect(getByText('Sentiment Gauge')).toBeTruthy();
    expect(getByText('Dividend Tracker')).toBeTruthy();
    expect(getByText('Cash Flow Chart')).toBeTruthy();

    const emptyStates = getAllByText('No data available');
    expect(emptyStates.length).toBeGreaterThanOrEqual(3);
  });

  it('renders correctly with populated props', () => {
    const mockProps = {
      sentiment: 85,
      dividends: [
        {
          date: '2026-03-01',
          amount: 500.0,
          ticker: 'TICK2',
          description: 'Dividend 2',
        },
      ],
      cashFlows: [{ date: '2026-03-01', inflow: 3000, outflow: 1000 }],
    };

    const { getByText } = render(<App {...mockProps} />);
    expect(getByText('Dashboard')).toBeTruthy();
    expect(getByText('Sentiment Gauge')).toBeTruthy();
    expect(getByText(/% Positive/)).toBeTruthy();
    expect(getByText('Dividend Tracker')).toBeTruthy();
    expect(getByText(/R500\.00/)).toBeTruthy();
    expect(getByText('Cash Flow Chart')).toBeTruthy();
    expect(getByText('Deposit – 3000 USD')).toBeTruthy();
  });

  it('matches snapshot with empty state', () => {
    const tree = render(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot with populated props', () => {
    const mockProps = {
      sentiment: 85,
      dividends: [
        {
          date: '2026-03-01',
          amount: 500.0,
          ticker: 'TICK2',
          description: 'Dividend 2',
        },
      ],
      cashFlows: [{ date: '2026-03-01', inflow: 3000, outflow: 1000 }],
    };

    const tree = render(<App {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

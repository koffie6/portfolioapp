import { render } from '@testing-library/react-native';
import Dashboard from './Dashboard';

describe('Dashboard Snapshot', () => {
  it('matches snapshot with empty state', () => {
    const tree = render(<Dashboard />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot with populated props', () => {
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

    const tree = render(<Dashboard {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

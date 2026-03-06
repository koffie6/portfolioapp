import { render } from '@testing-library/react-native';
import DividendTracker from './DividendTracker';

describe('DividendTracker Snapshot', () => {
  it('matches snapshot with valid dividends', () => {
    const mockDividends = [
      {
        date: '2026-03-01',
        amount: 123.45,
        ticker: 'TICK0',
        description: 'Dividend 0',
      },
    ];
    const tree = render(<DividendTracker dividends={mockDividends} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot with empty state', () => {
    const tree = render(
      <DividendTracker dividends={undefined as any} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

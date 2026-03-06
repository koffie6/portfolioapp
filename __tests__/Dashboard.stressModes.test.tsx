import { render } from '@testing-library/react-native';
import CashFlowChart from '../src/components/CashFlowChart';
import DividendTracker from '../src/components/DividendTracker';
import SentimentGauge from '../src/components/SentimentGauge';

describe('Dashboard Combined Stress Modes', () => {
  it('renders SentimentGauge with chaotic sentiment values', () => {
    const { getByText } = render(<SentimentGauge sentiment={50} />);
    expect(getByText('Sentiment Gauge')).toBeTruthy();
  });

  it('renders DividendTracker with randomized dividends', () => {
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
  });

  it('renders CashFlowChart with randomized cashFlows', () => {
    const mockCashFlows = [{ date: '2026-03-01', inflow: 1000, outflow: 500 }];
    const { getByText } = render(<CashFlowChart cashFlows={mockCashFlows} />);
    expect(getByText('Cash Flow Chart')).toBeTruthy();
  });

  it('matches snapshot for combined fixed data', () => {
    const fixedSentiment = 36;
    const fixedDividends = [
      {
        date: '2026-03-01',
        amount: -3052.65,
        ticker: 'TICK0',
        description: 'Dividend 0',
      },
    ];
    const fixedCashFlows = [{ date: '2026-03-01', inflow: 1000, outflow: 500 }];

    const tree = render(
      <>
        <SentimentGauge sentiment={fixedSentiment} />
        <DividendTracker dividends={fixedDividends} />
        <CashFlowChart cashFlows={fixedCashFlows} />
      </>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

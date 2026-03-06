import { render } from '@testing-library/react-native';
import CashFlowChart from './CashFlowChart';

describe('CashFlowChart Snapshot', () => {
  it('matches snapshot with valid cash flows', () => {
    const mockCashFlows = [{ date: '2026-03-01', inflow: 1000, outflow: 500 }];
    const tree = render(<CashFlowChart cashFlows={mockCashFlows} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot with empty state', () => {
    const tree = render(
      <CashFlowChart cashFlows={undefined as any} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

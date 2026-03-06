import { render } from '@testing-library/react-native';
import CashFlowChart from './CashFlowChart';

describe('CashFlowChart Component', () => {
  it('renders with cash flow type', () => {
    const cashFlows = [
      {
        date: '2026-03-01',
        inflow: 1000, // ✅ provide actual inflow
        outflow: 0,
      },
    ];

    const { getByText } = render(<CashFlowChart cashFlows={cashFlows} />);
    expect(getByText('Deposit – 1000 USD')).toBeTruthy();
  });
});

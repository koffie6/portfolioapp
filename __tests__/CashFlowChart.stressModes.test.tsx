import { render } from '@testing-library/react-native';
import CashFlowChart from '../src/components/CashFlowChart';

describe('CashFlowChart Stress Modes', () => {
  it('renders with valid cash flows', () => {
    const mockCashFlows = [{ date: '2026-03-01', inflow: 1000, outflow: 500 }];
    const { getByText } = render(<CashFlowChart cashFlows={mockCashFlows} />);
    expect(getByText('Cash Flow Chart')).toBeTruthy();
    expect(getByText('Deposit – 1000 USD')).toBeTruthy();
  });

  it('renders empty state when cashFlows are undefined', () => {
    const { getByText } = render(
      <CashFlowChart cashFlows={undefined as any} />,
    );
    expect(getByText('Cash Flow Chart')).toBeTruthy();
    expect(getByText('No data available')).toBeTruthy();
  });

  it('renders empty state when cashFlows are null', () => {
    const { getByText } = render(<CashFlowChart cashFlows={null as any} />);
    expect(getByText('Cash Flow Chart')).toBeTruthy();
    expect(getByText('No data available')).toBeTruthy();
  });
});

// __tests__/CashFlowChart.test.tsx
import CashFlowChart from '@src/components/CashFlowChart';
import { render } from '@testing-library/react-native';

describe('CashFlowChart Component', () => {
  const mockCashFlows = [
    { month: 'Jan', inflow: 1000, outflow: 500 },
    { month: 'Feb', inflow: 1200, outflow: 700 },
  ];

  it('renders chart heading', () => {
    const { getByText } = render(<CashFlowChart cashFlows={mockCashFlows} />);
    expect(getByText('Cash Flow Chart')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const tree = render(<CashFlowChart cashFlows={mockCashFlows} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

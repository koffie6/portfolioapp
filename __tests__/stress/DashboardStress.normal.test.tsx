import { render } from '@testing-library/react-native';
import PerformanceChart from '../../src/components/PerformanceChart';
import { generateHoldings } from '../utils/generateHoldings';

describe('Dashboard Stress - Normal Dataset', () => {
  it('renders with normal dataset', () => {
    const holdings = generateHoldings(20, 'normal');
    const tree = render(<PerformanceChart holdings={holdings} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

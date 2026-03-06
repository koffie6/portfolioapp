import { render } from '@testing-library/react-native';
import PerformanceChart from '../../src/components/PerformanceChart';
import { generateHoldings } from '../utils/generateHoldings';

describe('Dashboard Stress - Chaotic Dataset', () => {
  it('renders with chaotic dataset', () => {
    const holdings = generateHoldings(50, 'chaotic');
    const tree = render(<PerformanceChart holdings={holdings} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

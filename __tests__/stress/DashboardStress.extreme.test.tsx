import { render } from '@testing-library/react-native';
import SectorChart from '../../src/components/SectorChart';
import { generateHoldings } from '../utils/generateHoldings';

describe('Dashboard Stress - Extreme Dataset', () => {
  it('renders with extreme dataset', () => {
    const holdings = generateHoldings(10, 'extreme');
    const tree = render(<SectorChart holdings={holdings} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import { render } from '@testing-library/react-native';
import SectorChart from '../../src/components/SectorChart';
import { generateHoldings } from '../utils/generateHoldings';

describe('Dashboard Stress - Large Dataset', () => {
  it('renders with large dataset', () => {
    const holdings = generateHoldings(200, 'large');
    const tree = render(<SectorChart holdings={holdings} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import { render } from '@testing-library/react-native';
import PerformanceChart from '../../src/components/PerformanceChart';
import SectorChart from '../../src/components/SectorChart';
import { generateHoldings } from '../utils/generateHoldings';

describe('Dashboard Performance Profiling', () => {
  it('renders large dataset within 1500ms', () => {
    const holdings = generateHoldings(200, 'large');
    const start = performance.now();
    render(<PerformanceChart holdings={holdings} />);
    const end = performance.now();
    expect(end - start).toBeLessThan(1500);
  });

  it('renders chaotic dataset within 2000ms', () => {
    const holdings = generateHoldings(50, 'chaotic');
    const start = performance.now();
    render(<SectorChart holdings={holdings} />);
    const end = performance.now();
    expect(end - start).toBeLessThan(2000);
  });

  it('renders extreme dataset within 2500ms', () => {
    const holdings = generateHoldings(10, 'extreme');
    const start = performance.now();
    render(<PerformanceChart holdings={holdings} />);
    const end = performance.now();
    expect(end - start).toBeLessThan(2500);
  });
});

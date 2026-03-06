import { render } from '@testing-library/react-native';
import Dashboard from './Dashboard';

describe('Dashboard Component', () => {
  it('renders with empty state labels', () => {
    const { getByText, getAllByText } = render(<Dashboard />);
    expect(getByText('Dashboard')).toBeTruthy();
    expect(getByText('Sentiment Gauge')).toBeTruthy();
    expect(getByText('Dividend Tracker')).toBeTruthy();
    expect(getByText('Cash Flow Chart')).toBeTruthy();

    // Multiple "No data available" messages (one per subcomponent)
    const emptyStates = getAllByText('No data available');
    expect(emptyStates.length).toBeGreaterThanOrEqual(3);
  });
});

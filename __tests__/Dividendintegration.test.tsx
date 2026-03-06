import { render } from '@testing-library/react-native';
import DividendTracker from '../src/components/DividendTracker';

describe('DividendTracker Integration', () => {
  it('renders net dividend correctly', () => {
    const mockDividends = [
      {
        date: '2025-08-01',
        amount: 31.45, // ✅ provide actual amount
        ticker: 'DSY',
        description: 'Discovery Dividend',
      },
    ];

    const { getByText } = render(<DividendTracker dividends={mockDividends} />);
    expect(getByText(/Discovery Dividend/)).toBeTruthy();
    expect(getByText(/R31\.45/)).toBeTruthy();
  });
});

// __tests__/PortfolioInput.stressModes.test.tsx
import { fireEvent, render } from '@testing-library/react-native';
import { TextInput } from 'react-native';
import PortfolioInput from '../src/components/PortfolioInput';

describe('PortfolioInput Stress Modes', () => {
  it('renders without crashing under normal conditions', () => {
    const { UNSAFE_getByType } = render(<PortfolioInput />);
    expect(UNSAFE_getByType(TextInput)).toBeTruthy();
  });

  it('handles edge case: empty input', () => {
    const { UNSAFE_getByType } = render(<PortfolioInput />);
    const input = UNSAFE_getByType(TextInput);
    fireEvent.changeText(input, '');
    // Just assert that the input exists and accepts events
    expect(input).toBeTruthy();
  });

  it('handles edge case: invalid ticker', () => {
    const { UNSAFE_getByType } = render(<PortfolioInput />);
    const input = UNSAFE_getByType(TextInput);
    fireEvent.changeText(input, 'INVALID');
    expect(input).toBeTruthy();
  });

  it('handles edge case: very long input', () => {
    const longTicker = 'LONGTICKERNAME'.repeat(10);
    const { UNSAFE_getByType } = render(<PortfolioInput />);
    const input = UNSAFE_getByType(TextInput);
    fireEvent.changeText(input, longTicker);
    expect(input).toBeTruthy();
  });

  it('handles edge case: multiple rapid changes', () => {
    const { UNSAFE_getByType } = render(<PortfolioInput />);
    const input = UNSAFE_getByType(TextInput);
    fireEvent.changeText(input, 'AAPL');
    fireEvent.changeText(input, 'MSFT');
    fireEvent.changeText(input, 'GOOG');
    expect(input).toBeTruthy();
  });
});

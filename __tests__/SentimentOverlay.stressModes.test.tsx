// __tests__/SentimentOverlay.stressModes.test.tsx
import { render } from '@testing-library/react-native';
import SentimentOverlay from '../src/components/SentimentOverlay';

describe('SentimentOverlay Stress Modes', () => {
  it('renders without crashing under normal conditions', () => {
    const { getByText } = render(<SentimentOverlay sentiment={0.5} />);
    expect(getByText(/Sentiment Gauge/i)).toBeTruthy();
    expect(getByText(/50% Positive/i)).toBeTruthy();
  });

  it('renders with edge case: extreme positive sentiment', () => {
    const { getByText } = render(<SentimentOverlay sentiment={1.0} />);
    expect(getByText(/Sentiment Gauge/i)).toBeTruthy();
    expect(getByText(/100% Positive/i)).toBeTruthy();
  });

  it('renders with edge case: extreme negative sentiment', () => {
    const { getByText } = render(<SentimentOverlay sentiment={-1.0} />);
    expect(getByText(/Sentiment Gauge/i)).toBeTruthy();
    expect(getByText(/-1% Positive/i)).toBeTruthy();
  });

  it('renders with edge case: missing sentiment data', () => {
    const { getByText } = render(<SentimentOverlay sentiment={0} />);
    expect(getByText(/Sentiment Gauge/i)).toBeTruthy();
    expect(getByText(/0% Positive/i)).toBeTruthy();
  });
});

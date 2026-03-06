import { render } from '@testing-library/react-native';
import SentimentGauge from '../src/components/SentimentGauge';

describe('SentimentGauge Stress Modes', () => {
  it('renders with valid sentiment', () => {
    const { getByText } = render(<SentimentGauge sentiment={50} />);
    expect(getByText('Sentiment Gauge')).toBeTruthy();
    expect(getByText(/% Positive/)).toBeTruthy();
  });

  it('renders empty state when sentiment is undefined', () => {
    const { getByText } = render(
      <SentimentGauge sentiment={undefined as any} />,
    );
    expect(getByText('Sentiment Gauge')).toBeTruthy();
    expect(getByText('No data available')).toBeTruthy();
  });

  it('renders empty state when sentiment is null', () => {
    const { getByText } = render(<SentimentGauge sentiment={null as any} />);
    expect(getByText('Sentiment Gauge')).toBeTruthy();
    expect(getByText('No data available')).toBeTruthy();
  });
});

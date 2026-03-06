// __tests__/SentimentGauge.test.tsx
import SentimentGauge from '@src/components/SentimentGauge';
import { render } from '@testing-library/react-native';

describe('SentimentGauge Component', () => {
  const mockSentiment = 72; // ✅ just a number

  it('renders gauge heading', () => {
    const { getByText } = render(<SentimentGauge sentiment={mockSentiment} />);
    expect(getByText('Sentiment Gauge')).toBeTruthy();
  });

  it('renders sentiment percentage', () => {
    const { getByText } = render(<SentimentGauge sentiment={mockSentiment} />);
    expect(getByText(/72/)).toBeTruthy();
    expect(getByText(/% Positive/)).toBeTruthy();
  });

  it('matches snapshot', () => {
    const tree = render(<SentimentGauge sentiment={mockSentiment} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

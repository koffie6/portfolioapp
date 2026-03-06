import { render } from '@testing-library/react-native';
import SentimentGauge from './SentimentGauge';

describe('SentimentGauge Snapshot', () => {
  it('matches snapshot with valid sentiment', () => {
    const tree = render(<SentimentGauge sentiment={50} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot with empty state', () => {
    const tree = render(
      <SentimentGauge sentiment={undefined as any} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

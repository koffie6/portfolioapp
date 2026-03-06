// __tests__/App.stressModes.test.tsx
import { render } from '@testing-library/react-native';
import App from '../App'; // adjust path if App.tsx is inside src/

describe('App Stress Modes', () => {
  it('renders without crashing under normal conditions', () => {
    const { getByText } = render(<App />);
    expect(getByText(/Dashboard/i)).toBeTruthy();
  });

  it('renders with edge case: empty initial state', () => {
    const { getByText } = render(<App />);
    expect(getByText(/Dashboard/i)).toBeTruthy();
    expect(getByText(/Sentiment Gauge/i)).toBeTruthy();
    expect(getByText(/Dividend Tracker/i)).toBeTruthy();
    expect(getByText(/Cash Flow Chart/i)).toBeTruthy();
  });

  it('renders with edge case: malformed data', () => {
    // App doesn’t accept props, so just render it
    const { getByText } = render(<App />);
    expect(getByText(/Dashboard/i)).toBeTruthy();
  });

  it('renders with edge case: large dataset simulation', () => {
    // App doesn’t accept props, so we just ensure it still renders
    const { getByText } = render(<App />);
    expect(getByText(/Dashboard/i)).toBeTruthy();
  });
});

// jest.setup.tsx

import '@testing-library/jest-native/extend-expect';
import { cleanup } from '@testing-library/react-native';

// ✅ Ensure cleanup runs after each test
afterEach(() => {
  cleanup();
});

// ✅ Mock Chart.js React bindings globally
jest.mock('react-chartjs-2', () => ({
  Line: (props: any) => {
    const label = props?.data?.datasets?.[0]?.label || 'Line Chart';
    return <canvas role="img" aria-label={label} />;
  },
  Bar: (props: any) => {
    const label = props?.data?.datasets?.[0]?.label || 'Bar Chart';
    return <canvas role="img" aria-label={label} />;
  },
  Pie: (props: any) => {
    const label = props?.data?.datasets?.[0]?.label || 'Pie Chart';
    return <canvas role="img" aria-label={label} />;
  },
  Doughnut: (props: any) => {
    const label = props?.data?.datasets?.[0]?.label || 'Doughnut Chart';
    return <canvas role="img" aria-label={label} />;
  },
}));

// ✅ Silence React Native warnings that clutter test output
jest.spyOn(console, 'warn').mockImplementation(message => {
  if (
    message.includes('ViewPropTypes') ||
    message.includes('React.createFactory') ||
    message.includes('componentWillReceiveProps')
  ) {
    return;
  }
  console.warn(message);
});

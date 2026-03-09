// jest.setup.js

// Extend Jest with React Native Testing Library matchers
import '@testing-library/jest-native/extend-expect';

// Mock Reanimated for Jest
jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

// Silence Reanimated warning
global.ReanimatedDataMock = true;

// Ensure cleanup after each test
import { cleanup } from '@testing-library/react-native';
afterEach(cleanup);

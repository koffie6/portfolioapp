// jest.polyfill.js
// 👇 This runs before jest-expo’s preset
if (typeof global.mockNativeModules === "undefined") {
  global.mockNativeModules = {};
}
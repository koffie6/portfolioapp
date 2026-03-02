// jest.config.js
module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.tsx"],

  // ✅ Ensure Babel transforms React Native + chart libraries + polyfills
  transformIgnorePatterns: [
    "node_modules/(?!react-native|react-chartjs-2|chart.js|@react-native/js-polyfills|react-native-chart-kit)",
  ],

  // ✅ Stub CSS/SCSS imports so Jest doesn’t choke on them
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },

  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/build/",
  ],
};
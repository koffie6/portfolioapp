// babel.config.js
module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    // ✅ Optional: support for class properties, etc.
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-runtime",
  ],
};
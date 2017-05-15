module.exports = {
  extends: 'standard',
  plugins: [
    'standard',
    'promise'
  ],
  rules: {
    'camelcase': 0,
    'quotes': [1, 'single'],
    'semi': [1, 'always']
  },
  env: {
    mocha: true,
    browser: false,
    node: true
  }
};

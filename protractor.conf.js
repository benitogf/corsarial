exports.config = {
  seleniumPort: 4444,

  framework: 'mocha',

  specs: [
    'test/e2e/*.js'
  ],

  capabilities: {
    'browserName': 'chrome',
  },

  directConnect: true,

  mochaOpts: {
    reporter: 'spec',
    timeout: 4000
  }
};

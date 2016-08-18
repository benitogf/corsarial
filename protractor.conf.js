exports.config = {

  framework: 'mocha',

  specs: [
    'test/e2e/*.js'
  ],

  capabilities: {
    'browserName': 'firefox',
  },

  directConnect: true,

  mochaOpts: {
    reporter: 'spec',
    timeout: 4000
  }
};

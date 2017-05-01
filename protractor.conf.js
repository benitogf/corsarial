exports.config = {
  directConnect: true,
  framework: 'mocha',

  specs: [
    'test/e2e/*.js'
  ],

  capabilities: {
    browserName: 'chrome'
  },

  mochaOpts: {
    reporter: 'spec',
    timeout: 4000
  }
}

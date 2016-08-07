// A small suite to make sure the mocha frameowork works.
exports.config = {
  seleniumPort: 4444,

  framework: 'mocha',

  // Spec patterns are relative to this directory.
  specs: [
    'test/e2e/*.js'
  ],

  capabilities: {
    'browserName': 'chrome',
    //Can be used to specify the phantomjs binary path.
    //This can generally be ommitted if you installed phantomjs globally.
    //'phantomjs.binary.path': require('phantomjs-prebuilt').path,
    //'phantomjs.cli.args': ['--ignore-ssl-errors=true', '--web-security=false']
  },

  //baseUrl: env.baseUrl + '/ng1/',

  directConnect: true,

  mochaOpts: {
    reporter: 'spec',
    timeout: 4000
  }
};

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

describe('e2e tests', function() {
  this.timeout(0);
  var EC = protractor.ExpectedConditions;
  beforeEach(function() {
    browser.get('http://localhost:9000');
  });
  it('should wait for route loading', function(done){
      expect(element(by.id('loading')).isDisplayed()).to.eventually.eq(false).notify(done);
  })

  it.only('should wait to finish loading', function(done) {
      var el = element(by.id('loading'));
      expect(browser.wait(EC.not(EC.visibilityOf(el)))).to.eventually.eq(true).notify(done);
  });
});

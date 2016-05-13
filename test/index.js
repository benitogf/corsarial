var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    promise = require("bluebird");

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();


console.log('loading..');
driver.get('http://localhost/');
var loading = driver.findElement(By.id('loading'));
loading.isDisplayed()
  .then(function(){
    console.log('load');
    return true;
  })
  .then(function(){
    console.log('done');
    driver.quit();
    rc.quit();
  });

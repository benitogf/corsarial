// @flow
import { assert } from 'chai'

import HomePage from './pageobjects/HomePage'

import DriverBuilder from './lib/DriverBuilder'
import driverutils from './lib/driver-utils'

describe('e2e Tests', function () {
  let capabilities = ['firefox']
  let browsers

  beforeEach(async function () {
    browsers = []
    for (let capability of capabilities) {
      browsers.push(new DriverBuilder(capability))
    }
    for (let browser of browsers) {
      await driverutils.goToHome(browser.driver)
    }
  })

  it('Loads the home page', async function () {
    for (let browser of browsers) {
      const homePage = new HomePage(browser.driver)
      await homePage.isLoaded()
      const title = await homePage.getTitle()
      assert.strictEqual(title, 'HUBS', 'Title should match expected tagline')
    }
  })

  afterEach(async function () {
    for (let browser of browsers) {
      await browser.quit()
    }
  })
})

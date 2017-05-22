// @flow
import { By } from 'selenium-webdriver'
import BasePage from './BasePage'

const TITLE = By.css('nav-link .md-button.active')

export default class HomePage extends BasePage {

  async isLoaded () {
    await this.waitForDisplayed(TITLE)
  }

  async getTitle () {
    return this.getText(TITLE)
  }
}

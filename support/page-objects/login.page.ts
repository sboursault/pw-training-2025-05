import { expect, type Locator, type Page } from '@playwright/test'

export class LoginPage {
  readonly page: Page
  readonly loginField: Locator
  readonly passwordField: Locator
  readonly LoginButton: Locator

  constructor(page: Page) {
    this.page = page
    this.loginField = page
      .locator('#login_form')
      .getByLabel('Adresse électronique')
    this.passwordField = page.locator('#login_form').getByLabel('Mot de passe')
    this.LoginButton = page
      .locator('#login_form')
      .getByRole('button', { name: 'Connexion' })
  }

  async login(username: string, password: string) {
    await this.loginField.fill(username)
    await this.passwordField.fill(password)
    await this.LoginButton.click()
  }

}

import { expect, type Locator, type Page } from '@playwright/test'

export class CataloguePage {
  readonly page: Page
  readonly minibasketToggleButton: Locator
  readonly minibasketDetailPanel: Locator

  constructor(page: Page) {
    this.page = page
    this.minibasketToggleButton = page.locator('.basket-mini .dropdown-toggle')
    this.minibasketDetailPanel = page.locator('.basket-mini .dropdown-menu')
  }

  async showMiniBasket() {
    await this.minibasketToggleButton.click()
  }

  async addProductToBasket(productId: number) {
    await this.page.getByTestId('product-pod-add-button-' + productId).click()
  }

  async expectBasketToBeEmpty() {
    await expect(this.minibasketToggleButton).toHaveText('Panier')
    await expect(this.minibasketToggleButton).not.toContainText('(')
  }

  async expectProductCountInBasketToBe(count: number) {
    await expect(this.minibasketToggleButton).toContainText('(' + count + ')')
  }
}

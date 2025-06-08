import { test, expect } from '../support/fixtures'

test('The mini basket toggle shows the number of products in the basket"', async ({
  page,
  cataloguePage,
}) => {
  await page.goto('/')
  cataloguePage.addProductToBasket(209)
  await expect(cataloguePage.minibasketToggleButton).toContainText('(1)')
})

test('The mini basket toggle just shows no product number when the basket is empty"', async ({
  page,
  cataloguePage,
}) => {
  await page.goto('/')
  await expect(cataloguePage.minibasketToggleButton).toHaveText('Panier')
  await expect(cataloguePage.minibasketToggleButton).not.toContainText('(')
})

test('The mini basket detail basket shows entry details (with prodcut name, quantity and price)"', async ({
  page,
  cataloguePage,
}) => {
  await page.goto('/')
  await cataloguePage.addProductToBasket(209)
  await cataloguePage.showMiniBasket()
  await expect(cataloguePage.minibasketDetailPanel).toContainText(
    "The shellcoder's handbook"
  )
  await expect(cataloguePage.minibasketDetailPanel).toContainText('1')
  await expect(cataloguePage.minibasketDetailPanel).toContainText('9,99 €')
})

test("The mini basket detail basket entries shows 'Votre panier est vide' when empty\"", async ({
  page,
  cataloguePage,
}) => {
  await page.goto('/')
  await cataloguePage.showMiniBasket()
  await expect(cataloguePage.minibasketDetailPanel).toHaveText(
    'Votre panier est vide.'
  )
})

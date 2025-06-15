
import { test, expect } from '../support/fixtures'

test('For baskets strictly bellow 30€, we charge 7€ delivery fees', async ({
  page,
  cataloguePage,
}) => {
  await page.goto('/')
  await cataloguePage.addProductToBasket(208)
  await expect(page.locator('.alert')).toHaveText(
    /Hacking Exposed Wireless a été ajouté à votre panier/
  )

  await page.goto('/basket/')
  await expect(page.getByTestId('checkout.shipping_charge.amount')).toHaveText(
    '7,00 €'
  )
})

test('For baskets strictly over 30€, we offer delivery fees', async ({
  page,
  cataloguePage,
}) => {
  await page.goto('/')
  await cataloguePage.addProductToBasket(208)
  await expect(page.locator('.alert')).toHaveText(
    /Hacking Exposed Wireless a été ajouté à votre panier/
  )
  await cataloguePage.addProductToBasket(207)
  await expect(page.locator('.alert')).toHaveText(
    /Coders at Work a été ajouté à votre panier/
  )
  await page.goto('/basket/')
  await expect(page.getByTestId('checkout.shipping_charge.amount')).toHaveText(
    '0,00 €'
  )
})

test('If basket amount is exactly 30€, we offer delivery fees', async ({
  page,
  cataloguePage,
  productAdminApi,
}) => {
  
  const productId = await productAdminApi.createProduct('New product', 30)

  await page.goto('/')
  await cataloguePage.addProductToBasket(productId)
  await expect(page.locator('.alert')).toHaveText(
    /New product a été ajouté à votre panier/
  )

  await page.goto('/basket/')
  await expect(page.getByTestId('checkout.shipping_charge.amount')).toHaveText(
    '0,00 €'
  )
})

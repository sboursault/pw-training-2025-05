import { test, expect } from '../support/fixtures'


test.beforeEach(async ({ basketApi }) => {
  await basketApi.deleteBasket('tom@test.com', 'tom@test.com')
})

test('After login, the basket contains the items from my last session', async ({
  page,
  loginPage,
  cataloguePage,
  loginApi,
}) => {
  // await page.goto('/accounts/login/')
  // await loginPage.login('tom@test.com', 'tom@test.com')
  // await expect(page.getByText('Bienvenue')).toBeVisible()

  await loginApi.login('tom@test.com', 'tom@test.com')
  await page.goto('/')

  await cataloguePage.addProductToBasket(209)
  await expect(cataloguePage.minibasketToggleButton).toContainText('(1)')

  await page.goto('/accounts/logout')

  // await page.goto('/accounts/login/')
  // await loginPage.login('tom@test.com', 'tom@test.com')
  // await expect(page.getByText('Bienvenue')).toBeVisible()

  await loginApi.login('tom@test.com', 'tom@test.com')
  await page.goto('/')

  await expect(cataloguePage.minibasketToggleButton).toContainText('(1)')
})



test('After logout, the mini basket is empty', async ({
  page,
  loginPage,
  cataloguePage,
  loginApi,
}) => {
  await loginApi.login('tom@test.com', 'tom@test.com')
  await page.goto('/')
  await cataloguePage.addProductToBasket(209)
  await cataloguePage.expectProductCountInBasketToBe(1)

  await page.goto('/accounts/logout')

  await cataloguePage.expectBasketToBeEmpty()
})


test('After login, the basket contains the items I added as an anonymous user', async ({
  page,
  loginPage,
  cataloguePage,
  loginApi,
}) => {
  await page.goto('/')
  await cataloguePage.addProductToBasket(209)
  await cataloguePage.expectProductCountInBasketToBe(1)

  await loginApi.login('tom@test.com', 'tom@test.com')
  await page.goto('/')

  await cataloguePage.expectProductCountInBasketToBe(1)
})


test('After login, the basket contains both the items from my last session and those from my current basket', async ({
  page,
  loginPage,
  cataloguePage,
  loginApi,
}) => {
  await loginApi.login('tom@test.com', 'tom@test.com')
  await page.goto('/')

  await cataloguePage.addProductToBasket(209)
  await cataloguePage.expectProductCountInBasketToBe(1)

  await page.goto('/accounts/logout')

  await cataloguePage.addProductToBasket(208)
  await cataloguePage.expectProductCountInBasketToBe(1)

  await loginApi.login('tom@test.com', 'tom@test.com')
  await page.goto('/')

  await cataloguePage.expectProductCountInBasketToBe(2)
})
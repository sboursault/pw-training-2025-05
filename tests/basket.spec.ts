import { test, expect } from '../support/fixtures'

// After login, the basket contains the items from my last session
// After logout, the mini basket is empty
// After login, the basket contains the items I added as an anonymous user
// After login, the basket contains both the items from my last session and those from my current basket

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

  loginApi.login('tom@test.com', 'tom@test.com')
  page.goto('/')

  await cataloguePage.addProductToBasket(209)
  await expect(cataloguePage.minibasketToggleButton).toContainText('(1)')

  await page.goto('/accounts/logout')

  // await page.goto('/accounts/login/')
  // await loginPage.login('tom@test.com', 'tom@test.com')
  // await expect(page.getByText('Bienvenue')).toBeVisible()

  loginApi.login('tom@test.com', 'tom@test.com')
  page.goto('/')

  await expect(cataloguePage.minibasketToggleButton).toContainText('(1)')
})

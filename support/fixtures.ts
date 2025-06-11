import { test as base } from '@playwright/test'
import { CataloguePage } from './page-objects/catalogue.page'
import { LoginPage } from './page-objects/login.page'
import { BasketApi } from './api/basket.api'

type Fixtures = {
  cataloguePage: CataloguePage,
  loginPage: LoginPage,
  basketApi: BasketApi,
}

export const test = base.extend<Fixtures>({
  cataloguePage: async ({ page }, use) => await use(new CataloguePage(page)),
  loginPage: async ({ page }, use) => await use(new LoginPage(page)),
  basketApi: async ({ request }, use) => await use(new BasketApi(request)),
})

export { expect } from '@playwright/test'

import { test as base } from '@playwright/test'
import { CataloguePage } from './page-objects/catalogue.page'
import { LoginPage } from './page-objects/login.page'
import { BasketApi } from './api/basket.api'
import { LoginApi } from './api/login.api'
import { ProductAdminApi } from './api/product-admin.api'

type Fixtures = {
  cataloguePage: CataloguePage
  loginPage: LoginPage
  basketApi: BasketApi
  loginApi: LoginApi
  productAdminApi: ProductAdminApi
}

export const test = base.extend<Fixtures>({
  cataloguePage: async ({ page }, use) => await use(new CataloguePage(page)),
  loginPage: async ({ page }, use) => await use(new LoginPage(page)),
  basketApi: async ({ request }, use) => await use(new BasketApi(request)),
  loginApi: async ({ page }, use) => await use(new LoginApi(page)),
  productAdminApi: async ({ request }, use) =>
    await use(new ProductAdminApi(request)),
})

export { expect } from '@playwright/test'

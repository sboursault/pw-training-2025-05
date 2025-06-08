import { test as base } from '@playwright/test'
import { CataloguePage } from './page-objects/catalogue.page'
import { LoginPage } from './page-objects/login.page'

type Fixtures = {
  cataloguePage: CataloguePage,
  loginPage: LoginPage,
}

export const test = base.extend<Fixtures>({
  cataloguePage: async ({ page }, use) => await use(new CataloguePage(page)),
  loginPage: async ({ page }, use) => await use(new LoginPage(page)),
})

export { expect } from '@playwright/test'

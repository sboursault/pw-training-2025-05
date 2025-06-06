import { test as base } from '@playwright/test'
import { CataloguePage } from './page-objects/catalogue.page'

type Fixtures = {
  cataloguePage: CataloguePage
}

export const test = base.extend<Fixtures>({
  cataloguePage: async ({ page }, use) => await use(new CataloguePage(page)),
})

export { expect } from '@playwright/test'

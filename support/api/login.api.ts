import { expect, type APIRequestContext, type Page } from '@playwright/test'

export class LoginApi {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async login(username: string, password: string) {
    await this.page.request.post('/api/login/', {
      data: { username, password },
    })
  }
}

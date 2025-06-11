import { expect, type APIRequestContext, type Page } from '@playwright/test'

export class BasketApi {
  readonly request: APIRequestContext

  constructor(request: APIRequestContext) {
    this.request = request
  }

  async deleteBasket(username: string, password: string) {
    const response = await this.request.get('/api/basket/', {
      headers: {
        Authorization: 'Basic ' + btoa(username + ':' + password),
      },
    })
    const body = await response.json()
    await this.request.delete(body.url, {
      headers: {
        Authorization: 'Basic ' + btoa(username + ':' + password),
      },
    })
  }
}

import { expect, type APIRequestContext, type Page } from '@playwright/test'

export class ProductAdminApi {
  readonly request: APIRequestContext

  constructor(request: APIRequestContext) {
    this.request = request
  }

  async createProduct(name: string, price: number) : Promise<number> {
    const response = await this.request.post('/api/admin/products/', {
      failOnStatusCode: true,
      headers: {
        Authorization: 'Basic ' + btoa('superuser@example.com:testing'),
      },
      data: {
        title: name,
        slug: crypto.randomUUID(),
        product_class: 'book',
        stockrecords: [
          {
            partner: '/api/admin/partners/3/',
            partner_sku: crypto.randomUUID(),
            price_currency: 'EUR',
            price: price,
            num_in_stock: 100,
          },
        ],
      },
    })
    const json = await response.json()
    return json.id
  }
}

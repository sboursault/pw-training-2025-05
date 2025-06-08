/*
A shopper can login with valid credentials
A shopper can't login with invalid credentials
An error is shown on invalid password
*/

import { test, expect } from '../support/fixtures'

test('A shopper can login with valid credentials', async ({
  page,
  loginPage,
}) => {
  await page.goto('/accounts/login/')
  await loginPage.loginField.fill('tom@test.com')
  await loginPage.passwordField.fill('tom@test.com')
  await loginPage.LoginButton.click()
  await expect(page.getByText('Bienvenue')).toBeVisible()
})

test("A shopper can't login with invalid credentials", async ({
  page,
  loginPage,
}) => {
  await page.goto('/accounts/login/')
  await loginPage.loginField.fill('tom@test.com')
  await loginPage.passwordField.fill('tom@test.comzut')
  await loginPage.LoginButton.click()
  await expect(
    page.getByText('Saisissez un nom d’utilisateur et un mot de passe valides.')
  ).toBeVisible()
  await expect(loginPage.loginField).toBeVisible()
})

test('An error is shown on invalid password', async ({ page, loginPage }) => {
  await page.goto('/accounts/login/')
  await loginPage.loginField.fill('tom@test.com')
  await loginPage.passwordField.fill('tom@test.comzut')
  await loginPage.LoginButton.click()
  await expect(
    page.getByText('Saisissez un nom d’utilisateur et un mot de passe valides.')
  ).toBeVisible()
})

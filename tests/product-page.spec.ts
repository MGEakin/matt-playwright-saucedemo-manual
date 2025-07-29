import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { ProductPage } from '../pages/product-page';

test.describe('Product Page Testing', () => {
    let loginPage: LoginPage;
    let productPage: ProductPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.login_standard_user();
        productPage = new ProductPage(page);
        // await productPage.pass_thru();
    });

    test('@smoke should display Product page correctly', async() => {
        await productPage.waitForProductToLoad();
    });
});

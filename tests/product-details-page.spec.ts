import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { ProductPage } from '../pages/product-page';
import { ProductDetailsPage } from '../pages/product-details-page';

test.describe('Product Details Page Testing', () => {
    let loginPage: LoginPage;
    let productPage: ProductPage;
    let productDetailsPage: ProductDetailsPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.login_standard_user();
        productPage = new ProductPage(page);
        await productPage.pass_thru();
        productDetailsPage = new ProductDetailsPage(page);
        // await productDetailsPage.pass_thru();
    });

    test('@smoke should display Product Details page correctly', async() => {
        await productDetailsPage.waitForProductDetailsToLoad();
    });
});

import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { ProductPage } from '../pages/product-page';
import { ProductDetailsPage } from '../pages/product-details-page';
import { YourCartPage } from '../pages/your-cart-page';
import { CheckoutYourInformationPage } from '../pages/checkout-your-information';
import { CheckoutOverviewPage } from '../pages/checkout-overview';

test.describe('Checkout Overview Page Testing', () => {
    let loginPage: LoginPage;
    let productPage: ProductPage;
    let productDetailsPage: ProductDetailsPage;
    let yourCartPage: YourCartPage;
    let checkoutYourInformationPage: CheckoutYourInformationPage;
    let checkoutOverviewPage: CheckoutOverviewPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.login_standard_user();
        productPage = new ProductPage(page);
        await productPage.pass_thru();
        productDetailsPage = new ProductDetailsPage(page);
        await productDetailsPage.pass_thru();
        yourCartPage = new YourCartPage(page);
        await yourCartPage.pass_thru();
        checkoutYourInformationPage = new CheckoutYourInformationPage(page);
        await checkoutYourInformationPage.pass_thru();
        checkoutOverviewPage = new CheckoutOverviewPage(page);
    });

    test('@smoke should display Checkout Overview page correctly', async () => {
            await checkoutOverviewPage.waitForCheckoutOverview();
        });
    });

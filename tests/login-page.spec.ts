import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

test.describe('Login Page Testing', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('@smoke should display page title and description correctly', async ({ page }) => {
        await loginPage.waitForLoginToLoad();
    });
});

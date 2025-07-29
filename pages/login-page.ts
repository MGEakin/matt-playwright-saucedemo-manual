import { Page, Locator } from '@playwright/test';
import { BasePage } from "./shared";

/**
 * Page Object for the login page
 * Handles all interactions and element selectors for the login listing
 */
export class LoginPage extends BasePage {
    // login elements
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        super(page, '/login');

        // Initialize Login elements
        this.username = page.locator('[id="user-name"]');
        this.password = page.locator('[id="password"]');
        this.loginButton = page.locator('[id="login-button"]');
    }

    /**
     * Navigate to the login page and wait for it to load
     */
    async goto(): Promise<void> {
        await this.page.goto('https://www.saucedemo.com/v1/');
        // await this.waitForLoginToLoad();
    }

    /**
     * Wait for the login list to fully load
     */
    async waitForLoginToLoad(timeout: number = 15000): Promise<void> {
        await this.goto();

        // Wait for page to load
        await this.page.waitForLoadState('domcontentloaded');

        // Wait for main elements to be visible
        await this.username.waitFor({ state: 'visible', timeout });
        await this.password.waitFor({ state: 'visible', timeout });
        await this.loginButton.waitFor({ state: 'visible', timeout });
    }

    /**
     * Happy Path Login
     */
    async login_standard_user() : Promise<void> {
        await this.waitForLoginToLoad();
        await this.username.fill("standard_user");
        await this.password.fill("secret_sauce");
        await this.loginButton.click();
    }
}

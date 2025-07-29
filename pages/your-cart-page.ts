import { Page, Locator } from '@playwright/test';
import { BasePage } from "./shared";

/**
 * Page Object for the Product List page
 * Handles all interactions and element selectors for the Product listing
 */
export class YourCartPage extends BasePage {
    // Product elements
    readonly title: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        super(page, '/Product');

        // Initialize Product elements
        this.title = page.locator('text=Your Cart');
        this.checkoutButton = page.locator('text=Checkout');
    }

    /**
     * Wait for the Product list to fully load
     */
    async waitForYourCartToLoad(timeout: number = 15000): Promise<void> {
        // Wait for page to load
        await this.page.waitForLoadState('domcontentloaded');

        // Wait for main elements to be visible
        await this.title.waitFor({ state: 'visible', timeout });
        await this.checkoutButton.waitFor({ state: 'visible', timeout });
    }

    /**
     * Happy Path Your Cart
     * Clicks the checkout button to proceed to the next step
     */
    async pass_thru() : Promise<void> {
        await this.waitForYourCartToLoad();
        await this.checkoutButton.click();
    }
}

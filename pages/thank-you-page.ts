import { Page, Locator } from '@playwright/test';
import { BasePage } from "./shared";

/**
 * Page Object for the Product List page
 * Handles all interactions and element selectors for the Product listing
 */
export class ThankYouPage extends BasePage {
    // Product elements
    readonly title: Locator;

    constructor(page: Page) {
        super(page, '/Product');

        // Initialize Product elements
        this.title = page.locator('text=Thank You for Your Order');
    }

    /**
     * Wait for the checkout overview page to fully load
     */
    async waitForThankYou(timeout: number = 15000): Promise<void> {
        // Wait for page to load
        await this.page.waitForLoadState('domcontentloaded');

        // Wait for main elements to be visible
        await this.title.waitFor({ state: 'visible', timeout });
    }

    /**
     * Happy Path checkout overview
     * Fills in the form with valid data and clicks finish
     */
    async pass_thru() : Promise<void> {
        await this.waitForThankYou();
    }
}

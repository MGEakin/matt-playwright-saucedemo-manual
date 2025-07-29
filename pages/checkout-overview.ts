import { Page, Locator } from '@playwright/test';
import { BasePage } from "./shared";

/**
 * Page Object for the Product List page
 * Handles all interactions and element selectors for the Product listing
 */
export class CheckoutOverviewPage extends BasePage {
    // Product elements
    readonly title: Locator;
    readonly finishButton: Locator;

    constructor(page: Page) {
        super(page, '/Product');

        // Initialize Product elements
        this.title = page.locator('text=Checkout: Overview');
        this.finishButton = page.locator('text=Finish');
    }

    /**
     * Wait for the checkout overview page to fully load
     */
    async waitForCheckoutOverview(timeout: number = 15000): Promise<void> {
        // Wait for page to load
        await this.page.waitForLoadState('domcontentloaded');

        // Wait for main elements to be visible
        await this.title.waitFor({ state: 'visible', timeout });
        await this.finishButton.waitFor({ state: 'visible', timeout });
    }

    /**
     * Happy Path checkout overview
     * Fills in the form with valid data and clicks finish
     */
    async pass_thru() : Promise<void> {
        await this.waitForCheckoutOverview();
        await this.finishButton.click();
    }
}

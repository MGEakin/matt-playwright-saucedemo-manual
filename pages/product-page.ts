import { Page, Locator } from '@playwright/test';
import { BasePage } from "./shared";

/**
 * Page Object for the Product List page
 * Handles all interactions and element selectors for the Product listing
 */
export class ProductPage extends BasePage {
    // Product elements
    readonly title: Locator;
    readonly itemTitle: Locator;
    readonly ProductButton: Locator;

    constructor(page: Page) {
        super(page, '/Product');

        // Initialize Product elements
        this.title = page.locator('text=Products');
        this.itemTitle = page.locator('text=Sauce Labs Backpack');
    }

    /**
     * Navigate to the Product page and wait for it to load
     */
    // async goto(): Promise<void> {
    //     await this.page.goto('https://www.saucedemo.com/v1/');
    //     await this.waitForProductToLoad();
    // }

    /**
     * Wait for the Product list to fully load
     */
    async waitForProductToLoad(timeout: number = 15000): Promise<void> {
        // Wait for page to load
        await this.page.waitForLoadState('domcontentloaded');

        // Wait for main elements to be visible
        await this.title.waitFor({ state: 'visible', timeout });
    }

    /**
     * Happy Path Product
     */
    async pass_thru() : Promise<void> {
        await this.waitForProductToLoad();
        await this.itemTitle.click();
    }
}

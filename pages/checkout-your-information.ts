import { Page, Locator } from '@playwright/test';
import { BasePage } from "./shared";

/**
 * Page Object for the Product List page
 * Handles all interactions and element selectors for the Product listing
 */
export class CheckoutYourInformationPage extends BasePage {
    // Product elements
    readonly title: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly zip: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        super(page, '/Product');

        // Initialize Product elements
        this.title = page.locator('text=Checkout: Your Information');
        this.firstName = page.locator('id=first-name');
        this.lastName = page.locator('id=last-name');
        this.zip = page.locator('id=postal-code');
        this.continueButton = page.locator('text=Continue');
    }

    /**
     * Wait for the Product list to fully load
     */
    async waitForCheckoutYourInformation(timeout: number = 15000): Promise<void> {
        // Wait for page to load
        await this.page.waitForLoadState('domcontentloaded');

        // Wait for main elements to be visible
        await this.title.waitFor({ state: 'visible', timeout });
        await this.firstName.waitFor({ state: 'visible', timeout });
        await this.lastName.waitFor({ state: 'visible', timeout });
        await this.zip.waitFor({ state: 'visible', timeout });
        await this.continueButton.waitFor({ state: 'visible', timeout });
    }

    /**
     * Happy Path Checkout Your Information
     * Fills in the form with valid data and clicks continue
     */
    async pass_thru() : Promise<void> {
        await this.waitForCheckoutYourInformation();
        await this.firstName.fill("Matt");
        await this.lastName.fill("Eakin");
        await this.zip.fill("12345");
        await this.continueButton.click();
    }
}

import { Page, Locator } from '@playwright/test';
import { BasePage } from "./shared";

/**
 * Page Object for the Product List page
 * Handles all interactions and element selectors for the Product listing
 */
export class ProductDetailsPage extends BasePage {
    // Product elements
    readonly addToCartButton: Locator;
    readonly itemTitle: Locator;
    readonly itemDescription: Locator;
    readonly cartIcon: Locator;

    constructor(page: Page) {
        super(page, '/Product');

        // Initialize Product elements
        this.itemTitle = page.locator('text=Sauce Labs Backpack');
        this.itemDescription = page.locator('text=carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
        this.addToCartButton = page.locator('text=ADD TO CART');
        this.cartIcon = page.locator('xpath=//*[@id="shopping_cart_container"]');
    }

    /**
     * Wait for the Product list to fully load
     */
    async waitForProductDetailsToLoad(timeout: number = 15000): Promise<void> {
        // Wait for page to load
        await this.page.waitForLoadState('domcontentloaded');

        // Wait for main elements to be visible
        await this.addToCartButton.waitFor({ state: 'visible', timeout });
        await this.itemDescription.waitFor({ state: 'visible', timeout });
        await this.addToCartButton.waitFor({ state: 'visible', timeout });
    }

    /**
     * Happy Path Product Details
     * Clicks the add to cart button and then the cart icon to proceed to the cart
     */
    async pass_thru() : Promise<void> {
        await this.waitForProductDetailsToLoad();
        await this.addToCartButton.click();
        await this.cartIcon.click();
    }
}

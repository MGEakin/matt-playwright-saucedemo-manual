import { Page, Locator, expect } from '@playwright/test';

/**
 * Base Page Object containing common functionality for all pages
 */
export class BasePage {
  readonly page: Page;
  readonly url: string;
  
  // Common elements across all pages
  readonly header: Locator;
  readonly navigation: Locator;
  readonly pageTitle: Locator;
  readonly loadingSpinner: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page, url: string = '/') {
    this.page = page;
    this.url = url;
    
    // Initialize common elements
    this.header = page.locator('header');
    this.navigation = page.locator('nav');
    this.pageTitle = page.locator('h1');
    this.loadingSpinner = page.locator('[data-testid="loading"]');
    this.errorMessage = page.locator('[data-testid="error"]');
  }

  /**
   * Navigate to the page
   */
  async goto(): Promise<void> {
    const baseUrl = 'http://localhost:3000';
    const fullUrl = this.url.startsWith('http') ? this.url : baseUrl + this.url;
    await this.page.goto(fullUrl);
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageLoad(timeout: number = 15000): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    
    // Wait for loading spinner to disappear if present
    try {
      await this.loadingSpinner.waitFor({ state: 'hidden', timeout: 5000 });
    } catch {
      // Loading spinner might not be present, continue
    }
  }

  /**
   * Check if page has loaded successfully
   */
  async isPageLoaded(): Promise<boolean> {
    try {
      await this.pageTitle.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get page title text
   */
  async getPageTitle(): Promise<string> {
    return await this.pageTitle.textContent() || '';
  }

  /**
   * Check for error messages on the page
   */
  async hasError(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  /**
   * Get error message text if present
   */
  async getErrorMessage(): Promise<string> {
    if (await this.hasError()) {
      return await this.errorMessage.textContent() || '';
    }
    return '';
  }

  /**
   * Wait for an element to be visible with custom timeout
   */
  async waitForElement(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Verify page title matches expected text
   */
  async verifyPageTitle(expectedTitle: string): Promise<void> {
    await expect(this.pageTitle).toHaveText(expectedTitle);
  }

  /**
   * Verify page URL matches expected pattern
   */
  async verifyUrl(urlPattern: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(urlPattern);
  }
}

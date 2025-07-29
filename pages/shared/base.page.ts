import { Page, Locator } from '@playwright/test';

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
    const baseUrl = 'http://www.saucedemo.com/v1';
    const fullUrl = this.url.startsWith('http') ? this.url : baseUrl + this.url;
    await this.page.goto(fullUrl);
  }

  /**
   * Check for error messages on the page
   */
  async hasError(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }
}

import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Navigation Page Object for header navigation and menu interactions
 */
export class NavigationPage extends BasePage {
  // Navigation links
  readonly employeesLink: Locator;
  readonly studiosLink: Locator;
  readonly disciplinesLink: Locator;
  readonly locationsLink: Locator;
  readonly skillLevelsLink: Locator;
  readonly homeLink: Locator;

  // Mobile navigation
  readonly mobileMenuButton: Locator;
  readonly mobileMenu: Locator;

  constructor(page: Page) {
    super(page);
    
    // Main navigation links
    this.employeesLink = page.getByRole('link', { name: 'Employees' });
    this.studiosLink = page.getByRole('link', { name: 'Studios' });
    this.disciplinesLink = page.getByRole('link', { name: 'Disciplines' });
    this.locationsLink = page.getByRole('link', { name: 'Locations' });
    this.skillLevelsLink = page.getByRole('link', { name: 'Skill Levels' });
    this.homeLink = page.getByRole('link', { name: 'Home' });

    // Mobile navigation
    this.mobileMenuButton = page.locator('[data-testid="mobile-menu-button"]');
    this.mobileMenu = page.locator('[data-testid="mobile-menu"]');
  }

  /**
   * Navigate to Employee List page
   */
  async goToEmployees(): Promise<void> {
    await this.employeesLink.click();
    await this.page.waitForURL('**/');
  }

  /**
   * Navigate to Studios page
   */
  async goToStudios(): Promise<void> {
    await this.studiosLink.click();
    await this.page.waitForURL('**/studios');
  }

  /**
   * Navigate to Disciplines page
   */
  async goToDisciplines(): Promise<void> {
    await this.disciplinesLink.click();
    await this.page.waitForURL('**/disciplines');
  }

  /**
   * Navigate to Locations page
   */
  async goToLocations(): Promise<void> {
    await this.locationsLink.click();
    await this.page.waitForURL('**/locations');
  }

  /**
   * Navigate to Skill Levels page
   */
  async goToSkillLevels(): Promise<void> {
    await this.skillLevelsLink.click();
    await this.page.waitForURL('**/skill-levels');
  }

  /**
   * Navigate to Home page
   */
  async goToHome(): Promise<void> {
    await this.homeLink.click();
    await this.page.waitForURL('**/');
  }

  /**
   * Check if navigation link is visible
   */
  async isNavLinkVisible(linkName: string): Promise<boolean> {
    const link = this.page.getByRole('link', { name: linkName });
    return await link.isVisible();
  }

  /**
   * Open mobile menu (for mobile viewports)
   */
  async openMobileMenu(): Promise<void> {
    if (await this.mobileMenuButton.isVisible()) {
      await this.mobileMenuButton.click();
      await this.mobileMenu.waitFor({ state: 'visible' });
    }
  }

  /**
   * Close mobile menu (for mobile viewports)
   */
  async closeMobileMenu(): Promise<void> {
    if (await this.mobileMenu.isVisible()) {
      await this.mobileMenuButton.click();
      await this.mobileMenu.waitFor({ state: 'hidden' });
    }
  }
}

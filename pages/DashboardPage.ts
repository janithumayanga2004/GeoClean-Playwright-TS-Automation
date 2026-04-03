import { Page, Locator } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly headerTitle: Locator;
    readonly refreshButton: Locator;
    readonly totalCleanersStat: Locator;
    readonly activeSitesStat: Locator;

    constructor(page: Page) {
        this.page = page;
        
        this.headerTitle = page.locator('h1:has-text("Command Center")');
        
        
        this.refreshButton = page.locator('button:has-text("Refresh Intelligence")');
        
       
        this.totalCleanersStat = page.locator('div.card:has-h3:has-text("Total Cleaners") p');
        this.activeSitesStat = page.locator('div.card:has-h3:has-text("Active Sites") p');
    }

    async refreshDashboard() {
        await this.refreshButton.click();
       
        await this.page.waitForLoadState('networkidle');
    }
}
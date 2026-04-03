import { Page, Locator } from '@playwright/test';

export class SitesPage {
    readonly page: Page;
    readonly establishSiteButton: Locator;
    readonly siteNameInput: Locator;
    readonly deployNodeButton: Locator;
    readonly syncDataButton: Locator;
    readonly abortButton: Locator;
    readonly firstSiteCard: Locator;

    constructor(page: Page) {
        this.page = page;
      
        this.establishSiteButton = page.locator('button:has-text("Establish New Site")');
        
       
        this.siteNameInput = page.locator('input[placeholder="e.g. Headquarters Delta"]');
        this.deployNodeButton = page.locator('button:has-text("Deploy Node")');
        this.syncDataButton = page.locator('button:has-text("Synchronize Data")');
        this.abortButton = page.locator('button:has-text("Abort")');
        
        
        this.firstSiteCard = page.locator('.grid > div').first();
    }

    
async createSite(name: string) {
    
    await this.establishSiteButton.click();
    
    await this.siteNameInput.fill(name);
    
    await this.deployNodeButton.click();
}

    async deleteFirstSite() {
       
        await this.firstSiteCard.locator('button').nth(1).click(); 
        
        await this.page.click('button:has-text("Yes, delete it!")');
    }

    async openEditFirstSite() {
        
        await this.firstSiteCard.locator('button').first().click();
    }
}
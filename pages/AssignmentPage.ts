import { Page, Locator, expect } from '@playwright/test';

export class AssignmentPage {
    readonly page: Page;
    readonly newDeploymentBtn: Locator;
    readonly engageLinkBtn: Locator;
    readonly searchField: Locator;
    readonly modal: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newDeploymentBtn = page.getByRole('button', { name: 'New Deployment Node' });
        this.engageLinkBtn = page.getByRole('button', { name: 'Engage Link' });
        this.searchField = page.getByPlaceholder('Filter deployments by personnel or facility...');
        this.modal = page.locator('div.card.relative.z-10'); 
    }

    async createAssignmentFromExistingData() {
        await this.newDeploymentBtn.click();
        
        
        await expect(this.modal).toBeVisible();

        
        const cleanerSelect = this.modal.locator('select').first();
        await expect(cleanerSelect).toBeVisible();
        
        
        await this.page.waitForFunction(
            (el) => (el as HTMLSelectElement).options.length > 1,
            await cleanerSelect.elementHandle()
        );
        await cleanerSelect.selectOption({ index: 1 }); 

       
        const siteSelect = this.modal.locator('select').last();
        await this.page.waitForFunction(
            (el) => (el as HTMLSelectElement).options.length > 1,
            await siteSelect.elementHandle()
        );
        await siteSelect.selectOption({ index: 1 }); 

        
        await this.engageLinkBtn.click();

        
        await expect(this.page.locator('text=Deployment Engaged')).toBeVisible();
    }

    async toggleFirstAssignmentStatus() {
    
    const firstCard = this.page.locator('.card').first();
    const toggleBtn = firstCard.locator('button[title*="Node"]');
    
    await toggleBtn.click();

   
    await expect(this.page.locator('text=Protocol Activated successfully').or(this.page.locator('text=Protocol Deactivated successfully'))).toBeVisible();
}

async deleteFirstAssignment() {
    const firstCard = this.page.locator('.card').first();
    
    
    await firstCard.locator('button').last().click(); 

   
    await this.page.getByRole('button', { name: 'Confirm Termination' }).click();

    
    await expect(this.page.locator('text=The deployment node has been purged.')).toBeVisible();
}
}
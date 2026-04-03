import { Page, Locator, expect } from '@playwright/test';

export class CleanersPage {
    readonly page: Page;
    readonly registerButton: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly phoneInput: Locator;
    readonly passwordInput: Locator;
    readonly authorizeButton: Locator;
    readonly searchInput: Locator;
    readonly editProfileButton: Locator;
    readonly deletePersonnelButton: Locator;
    readonly saveChangesButton: Locator;

    constructor(page: Page) {
        this.page = page;
        
        this.registerButton = page.locator('button:has-text("Register New Personnel")');
        this.authorizeButton = page.locator('button:has-text("Authorize Onboarding")');
        
        
        this.nameInput = page.locator('input[placeholder="Jake S. Cleaner"]');
        this.emailInput = page.locator('input[placeholder="jake@geoclean.io"]');
        this.phoneInput = page.locator('input[placeholder="07XXXXXXXX"]');
        this.passwordInput = page.locator('input[placeholder="••••••••"]');
        
       
        this.searchInput = page.locator('input[placeholder*="Search by name"]');
        this.editProfileButton = page.locator('button:has-text("Edit Profile")');
        this.deletePersonnelButton = page.locator('button:has-text("Delete Personnel")');
        this.saveChangesButton = page.locator('button:has-text("Save Changes")');
    }

    async registerCleaner(name: string, email: string, phone: string, pass: string) {
        await this.registerButton.click();
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.phoneInput.fill(phone);
        await this.passwordInput.fill(pass);
        await this.authorizeButton.click();
    }

    async openMenuByCleanerName(name: string) {
   
    await this.searchInput.clear();
    
    await this.searchInput.pressSequentially(name, { delay: 150 });

    
    const row = this.page.locator('tr').filter({ hasText: name }).last();
    
   
    await expect(row).toBeVisible({ timeout: 15000 });
    
    await row.scrollIntoViewIfNeeded();
    
    
    const menuBtn = row.locator('button').filter({ has: this.page.locator('svg') }).first();
    await menuBtn.click();
    
    
    await this.editProfileButton.waitFor({ state: 'visible' });
}

    async updateNameInEditModal(newName: string) {
  const modal = this.page.locator('div.fixed.inset-0');

  const nameField = modal
    .locator('label:has-text("Full Name")')
    .locator('xpath=following-sibling::input');

  await expect(nameField).toBeVisible();

  await nameField.fill(newName);
}
}
import { Page, Locator } from '@playwright/test';

export class RegisterPage {
    readonly page: Page;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly phoneInput: Locator;
    readonly passwordInput: Locator;
    readonly secretKeyInput: Locator;
    readonly registerButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.locator('input[name="name"]');
        this.emailInput = page.locator('input[name="email"]');
        this.phoneInput = page.locator('input[name="phone"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.secretKeyInput = page.locator('input[name="adminSecret"]');
        this.registerButton = page.locator('button:has-text("Register Admin")');
        this.successMessage = page.locator('h2:has-text("Admin Created!")');
    }

    async registerAdmin(details: any) {
    
    await this.page.context().clearCookies();
    
    
    await this.page.goto('/register-admin', { waitUntil: 'load' }); 

   
    if (this.page.url().includes('/login')) {
        await this.page.click('text=Register facility');
    }

    
    await this.nameInput.waitFor({ state: 'visible', timeout: 7000 });
    
    await this.nameInput.fill(details.name);
    await this.emailInput.fill(details.email);
    await this.phoneInput.fill(details.phone);
    await this.passwordInput.fill(details.password);
    await this.secretKeyInput.fill(details.secretKey);
    
    await this.registerButton.waitFor({ state: 'visible' });
    await this.registerButton.click();
}
}
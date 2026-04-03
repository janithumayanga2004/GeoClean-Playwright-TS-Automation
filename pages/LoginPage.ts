// pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly adminRoleButton: Locator;

    constructor(page: Page) {
        this.page = page;
        
        this.emailInput = page.getByPlaceholder('name@company.com or 070...');
        this.passwordInput = page.getByPlaceholder('••••••••');
        this.loginButton = page.locator('button:has-text("Connect Device")');
        this.adminRoleButton = page.locator('button:has-text("Admin")');
    }

    async login(email: string, password: string) {
        await this.page.goto('/login'); 
        await this.adminRoleButton.click();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
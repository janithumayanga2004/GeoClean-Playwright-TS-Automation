import { Page, Locator, expect } from '@playwright/test';

export class ReportsPage {
    readonly page: Page;
    readonly datePicker: Locator;
    readonly refreshBtn: Locator;
    readonly selectedDateDisplay: Locator;

    constructor(page: Page) {
        this.page = page;
        this.datePicker = page.locator('#report-date-picker');
        this.refreshBtn = page.getByRole('button', { name: 'Refresh' });
        
        this.selectedDateDisplay = page.locator('p:has-text("Selected Date") + p');
    }

    async selectDate(date: string) {
        await this.datePicker.fill(date);
        
        const responsePromise = this.page.waitForResponse(
            response => response.url().includes('/api/attendance/report') && response.status() === 200
        );
        await this.page.keyboard.press('Enter'); 
        await responsePromise;
    }

    async trackFirstOnSiteCleaner() {
        const trackBtn = this.page.getByRole('button', { name: 'Track' }).first();
        await trackBtn.click();
        await expect(this.page.locator('text=Live Tracking')).toBeVisible();
    }
}
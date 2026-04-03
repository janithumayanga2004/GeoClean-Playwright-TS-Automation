import { test, expect } from '../fixtures/base-test';
import { ReportsPage } from '../pages/ReportsPage';
import * as data from '../test-data/user-data.json';
import { DataGenerator } from '../utils/data-generator';

test.describe('Intelligence Logs (Reports) Tests', () => {

    test.beforeEach(async ({ page, registerPage, loginPage }) => {
        const dynamicEmail = DataGenerator.generateRandomEmail();
        const dynamicData = { ...data.adminRegistration, email: dynamicEmail };
        
        
        await registerPage.registerAdmin(dynamicData);
        await page.waitForURL('**/login');
        await loginPage.login(dynamicEmail, data.adminRegistration.password);
        await page.waitForURL('**/admin/dashboard');
        
       
        await page.goto('/admin/reports');
    });

    // test('Should display summary cards and toggle sections', async ({ page }) => {
    //     await expect(page.locator('text=Total')).toBeVisible();
    //     await expect(page.locator('text=not arrived')).toBeVisible();

    //     const notCheckedInSection = page.getByText('Not Checked In');
    //     await notCheckedInSection.click(); 
    //     await expect(page.locator('text=Personnel')).not.toBeVisible();
        
    //     await notCheckedInSection.click(); 
    //     await expect(page.locator('text=Personnel').first()).toBeVisible();
    // });

    test('Should verify date filtering works', async ({ page }) => {
        const reportsPage = new ReportsPage(page);
        
        // ඊයේ දිනය ලබා ගැනීම
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const dateStr = yesterday.toISOString().split('T')[0];

        // UI එකේ පෙන්වන Format එකට දිනය සකසා ගැනීම (e.g., Thursday, April 2, 2026)
        const formattedDate = yesterday.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
        });

        await reportsPage.selectDate(dateStr);
        
        // විසඳුම: Strict mode violation එක මග හැරීමට නිශ්චිත locator එක භාවිතා කිරීම
        await expect(reportsPage.selectedDateDisplay).toContainText(formattedDate);
    });

    test('Should fetch live location for on-site staff', async ({ page }) => {
        const reportsPage = new ReportsPage(page);
        const trackBtn = page.getByRole('button', { name: 'Track' });

        if (await trackBtn.count() > 0) {
            await reportsPage.trackFirstOnSiteCleaner();
            await page.getByRole('button', { name: 'Close' }).click();
        } else {
            console.log('No on-site personnel found to track.');
        }
    });
});
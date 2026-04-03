import { test, expect } from '../fixtures/base-test';
import { DataGenerator } from '../utils/data-generator';
import * as data from '../test-data/user-data.json';

test.describe('Cleaners Management - GeoClean Admin', () => {
    
    test.beforeEach(async ({ page, registerPage, loginPage }) => {
        const dynamicEmail = DataGenerator.generateRandomEmail();
        const dynamicData = { ...data.adminRegistration, email: dynamicEmail };
        
        await registerPage.registerAdmin(dynamicData);
        await page.waitForURL('**/login');
        await loginPage.login(dynamicEmail, data.adminRegistration.password);
        await page.waitForURL('**/admin/dashboard');
        
        await page.goto('/admin/cleaners');
    });

    test('Direct Flow: Add, Update and Delete a cleaner', async ({ cleanersPage, page }) => {
        const timestamp = Date.now();
        const initialName = "harsha" + timestamp;
        const updatedName = "sachintha" + timestamp;
        const email = `test${timestamp}@geoclean.io`;
        
        
        await cleanersPage.registerCleaner(initialName, email, "0712345678", "Admin@123");
        await page.locator('button:has-text("OK")').click(); 

       
        await cleanersPage.openMenuByCleanerName(initialName);
        await cleanersPage.editProfileButton.click();
        
        await cleanersPage.updateNameInEditModal(updatedName);
        await cleanersPage.saveChangesButton.click();
        
        
        await expect(page.getByText('Personnel files have been modified.')).toBeVisible();
        await page.locator('button:has-text("OK")').click();

       
        await page.reload();
        await page.waitForURL('**/admin/cleaners');
       
        await cleanersPage.openMenuByCleanerName(updatedName);
        await cleanersPage.deletePersonnelButton.click();
        
        await page.locator('button:has-text("Yes, delete personnel")').click();
        await page.locator('button:has-text("OK")').click();

        
        await expect(page.locator('tr').filter({ hasText: updatedName })).not.toBeVisible();
    });
});
import { test, expect } from '../fixtures/base-test';
import { DataGenerator } from '../utils/data-generator'; 
import * as data from '../test-data/user-data.json';

test.beforeEach(async ({ page, registerPage, loginPage }) => {
   
    const dynamicEmail = DataGenerator.generateRandomEmail();
    const dynamicData = { ...data.adminRegistration, email: dynamicEmail };
    
    await registerPage.registerAdmin(dynamicData);
    await page.waitForURL('**/login');

    
    await loginPage.login(dynamicEmail, data.adminRegistration.password);
    
    
    await page.waitForURL('**/admin/dashboard');
    await page.goto('/admin/sites');
});

      
test('Should create a new facility site', async ({ sitesPage }) => {
    const siteName = `Station-${Math.floor(Math.random() * 1000)}`;
    
   
    await sitesPage.createSite(siteName);

    
    await expect(sitesPage.page.locator('text=Site Created')).toBeVisible();
    
   
    await expect(sitesPage.page.locator(`h3:has-text("${siteName}")`)).toBeVisible();
});



    test('Should update an existing site name', async ({ sitesPage }) => {
        await sitesPage.openEditFirstSite();
        const updatedName = "Updated Site Alpha";
        
        await sitesPage.siteNameInput.clear();
        await sitesPage.siteNameInput.fill(updatedName);
        await sitesPage.syncDataButton.click();

        await expect(sitesPage.page.locator('text=Site Updated')).toBeVisible();
        await expect(sitesPage.page.locator(`h3:has-text("${updatedName}")`)).toBeVisible();
    });

    test('Should delete a site successfully', async ({ sitesPage }) => {
        const initialCount = await sitesPage.page.locator('.grid > div').count();
        if (initialCount > 0) {
            await sitesPage.deleteFirstSite();
            await expect(sitesPage.page.locator('text=Deleted!')).toBeVisible();
        } else {
            console.log("No sites available to delete.");
        }
    });

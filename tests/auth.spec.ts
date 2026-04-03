// tests/auth.spec.ts
import { test, expect } from '../fixtures/base-test'; // Fixture 
import { DataGenerator } from '../utils/data-generator';
import * as data from '../test-data/user-data.json';

test('Full flow: Register and then Login', async ({ page, registerPage, loginPage, dashboardPage }) => {
    
    
    const dynamicEmail = DataGenerator.generateRandomEmail();
    const dynamicData = { ...data.adminRegistration, email: dynamicEmail };

    
    await registerPage.registerAdmin(dynamicData);
    await expect(registerPage.successMessage).toBeVisible();
    
   
    await page.waitForURL('**/login');

   
    await loginPage.login(dynamicEmail, data.adminRegistration.password);

    
    await page.waitForURL('**/admin/dashboard');
    await expect(dashboardPage.headerTitle).toBeVisible();
});
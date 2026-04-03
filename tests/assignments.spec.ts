import { test, expect } from '../fixtures/base-test';
import { DataGenerator } from '../utils/data-generator';
import { AssignmentPage } from '../pages/AssignmentPage';
import * as data from '../test-data/user-data.json';

test.describe('Assignments Management', () => {

    test.beforeEach(async ({ page, registerPage, loginPage }) => {
        
        const dynamicEmail = DataGenerator.generateRandomEmail();
        const dynamicData = { ...data.adminRegistration, email: dynamicEmail };
        await registerPage.registerAdmin(dynamicData);
        await page.waitForURL('**/login');
        await loginPage.login(dynamicEmail, data.adminRegistration.password);
        await page.waitForURL('**/admin/dashboard');
        
        
        await page.goto('/admin/assignments');
    });

    test('Should create assignment using existing dropdown data', async ({ page }) => {
        const assignmentPage = new AssignmentPage(page);

       
        await assignmentPage.createAssignmentFromExistingData();

        
        const cardCount = await page.locator('.card').count();
        expect(cardCount).toBeGreaterThan(0);
    });

    test('Should toggle status and delete an assignment', async ({ page }) => {
    const assignmentPage = new AssignmentPage(page);

   
    await assignmentPage.toggleFirstAssignmentStatus();

   
    await assignmentPage.deleteFirstAssignment();

   
});
});
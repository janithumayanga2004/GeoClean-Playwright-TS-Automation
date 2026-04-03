import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { RegisterPage } from '../pages/RegisterPage';
import { SitesPage } from '../pages/SitesPage';
import { CleanersPage } from '../pages/CleanersPage';
import { AssignmentPage } from '../pages/AssignmentPage'; 


type MyFixtures = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    registerPage: RegisterPage;
    sitesPage: SitesPage;
    cleanersPage: CleanersPage; 
    assignmentPage: AssignmentPage;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },
    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },
    sitesPage: async ({ page }, use) => {
        await use(new SitesPage(page));
    },
   
    cleanersPage: async ({ page }, use) => {
        await use(new CleanersPage(page));
    },
    assignmentPage: async ({ page }, use) => {
        await use(new AssignmentPage(page));
    }
});

export { expect } from '@playwright/test';
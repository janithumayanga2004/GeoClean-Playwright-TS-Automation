import { test } from '@playwright/test';
import { DataGenerator } from '../utils/data-generator';

test('Registration with dynamic email', async ({ page }) => {
    const randomEmail = DataGenerator.generateRandomEmail();
    
});
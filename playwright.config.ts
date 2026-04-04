import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  // process.env.CI වෙනුවට කෙලින්ම අගයන් ලබා දෙන්න
  retries: 1, 
  workers: 1, 
  reporter: [['html'], ['list']],
  use: {
    baseURL: 'http://localhost:5173', 
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    // මෙතනත් process.env.CI වෙනුවට false හෝ true භාවිතා කරන්න
    reuseExistingServer: true, 
    timeout: 120 * 1000,
  },
});
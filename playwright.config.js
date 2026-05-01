// @ts-check
import { defineConfig, devices } from '@playwright/test';

import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: 1,
  timeout: 30_000,//test
  expect: {
    timeout: 10_000,//assert
  },

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/junit-results.xml' }],
  ],

  use: {
    baseURL: 'https://demoqa.com',
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },

  projects: [
 
    {
      name: 'chromium',
      testMatch: '**/tests/ui/**/*.spec.js',
      use: { ...devices['Desktop Chrome'] },
    },

   
    {
      name: 'api',
      testMatch: '**/tests/api/**/*.spec.js',
      use: {

      },
    },
  ],
});
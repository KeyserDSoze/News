import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: '../../tests',
  timeout: 30000,
  use: { baseURL: 'http://127.0.0.1:4173/News/', trace: 'on-first-retry' },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } }
  ],
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4173',
    url: 'http://127.0.0.1:4173/News/',
    reuseExistingServer: !process.env.CI,
    timeout: 60000
  }
});

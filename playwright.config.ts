import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: !process.env.PWDEBUG,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : 1,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    // Headed locally so UI mode and --headed show a real browser navigating to baseURL.
    headless: isCI,
    trace: isCI ? "on-first-retry" : "on",
    video: isCI ? "off" : "on",
    launchOptions: {
      slowMo: process.env.PLAYWRIGHT_SLOW_MO
        ? Number(process.env.PLAYWRIGHT_SLOW_MO)
        : 0,
    },
  },
  // Each entry = one browser; tests run once per project.
  // Run all:  npm run test:e2e
  // Run one:  npx playwright test --project=chromium
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
  webServer: [
    {
      command: "npm run json-server",
      url: "http://localhost:3001/posts",
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
    {
      command: "npm run dev",
      url: baseURL,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
  ],
});

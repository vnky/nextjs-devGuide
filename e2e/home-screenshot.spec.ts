import { expect, test } from "@playwright/test";

test("home page loads, waits 2s, and captures screenshot", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await expect(page).toHaveURL("/");

  await expect(
    page.getByRole("heading", {
      name: "Build something great with Next.js",
    }),
  ).toBeVisible();

  await page.waitForTimeout(6000);

  await page.screenshot({
    path: testInfo.outputPath("home-page.png"),
    fullPage: true,
  });
});

import { expect, test } from "@playwright/test";

test.describe("Home & navigation", () => {
  test("home page shows welcome heading", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL("/");

    await expect(
      page.getByRole("heading", {
        name: "Build something great with Next.js",
      }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "About this app" })).toBeVisible();
  });

  test("header navigates to About", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "About" }).click();

    await expect(page).toHaveURL("/about");
    await expect(
      page.getByRole("heading", { name: "A small Next.js starter" }),
    ).toBeVisible();
  });

  test("dynamic topic page loads", async ({ page }) => {
    await page.goto("/topics/getting-started");

    await expect(page.getByRole("heading", { name: "Getting started" })).toBeVisible();
    await expect(page.getByRole("link", { name: "View services" })).toBeVisible();
  });
});

test.describe("Posts (Server Action + json-server)", () => {
  test("lists seed post and creates a new post", async ({ page }) => {
    await page.goto("/posts");

    await expect(page.getByRole("heading", { name: "Create a post" })).toBeVisible();
    await expect(page.getByText("Welcome")).toBeVisible();

    const title = `E2E post ${Date.now()}`;
    await page.getByLabel("Title").fill(title);
    await page.getByLabel("Content").fill("Created by Playwright");
    await page.getByRole("button", { name: "Create" }).click();

    await expect(page.getByText(title)).toBeVisible();
  });
});

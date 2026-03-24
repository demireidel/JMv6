import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("loads and displays hero panel", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("JAVIER MILEI");
  });

  test("floating nav is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("navigation", { name: "Navegación principal" })).toBeVisible();
  });

  test("scroll snap panels exist", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("region", { name: "Panel principal" })).toBeVisible();
    await expect(page.getByRole("region", { name: "Logros" })).not.toBeInViewport();
  });
});

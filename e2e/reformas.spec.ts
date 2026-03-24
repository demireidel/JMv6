import { test, expect } from "@playwright/test";

test.describe("Reformas", () => {
  test("index page lists reforms", async ({ page }) => {
    await page.goto("/reformas");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Reformas");
    await expect(page.getByText("Desregulación Económica")).toBeVisible();
  });

  test("individual reform page renders", async ({ page }) => {
    await page.goto("/reformas/desregulacion-economica");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Desregulación");
    await expect(page.getByText("¿De qué se trata?")).toBeVisible();
  });
});

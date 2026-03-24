import { test, expect } from "@playwright/test";

test.describe("Archivo", () => {
  test("shows discursos tab by default", async ({ page }) => {
    await page.goto("/archivo");
    await expect(page.getByRole("tab", { name: "Discursos", selected: true })).toBeVisible();
  });

  test("switching to Libros tab shows book covers", async ({ page }) => {
    await page.goto("/archivo");
    await page.getByRole("tab", { name: "Libros" }).click();
    const images = page.locator('img[alt*="Tapa de"]');
    await expect(images.first()).toBeVisible();
    const count = await images.count();
    expect(count).toBe(12);
  });

  test("mobile nav opens and closes", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const btn = page.getByRole("button", { name: "Abrir menú" });
    await btn.click();
    await expect(page.getByRole("dialog", { name: "Menú de navegación" })).toBeVisible();
    const dialog = page.getByRole("dialog", { name: "Menú de navegación" });
    await dialog.getByRole("link", { name: "Logros" }).click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });
});

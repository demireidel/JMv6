import { describe, it, expect } from "vitest";
import { getLibros } from "../libros";

describe("getLibros", () => {
  it("returns 12 books", () => {
    const libros = getLibros();
    expect(libros).toHaveLength(12);
  });
  it("each book has title, year, coverUrl", () => {
    const libros = getLibros();
    libros.forEach((libro) => {
      expect(libro.title).toBeTruthy();
      expect(libro.year).toBeGreaterThan(2000);
      expect(libro.coverUrl).toMatch(/^https:\/\/m\.media-amazon\.com/);
    });
  });
  it("books are sorted newest first", () => {
    const libros = getLibros();
    expect(libros[0].year).toBeGreaterThanOrEqual(libros[1].year);
  });
});

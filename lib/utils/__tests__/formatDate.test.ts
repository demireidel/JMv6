import { describe, it, expect } from "vitest";
import { formatDate } from "../formatDate";

describe("formatDate", () => {
  it("formats ISO date to Spanish locale", () => {
    const result = formatDate("2024-01-15");
    expect(result).toContain("enero");
    expect(result).toContain("2024");
  });
});

"use cache";
import { cacheLife } from "next/cache";
import type { LogrosData } from "@/lib/types";

export async function getLogros(): Promise<LogrosData> {
  cacheLife("hours");
  const data = await import("@/content/logros.json");
  return data.default as LogrosData;
}

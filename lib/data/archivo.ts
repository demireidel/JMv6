"use cache";
import { cacheLife } from "next/cache";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { promises as fs } from "fs";
import path from "path";
import type { DiscursoFrontmatter, EntrevistaFrontmatter } from "@/lib/types";

async function loadMDXFrontmatter<T>(dir: string): Promise<T[]> {
  const files = await fs.readdir(dir);
  const results = await Promise.all(
    files
      .filter((f) => f.endsWith(".mdx"))
      .map(async (file) => {
        const source = await fs.readFile(path.join(dir, file), "utf-8");
        const { frontmatter } = await compileMDX<T>({
          source,
          options: { parseFrontmatter: true, mdxOptions: { remarkPlugins: [remarkGfm] } },
        });
        return frontmatter;
      })
  );
  return results.sort((a: any, b: any) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getDiscursos(): Promise<DiscursoFrontmatter[]> {
  cacheLife("days");
  return loadMDXFrontmatter<DiscursoFrontmatter>(
    path.join(process.cwd(), "content/discursos")
  );
}

export async function getEntrevistas(): Promise<EntrevistaFrontmatter[]> {
  cacheLife("days");
  return loadMDXFrontmatter<EntrevistaFrontmatter>(
    path.join(process.cwd(), "content/entrevistas")
  );
}

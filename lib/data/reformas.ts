"use cache";
import { cacheLife } from "next/cache";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { promises as fs } from "fs";
import path from "path";
import type { ReformaFrontmatter } from "@/lib/types";

const REFORMAS_DIR = path.join(process.cwd(), "content/reformas");

export async function getReformasSlugs(): Promise<string[]> {
  cacheLife("max");
  const files = await fs.readdir(REFORMAS_DIR);
  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export async function getAllReformas(): Promise<ReformaFrontmatter[]> {
  cacheLife("max");
  const slugs = await getReformasSlugs();
  const reformas = await Promise.all(
    slugs.map(async (slug) => {
      const source = await fs.readFile(
        path.join(REFORMAS_DIR, `${slug}.mdx`),
        "utf-8"
      );
      const { frontmatter } = await compileMDX<ReformaFrontmatter>({
        source,
        options: { parseFrontmatter: true, mdxOptions: { remarkPlugins: [remarkGfm] } },
      });
      return { ...frontmatter, slug };
    })
  );
  return reformas;
}

export async function getReforma(slug: string): Promise<{
  frontmatter: ReformaFrontmatter;
  content: React.ReactElement;
}> {
  cacheLife("max");
  const source = await fs.readFile(
    path.join(REFORMAS_DIR, `${slug}.mdx`),
    "utf-8"
  );
  const { frontmatter, content } = await compileMDX<ReformaFrontmatter>({
    source,
    options: { parseFrontmatter: true, mdxOptions: { remarkPlugins: [remarkGfm] } },
  });
  return { frontmatter, content };
}

import { Marked } from "marked";
import { githubUrl } from "../site";

const rawBase = "https://raw.githubusercontent.com/LHagfoss/rustcode/main/docs";
const blobBase = `${githubUrl}/blob/main/docs`;

export type DocPage = {
  slug: string;
  title: string;
  description: string;
};

export const docPages: DocPage[] = [
  {
    slug: "install",
    title: "Install RustCode",
    description:
      "Install the RustCode desktop app and rc CLI on macOS, Linux and Windows, build from source and keep it updated.",
  },
  {
    slug: "harnesses",
    title: "Harnesses: Claude Code, Codex, Gemini CLI, OpenCode and Pi",
    description:
      "How RustCode runs each thread on Claude Code, Codex, Gemini CLI, OpenCode, Pi or its built-in agent, and what each one supports.",
  },
  {
    slug: "cli",
    title: "The rc command line",
    description:
      "Every rc command in RustCode: threads, config, harnesses, machines, remote access, the background server and usage queries.",
  },
  {
    slug: "configuration",
    title: "Configuration",
    description:
      "Where RustCode keeps config.toml, and every setting for models, providers, harnesses and the desktop app.",
  },
  {
    slug: "permissions",
    title: "Permissions and access levels",
    description:
      "How RustCode decides what an agent may do: access levels, approvals, and what Full access covers.",
  },
  {
    slug: "workflows",
    title: "Workflows",
    description:
      "Fan work out to parallel agent threads with a RustCode workflow script that keeps its plan on disk.",
  },
  {
    slug: "mcp-outside-agents",
    title: "Use RustCode from other agents over MCP",
    description:
      "Connect Claude Desktop, Cursor, Codex, ChatGPT or a script to RustCode's orchestration tools over MCP.",
  },
  {
    slug: "themes",
    title: "Themes",
    description:
      "Theme the RustCode desktop app and terminal UI with one TOML file, by hand, with rc theme or by asking an agent.",
  },
];

export function findDoc(slug: string) {
  return docPages.find((page) => page.slug === slug);
}

const published = new Set(docPages.map((page) => page.slug));

function rewriteHref(href: string) {
  if (/^([a-z]+:|#|\/)/i.test(href)) {
    return href;
  }
  const [path, hash] = href.split("#");
  const slug = path.replace(/^\.\//, "").replace(/\.md$/, "");
  if (path.endsWith(".md") && published.has(slug)) {
    return `/docs/${slug}${hash ? `#${hash}` : ""}`;
  }
  return new URL(href, `${blobBase}/`).toString();
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function createRenderer() {
  const seen = new Map<string, number>();
  return new Marked({
    gfm: true,
    renderer: {
      heading({ tokens, depth, text }) {
        const base = slugify(text);
        const count = seen.get(base) ?? 0;
        seen.set(base, count + 1);
        const id = count === 0 ? base : `${base}-${count}`;
        return `<h${depth} id="${id}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
      },
      link({ href, title, tokens }) {
        const target = rewriteHref(href);
        const external = /^https?:/.test(target);
        const titleAttr = title ? ` title="${title}"` : "";
        const rel = external
          ? ' target="_blank" rel="noopener noreferrer"'
          : "";
        return `<a href="${target}"${titleAttr}${rel}>${this.parser.parseInline(tokens)}</a>`;
      },
      image({ href, text }) {
        const src = /^[a-z]+:/i.test(href)
          ? href
          : new URL(href, `${rawBase}/`).toString();
        return `<img src="${src}" alt="${text}" loading="lazy" />`;
      },
    },
  });
}

export async function getDocHtml(slug: string) {
  const response = await fetch(`${rawBase}/${slug}.md`, {
    headers: { "User-Agent": "rustcode-website" },
    next: { revalidate: 3600 },
  });
  if (!response.ok) {
    throw new Error(`Docs request failed: ${response.status}`);
  }
  const markdown = (await response.text()).replace(/^# .*\n/, "");
  return createRenderer().parse(markdown) as string;
}

export function docSourceUrl(slug: string) {
  return `${blobBase}/${slug}.md`;
}

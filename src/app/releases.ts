import { githubUrl } from "./site";

const releasesUrl = "https://api.github.com/repos/LHagfoss/rustcode/releases";
const maxReleases = 8;
const maxNotesPerRelease = 5;

type GithubRelease = {
  tag_name?: unknown;
  name?: unknown;
  html_url?: unknown;
  published_at?: unknown;
  body?: unknown;
};

export type Release = {
  tag: string;
  name: string;
  url: string;
  publishedAt: string | null;
  notes: string[];
};

function cleanInline(text: string) {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\s+by\s+@[\w-]+.*$/i, "")
    .replace(/\s+/g, " ")
    .replace(/\s+([.,;:])/g, "$1")
    .trim();
}

function isNoise(text: string) {
  const lower = text.toLowerCase();
  return (
    !text ||
    lower.startsWith("full changelog") ||
    lower.startsWith("chore: release") ||
    lower.startsWith("what's changed") ||
    lower === "other changes"
  );
}

function readNotes(body: string) {
  const lines = body.replace(/<!--[\s\S]*?-->/g, "").split("\n");
  const bullets: string[] = [];

  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const bullet = line.match(/^[-*]\s+(.*)$/);
    if (bullet) {
      bullets.push(bullet[1]);
    } else if (bullets.length > 0) {
      bullets[bullets.length - 1] += ` ${line}`;
    }
  }

  const notes = bullets
    .map(cleanInline)
    .filter((note) => !isNoise(note))
    .slice(0, maxNotesPerRelease);

  if (notes.length > 0) {
    return notes;
  }

  return lines
    .map((line) => cleanInline(line.trim()))
    .filter((line) => line && !line.startsWith("#") && !isNoise(line))
    .slice(0, 3);
}

function readRelease(entry: GithubRelease): Release | null {
  if (
    typeof entry.tag_name !== "string" ||
    typeof entry.html_url !== "string"
  ) {
    return null;
  }

  return {
    tag: entry.tag_name,
    name: typeof entry.name === "string" ? entry.name : entry.tag_name,
    url: entry.html_url,
    publishedAt:
      typeof entry.published_at === "string" ? entry.published_at : null,
    notes: typeof entry.body === "string" ? readNotes(entry.body) : [],
  };
}

export async function getReleases() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "rustcode-website",
  };

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${releasesUrl}?per_page=${maxReleases}`, {
    headers,
    next: { revalidate: 900 },
  });

  if (!response.ok) {
    throw new Error(`GitHub releases request failed: ${response.status}`);
  }

  const payload = (await response.json()) as unknown;
  if (!Array.isArray(payload)) {
    throw new Error("GitHub releases response was not a list");
  }

  const releases = payload
    .map((entry) => readRelease(entry as GithubRelease))
    .filter((release): release is Release => release !== null);

  return { version: releases[0]?.tag ?? null, releases, source: githubUrl };
}

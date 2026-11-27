import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteUrl } from "../../site";
import { SiteFrame } from "../../site-shell";
import { docPages, docSourceUrl, findDoc, getDocHtml } from "../docs";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return docPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = findDoc(slug);
  if (!doc) {
    return {};
  }
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `/docs/${slug}` },
    openGraph: {
      title: `${doc.title} · RustCode docs`,
      description: doc.description,
      url: `${siteUrl}/docs/${slug}`,
      type: "article",
    },
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = findDoc(slug);
  if (!doc) {
    notFound();
  }
  const html = await getDocHtml(slug).catch(() => null);

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Docs",
        item: `${siteUrl}/docs`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: doc.title,
        item: `${siteUrl}/docs/${slug}`,
      },
    ],
  };

  return (
    <SiteFrame current="/docs">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c"),
        }}
      />
      <div className="wrap doc-layout">
        <nav className="doc-nav" aria-label="Docs">
          <Link href="/docs">All docs</Link>
          {docPages.map((page) => (
            <Link
              key={page.slug}
              href={`/docs/${page.slug}`}
              aria-current={page.slug === slug ? "page" : undefined}
            >
              {page.title}
            </Link>
          ))}
        </nav>
        <article className="doc-article">
          <div className="page-head">
            <h1>{doc.title}</h1>
            <p>{doc.description}</p>
            <a
              className="text-link"
              href={docSourceUrl(slug)}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub ↗
            </a>
          </div>
          {html ? (
            <div
              className="doc-body"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: rendered from the RustCode repository's own docs
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <p className="empty-note">
              This page is temporarily unavailable. It is also on GitHub.
            </p>
          )}
        </article>
      </div>
    </SiteFrame>
  );
}

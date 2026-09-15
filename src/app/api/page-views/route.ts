import { NextResponse } from "next/server";

const analyticsUrl =
  "https://api.vercel.com/v1/query/web-analytics/visits/count";
const cacheHeaders = {
  "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
};

function readPageviews(payload: unknown) {
  if (!payload || typeof payload !== "object" || !("data" in payload)) {
    return null;
  }

  const data = payload.data;
  if (!data || typeof data !== "object" || !("pageviews" in data)) {
    return null;
  }

  const pageviews = data.pageviews;
  return typeof pageviews === "number" && Number.isFinite(pageviews)
    ? pageviews
    : null;
}

export async function GET() {
  const token = process.env.VERCEL_ANALYTICS_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;

  if (!token || !projectId) {
    return NextResponse.json(
      { pageviews: null },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  const params = new URLSearchParams({ projectId });
  if (process.env.VERCEL_TEAM_ID) {
    params.set("teamId", process.env.VERCEL_TEAM_ID);
  }

  try {
    const response = await fetch(`${analyticsUrl}?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { pageviews: null },
        { status: 502, headers: { "Cache-Control": "no-store" } },
      );
    }

    const pageviews = readPageviews(await response.json());
    if (pageviews === null) {
      return NextResponse.json(
        { pageviews: null },
        { status: 502, headers: { "Cache-Control": "no-store" } },
      );
    }

    return NextResponse.json({ pageviews }, { headers: cacheHeaders });
  } catch {
    return NextResponse.json(
      { pageviews: null },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}

import { NextResponse } from "next/server";
import { getReleases } from "../../releases";

const cacheHeaders = {
  "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800",
};

export async function GET(request: Request) {
  const page = Number(new URL(request.url).searchParams.get("page") ?? "1");
  if (!Number.isInteger(page) || page < 1 || page > 100) {
    return NextResponse.json(
      { error: "Page must be an integer between 1 and 100." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    return NextResponse.json(await getReleases(page), {
      headers: cacheHeaders,
    });
  } catch {
    return NextResponse.json(
      { version: null, releases: [], hasMore: false },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}

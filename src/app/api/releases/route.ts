import { NextResponse } from "next/server";
import { getReleases } from "../../releases";

const cacheHeaders = {
  "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800",
};

export async function GET() {
  try {
    return NextResponse.json(await getReleases(), { headers: cacheHeaders });
  } catch {
    return NextResponse.json(
      { version: null, releases: [] },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}

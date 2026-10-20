import HomeClient from "./home-client";
import { getReleases } from "./releases";

export const revalidate = 900;

export default async function Home() {
  const data = await getReleases().catch(() => ({
    version: null,
    releases: [],
    source: "",
  }));

  return <HomeClient version={data.version} releases={data.releases} />;
}

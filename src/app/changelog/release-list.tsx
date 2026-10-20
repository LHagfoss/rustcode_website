import type { Release } from "../releases";

const releaseDateFormatter = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

function formatReleaseDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? null
    : releaseDateFormatter.format(date);
}

export function ReleaseList({ releases }: { releases: Release[] }) {
  return (
    <ol className="release-list">
      {releases.map((release) => {
        const date = release.publishedAt
          ? formatReleaseDate(release.publishedAt)
          : null;

        return (
          <li className="release-item" key={release.tag}>
            <div className="release-meta">
              <a
                className="release-tag"
                href={release.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {release.tag}
              </a>
              {release.publishedAt && date && (
                <time className="release-date" dateTime={release.publishedAt}>
                  {date}
                </time>
              )}
            </div>
            {release.notes.length > 0 && (
              <ul className="release-notes">
                {release.notes.map((note) => (
                  <li key={`${release.tag}-${note}`}>{note}</li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ol>
  );
}

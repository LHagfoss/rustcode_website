import type { ReactNode } from "react";

export function FeatureCard({
  index,
  title,
  tile,
  children,
}: {
  index: string;
  title: string;
  tile: ReactNode;
  children: ReactNode;
}) {
  return (
    <article className="feature-card">
      <div className="feature-tile" aria-hidden="true">
        {tile}
      </div>
      <div className="feature-copy">
        <span className="feature-index">{index}</span>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </article>
  );
}

import type { ReactNode } from "react";

export function FeatureCard({
  title,
  tile,
  children,
}: {
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
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </article>
  );
}

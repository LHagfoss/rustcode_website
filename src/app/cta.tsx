import type { ReactNode } from "react";
import { InstallBox } from "./install-box";
import { githubUrl } from "./site";

export function CtaBlock({
  id,
  version,
  seed,
  title,
  copy,
  note,
}: {
  id: string;
  version: string | null;
  seed: number;
  title: string;
  copy: string;
  note: ReactNode;
}) {
  return (
    <section className="cta-block" aria-labelledby={`${id}-title`}>
      <div className="cta-block-copy">
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{copy}</p>
      </div>
      <InstallBox version={version} seed={seed} note={note} />
      <a
        className="text-link cta-link"
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Source on GitHub ↗
      </a>
    </section>
  );
}

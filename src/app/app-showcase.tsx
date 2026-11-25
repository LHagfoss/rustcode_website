"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useState } from "react";

const views = [
  {
    key: "threads",
    label: "Threads",
    caption: "An agent asks before it reads, writes or runs.",
    src: "/images/app-thread.png",
    alt: "RustCode thread view: a fix from the agent, a pending approval prompt and the thread's properties panel",
  },
  {
    key: "dashboard",
    label: "Dashboard",
    caption: "Spend, tokens and turns across every harness.",
    src: "/images/app-dashboard.png",
    alt: "RustCode dashboard with spend, turns, an activity heatmap, models and harness usage",
  },
  {
    key: "jobs",
    label: "Jobs",
    caption: "Scheduled agents that run on any of your machines.",
    src: "/images/app-jobs.png",
    alt: "RustCode Jobs page listing scheduled agent jobs such as CI watch and a dependency audit",
  },
] as const;

const CYCLE_MS = 6500;

// The hero's app window: real screenshots of RustCode, switched with tabs.
// It advances on its own until someone picks a tab, and never under reduced
// motion.
export function AppShowcase() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAuto(false);
    }
  }, []);

  useEffect(() => {
    if (!auto) return;
    const timer = window.setInterval(
      () => setActive((index) => (index + 1) % views.length),
      CYCLE_MS,
    );
    return () => window.clearInterval(timer);
  }, [auto]);

  return (
    <div className="showcase" data-tilt>
      <div className="showcase-bar">
        <span className="showcase-lights" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <div className="showcase-tabs" role="tablist" aria-label="App views">
          {views.map((view, index) => (
            <button
              key={view.key}
              type="button"
              role="tab"
              id={`showcase-tab-${view.key}`}
              aria-selected={index === active}
              aria-controls="showcase-panel"
              data-auto={auto && index === active ? true : undefined}
              style={{ "--cycle": `${CYCLE_MS}ms` } as CSSProperties}
              onClick={() => {
                setActive(index);
                setAuto(false);
              }}
            >
              {view.label}
            </button>
          ))}
        </div>
        <p className="showcase-caption" aria-live="polite">
          {views[active].caption}
        </p>
      </div>
      <figure
        id="showcase-panel"
        className="showcase-stage"
        role="tabpanel"
        aria-labelledby={`showcase-tab-${views[active].key}`}
      >
        {views.map((view, index) => (
          <Image
            key={view.key}
            src={view.src}
            alt={index === active ? view.alt : ""}
            aria-hidden={index === active ? undefined : true}
            data-active={index === active || undefined}
            width={3024}
            height={1716}
            sizes="(min-width: 1240px) 1180px, 100vw"
            priority={index === 0}
          />
        ))}
      </figure>
    </div>
  );
}

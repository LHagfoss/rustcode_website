"use client";

import Image from "next/image";
import {
  type CSSProperties,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";

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

// How long each view stays up while the showcase advances on its own, and
// how long the switch between two views takes.
const CYCLE_MS = 7000;
const SWAP_MS = 700;

// The hero's app window: real screenshots of RustCode, switched with tabs.
// A small dock floats over the bottom of the window: a dot per view, the
// active one stretched into a pill whose fill is the timer. When the fill's
// animation ends the next view comes in, so hovering the window (or
// scrolling it out of view) pauses both. Picking a tab stops the auto-advance; reduced motion
// never starts it.
export function AppShowcase() {
  const rootRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAuto(false);
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) =>
      setOnScreen(entry.isIntersecting),
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  // Drop the outgoing view once its exit has played.
  useEffect(() => {
    if (previous === null) return;
    const timer = window.setTimeout(() => setPrevious(null), SWAP_MS);
    return () => window.clearTimeout(timer);
  }, [previous]);

  function show(next: number, dir: number) {
    if (next === active) return;
    setDirection(dir);
    setPrevious(active);
    setActive(next);
  }

  function pick(next: number) {
    setAuto(false);
    show(next, next > active ? 1 : -1);
    tabsRef.current[next]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const step =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    pick((active + step + views.length) % views.length);
  }

  const running = auto && !hovered && onScreen;

  return (
    <div
      ref={rootRef}
      className="showcase"
      data-tilt
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      style={
        {
          "--cycle": `${CYCLE_MS}ms`,
          "--swap": `${SWAP_MS}ms`,
          "--dir": direction,
        } as CSSProperties
      }
    >
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
            data-state={
              index === active
                ? previous === null && direction === 0
                  ? "idle"
                  : "in"
                : index === previous
                  ? "out"
                  : undefined
            }
            width={3024}
            height={1716}
            sizes="(min-width: 1240px) 1180px, 100vw"
            priority={index === 0}
          />
        ))}
      </figure>
      <div
        className="showcase-dock"
        role="tablist"
        aria-label="App views"
        onKeyDown={onKeyDown}
        data-paused={running ? undefined : true}
      >
        {views.map((view, index) => (
          <button
            key={view.key}
            ref={(node) => {
              tabsRef.current[index] = node;
            }}
            type="button"
            role="tab"
            id={`showcase-tab-${view.key}`}
            aria-selected={index === active}
            aria-controls="showcase-panel"
            aria-label={`${view.label}: ${view.caption}`}
            tabIndex={index === active ? 0 : -1}
            style={
              { "--w": `${view.label.length * 7 + 36}px` } as CSSProperties
            }
            onClick={() => pick(index)}
          >
            {index === active && auto && (
              <span
                key={active}
                className="showcase-fill"
                aria-hidden="true"
                onAnimationEnd={() => show((active + 1) % views.length, 1)}
              />
            )}
            <span className="showcase-label" aria-hidden="true">
              {view.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

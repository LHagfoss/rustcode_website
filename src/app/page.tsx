"use client";

import Image from "next/image";
import { useState } from "react";

const installers = [
  {
    id: "unix",
    name: "macOS / Linux",
    note: "Bash",
    command: "curl -fsSL https://rustcode.lhagfoss.com/install.sh | bash",
  },
  {
    id: "windows",
    name: "Windows",
    note: "PowerShell",
    command: "irm https://rustcode.lhagfoss.com/install.ps1 | iex",
  },
] as const;

export default function Home() {
  const [copied, setCopied] = useState<string | null>(null);
  const [screenshotAvailable, setScreenshotAvailable] = useState(true);

  async function copyCommand(id: string, command: string) {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(id);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      setCopied(null);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#10100f] text-[#f4f0e8]">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-6 sm:px-10 sm:py-8">
        <header className="flex items-center justify-between">
          <a
            className="flex items-center gap-3"
            href="/"
            aria-label="RustCode home"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-[#e8ff59] font-mono text-lg font-bold text-[#10100f]">
              &gt;_
            </span>
            <span className="font-mono text-lg font-semibold tracking-tight">
              rustcode
            </span>
          </a>
          <a
            className="text-sm text-[#a9a59c] transition hover:text-[#f4f0e8]"
            href="https://github.com/LHagfoss/rustcode"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
        </header>

        <section className="grid flex-1 items-center gap-14 py-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:py-24">
          <div>
            <p className="mb-6 font-mono text-sm uppercase tracking-[0.22em] text-[#e8ff59]">
              Terminal pair programming
            </p>
            <h1 className="max-w-xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-7xl">
              Your codebase. Your terminal.
              <span className="text-[#e8ff59]"> Your agent.</span>
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-8 text-[#a9a59c]">
              RustCode is a fast, native terminal agent for pair programming
              directly in the projects you already know.
            </p>

            <div className="mt-10 space-y-3">
              {installers.map((installer) => (
                <div
                  className="group rounded-2xl border border-white/10 bg-white/[0.045] p-4 transition hover:border-[#e8ff59]/50"
                  key={installer.id}
                >
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium">{installer.name}</p>
                      <p className="mt-0.5 text-xs text-[#8b877f]">
                        {installer.note}
                      </p>
                    </div>
                    <button
                      className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-[#e8ff59] transition hover:border-[#e8ff59] focus:outline-none focus:ring-2 focus:ring-[#e8ff59]"
                      type="button"
                      onClick={() =>
                        copyCommand(installer.id, installer.command)
                      }
                    >
                      {copied === installer.id ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <code className="block overflow-x-auto whitespace-nowrap rounded-xl bg-black/30 px-3 py-2.5 font-mono text-xs text-[#d6d1c6]">
                    {installer.command}
                  </code>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-[#77736c]">
              The installer fetches the latest verified native release.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-[#e8ff59]/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#1a1a18] p-2 shadow-2xl shadow-black/40">
              <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-3">
                <span className="size-2.5 rounded-full bg-[#ff6b5f]" />
                <span className="size-2.5 rounded-full bg-[#f4c95d]" />
                <span className="size-2.5 rounded-full bg-[#62c554]" />
                <span className="ml-3 font-mono text-[11px] text-[#77736c]">
                  rustcode — ~/project
                </span>
              </div>
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-b-[1rem] bg-[#0c0c0b]">
                {screenshotAvailable ? (
                  <Image
                    className="object-cover"
                    src="/rustcode-screenshot.png"
                    alt="RustCode running in a terminal"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    onError={() => setScreenshotAvailable(false)}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3 px-8 text-center text-[#77736c]">
                    <span className="font-mono text-4xl text-[#e8ff59]">
                      &gt;_
                    </span>
                    <p className="text-sm">
                      Your RustCode screenshot goes here.
                    </p>
                    <p className="font-mono text-xs text-[#55524d]">
                      public/rustcode-screenshot.png
                    </p>
                  </div>
                )}
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-[#77736c]">
              A calm interface for serious work.
            </p>
          </div>
        </section>

        <footer className="flex flex-col gap-2 border-t border-white/10 pt-5 text-xs text-[#77736c] sm:flex-row sm:items-center sm:justify-between">
          <span>Built for the command line.</span>
          <span className="font-mono">macOS · Linux · Windows</span>
        </footer>
      </div>
    </main>
  );
}

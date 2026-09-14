"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const installers = [
  {
    id: "macos",
    name: "macOS",
    note: "Bash",
    command: "curl -fsSL https://rustcode.lhagfoss.com/install.sh | bash",
  },
  {
    id: "linux",
    name: "Linux",
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
  const [activeInstaller, setActiveInstaller] =
    useState<(typeof installers)[number]["id"]>("macos");
  const [stars, setStars] = useState<number | null>(null);
  const selectedInstaller =
    installers.find((installer) => installer.id === activeInstaller) ??
    installers[0];

  useEffect(() => {
    fetch("https://api.github.com/repos/LHagfoss/rustcode")
      .then((response) => {
        if (!response.ok) {
          throw new Error("GitHub request failed");
        }
        return response.json() as Promise<{ stargazers_count: number }>;
      })
      .then((repository) => setStars(repository.stargazers_count))
      .catch(() => setStars(null));
  }, []);

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
    <main className="min-h-screen overflow-hidden bg-[#192330] text-[#d8e0e8]">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-6 sm:px-10 sm:py-8">
        <header className="flex items-center justify-between">
          <a
            className="flex items-center gap-3"
            href="/"
            aria-label="RustCode home"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-[#6d9bc4] font-mono text-lg font-bold text-[#192330]">
              &gt;_
            </span>
            <span className="font-mono text-lg font-semibold tracking-tight">
              rustcode
            </span>
          </a>
          <a
            className="flex items-center gap-3 rounded-xl border border-[#526b83] bg-[#233143] px-4 py-2.5 text-sm font-medium text-[#d8e0e8] transition hover:border-[#6d9bc4] hover:bg-[#2a394b]"
            href="https://github.com/LHagfoss/rustcode"
            target="_blank"
            rel="noreferrer"
          >
            <span>GitHub</span>
            {stars !== null && (
              <span className="font-mono text-xs text-[#c8ad72]">
                ★ {new Intl.NumberFormat().format(stars)}
              </span>
            )}
            <span
              className="text-xl leading-none text-[#6d9bc4]"
              aria-hidden="true"
            >
              ↗
            </span>
          </a>
        </header>

        <section className="grid flex-1 items-center gap-14 py-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:py-24">
          <div>
            <p className="mb-6 font-mono text-sm uppercase tracking-[0.22em] text-[#6d9bc4]">
              Terminal pair programming
            </p>
            <h1 className="max-w-xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-7xl">
              Your codebase. Your terminal.
              <span className="text-[#6d9bc4]"> Your agent.</span>
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-8 text-[#7f8d9c]">
              RustCode is a fast, native terminal agent for pair programming
              directly in the projects you already know.
            </p>

            <div className="mt-10 rounded-2xl border border-[#34465b] bg-[#233143] p-4">
              <div
                className="flex rounded-xl bg-[#192330] p-1"
                role="tablist"
                aria-label="Choose your platform"
              >
                {installers.map((installer) => (
                  <button
                    className={
                      "flex-1 rounded-lg px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-[#6d9bc4] " +
                      (activeInstaller === installer.id
                        ? "bg-[#6d9bc4] text-[#192330]"
                        : "text-[#7f8d9c] hover:bg-[#2a394b] hover:text-[#d8e0e8]")
                    }
                    key={installer.id}
                    type="button"
                    role="tab"
                    aria-selected={activeInstaller === installer.id}
                    onClick={() => setActiveInstaller(installer.id)}
                  >
                    {installer.name}
                  </button>
                ))}
              </div>
              <div
                className="mt-4"
                role="tabpanel"
                aria-label={`${selectedInstaller.name} installer`}
              >
                <div className="mb-3 flex items-center justify-between gap-4">
                  <p className="text-xs text-[#7f8d9c]">
                    {selectedInstaller.note}
                  </p>
                  <button
                    className="rounded-lg border border-[#526b83] px-3 py-1.5 text-xs font-medium text-[#6d9bc4] transition hover:border-[#6d9bc4] focus:outline-none focus:ring-2 focus:ring-[#6d9bc4]"
                    type="button"
                    onClick={() =>
                      copyCommand(
                        selectedInstaller.id,
                        selectedInstaller.command,
                      )
                    }
                  >
                    {copied === selectedInstaller.id ? "Copied" : "Copy"}
                  </button>
                </div>
                <code className="block overflow-x-auto whitespace-nowrap rounded-xl bg-[#192330] px-3 py-2.5 font-mono text-xs text-[#d8e0e8]">
                  {selectedInstaller.command}
                </code>
              </div>
            </div>
            <p className="mt-4 text-xs text-[#7f8d9c]">
              The installer fetches the latest verified native release.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-[#6d9bc4]/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[1.5rem] border border-[#34465b] bg-[#233143] p-2 shadow-2xl shadow-black/30">
              <div className="flex items-center gap-1.5 border-b border-[#34465b] px-3 py-3">
                <span className="size-2.5 rounded-full bg-[#ec6e5d]" />
                <span className="size-2.5 rounded-full bg-[#c8ad72]" />
                <span className="size-2.5 rounded-full bg-[#8fa878]" />
                <span className="ml-3 font-mono text-[11px] text-[#7f8d9c]">
                  rustcode — ~/project
                </span>
              </div>
              <div className="flex items-center justify-center overflow-hidden rounded-b-[1rem] bg-[#192330]">
                <Image
                  className="h-auto w-full"
                  src="/images/header.png"
                  alt="RustCode running in a terminal"
                  width={1078}
                  height={712}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                />
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-[#7f8d9c]">
              A calm interface for serious work.
            </p>
          </div>
        </section>

        <footer className="flex flex-col gap-2 border-t border-[#34465b] pt-5 text-xs text-[#7f8d9c] sm:flex-row sm:items-center sm:justify-between">
          <span>Built for the command line.</span>
          <span className="font-mono">macOS · Linux · Windows</span>
        </footer>
      </div>
    </main>
  );
}

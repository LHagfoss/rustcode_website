"use client";

import { DrawablyButton, DrawablyCard, DrawablyTabs } from "drawably/react";
import { type ReactNode, useId, useState } from "react";

type Installer = {
  id: string;
  label: string;
  command: string;
};

const installers: readonly Installer[] = [
  {
    id: "macos",
    label: "macOS",
    command: "curl -fsSL https://rustcode.lhagfoss.com/install.sh | bash",
  },
  {
    id: "linux",
    label: "Linux",
    command: "curl -fsSL https://rustcode.lhagfoss.com/install.sh | bash",
  },
  {
    id: "windows",
    label: "Windows",
    command: "irm https://rustcode.lhagfoss.com/install.ps1 | iex",
  },
];

export function InstallBox({
  version,
  note,
  anchor,
  seed = 20,
}: {
  version: string | null;
  note: ReactNode;
  anchor?: string;
  seed?: number;
}) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const [failed, setFailed] = useState<string | null>(null);
  const uid = useId();
  const installer = installers[active];

  function select(index: number) {
    setActive(index);
    setCopied(null);
    setFailed(null);
  }

  async function copy() {
    const id = installer.id;
    setFailed(null);

    try {
      await navigator.clipboard.writeText(installer.command);
      setCopied(id);
      window.setTimeout(() => {
        setCopied((current) => (current === id ? null : current));
      }, 1800);
    } catch {
      setCopied(null);
      setFailed(id);
    }
  }

  return (
    <DrawablyCard
      className="install"
      id={anchor}
      seed={seed}
      role="group"
      aria-label="Install RustCode"
    >
      <div className="install-top">
        <DrawablyTabs
          className="install-tabs"
          aria-label="Choose your platform"
          active={active}
          seed={seed + 1}
        >
          {installers.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`${uid}-tab-${item.id}`}
              aria-selected={index === active}
              aria-controls={`${uid}-panel`}
              onClick={() => select(index)}
            >
              {item.label}
            </button>
          ))}
        </DrawablyTabs>
        <span className="install-version">{version ?? "latest release"}</span>
      </div>

      <div
        className="install-command"
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${installer.id}`}
      >
        <code>
          <span className="command-prompt" aria-hidden="true">
            $
          </span>
          {installer.command}
        </code>
        <DrawablyButton
          className="copy"
          variant={copied === installer.id ? "solid" : "outline"}
          seed={seed + 2}
          onClick={copy}
          aria-label={`Copy the ${installer.label} install command`}
        >
          {copied === installer.id ? "Copied" : "Copy"}
        </DrawablyButton>
      </div>

      {failed === installer.id && (
        <p className="install-error" role="alert">
          Could not copy. Select the command and copy it manually.
        </p>
      )}

      <p className="install-note">{note}</p>

      <span className="sr-only" aria-live="polite">
        {copied === installer.id ? `${installer.label} command copied` : ""}
      </span>
    </DrawablyCard>
  );
}

import type { NextConfig } from "next";

// The installers live in the rustcode repo (scripts/install.sh, install.ps1).
// Redirect to them instead of keeping copies here, so the served script never
// drifts from the one that matches the current release asset names. A stale
// copy once downloaded the post-1.45 harness tarball over users' server binary.
// Temporary (307) so clients never cache the target; `curl -fsSL` and
// PowerShell's `irm` both follow it.
const INSTALLER_BASE =
  "https://raw.githubusercontent.com/LHagfoss/rustcode/main/scripts";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return ["install.sh", "install.ps1"].map((file) => ({
      source: `/${file}`,
      destination: `${INSTALLER_BASE}/${file}`,
      permanent: false,
    }));
  },
};

export default nextConfig;

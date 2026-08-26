import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The CLI checker cannot capture `tsc --showConfig` reliably in restricted
  // build environments. The compiler API performs the same build-time check.
  experimental: { useTypeScriptCli: false },
};

export default nextConfig;

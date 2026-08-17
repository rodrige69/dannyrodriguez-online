import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output produces a minimal, self-contained server bundle in .next/standalone —
  // this is what the Dockerfile copies into the production image, so the image doesn't need
  // the full node_modules tree or source files, just the built output.
  output: "standalone",
};

export default nextConfig;

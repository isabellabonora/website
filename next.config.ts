import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The work index was folded into the home page compass.
  async redirects() {
    return [{ source: "/work", destination: "/#work", permanent: false }];
  },
};

export default nextConfig;

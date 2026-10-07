import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/preventivo", destination: "/contatti#preventivo", permanent: true },
    ];
  },
};

export default withPayload(nextConfig);

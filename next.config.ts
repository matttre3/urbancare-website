import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/guide", destination: "/blog", permanent: true },
      { source: "/guide/costo-amministratore-condominio", destination: "/blog/costo-amministratore-condominio", permanent: true },
      { source: "/guide/cambio-amministratore-condominio", destination: "/blog/cambio-amministratore-condominio", permanent: true },
      { source: "/preventivo", destination: "/contatti#preventivo", permanent: true },
    ];
  },
};

export default withPayload(nextConfig);

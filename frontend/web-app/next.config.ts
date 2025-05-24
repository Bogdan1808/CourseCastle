import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  logging:{
    fetches:{
      fullUrl: true
    }
  },
    images: {
    domains: [
      'cdn.pixabay.com',
      'i2.wp.com',
    ],
  }
};

export default withFlowbiteReact(nextConfig);
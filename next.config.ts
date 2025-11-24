import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa"; // Changed package name

const nextConfig: NextConfig = {
  // ... your config
};

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  disable: process.env.NODE_ENV === 'development',
  workboxOptions: {
    skipWaiting: true,
  },
});

export default withPWA(nextConfig);
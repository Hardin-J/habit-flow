import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa"; // Changed package name

const nextConfig: NextConfig = {
   // ... your config
};

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

export default withPWA(nextConfig);
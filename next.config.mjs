/** @type {import('next').NextConfig} */
import * as PWA from "@ducanh2912/next-pwa";

const withPWA = PWA.default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
  },
});
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
      },
      { protocol: "https", hostname: "i.pinimg.com" },
    ],
  },
};

export default withPWA(nextConfig);

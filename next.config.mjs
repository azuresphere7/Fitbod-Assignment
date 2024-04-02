/** @type {import("next").NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_API: process.env.GOOGLE_API
  },
  images: {
    domains: ["app-media.fitbod.me"]
  }
};

export default nextConfig;

import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "app/lib/sw.ts",
  swDest: "public/sw.js",
  exclude: [/\/api$/],
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withSerwist(nextConfig);

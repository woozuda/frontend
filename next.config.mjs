import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "app/lib/sw.ts",
  swDest: "public/sw.js",
  exclude: [/\/api$/],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default withSerwist(nextConfig);

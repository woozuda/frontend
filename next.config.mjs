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
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "kr.object.ncloudstorage.com",
      },
      {
        protocol: "https",
        hostname: "woozuda-image.kr.object.ncloudstorage.com",
      },
    ],
  }
};

export default withSerwist(nextConfig);

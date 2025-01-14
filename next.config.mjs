/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["es", "en-US"],
    defaultLocale: "en-US",
    localeDetection: false,
  },
  reactStrictMode: true,

  output: "export",
  images: {
    unoptimized: true,
  },
  distDir: "out",
};

export default nextConfig;

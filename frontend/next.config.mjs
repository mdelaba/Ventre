/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export", // Enables static export
  distDir: "out", // Specifies the output directory
  reactStrictMode: true, // This should be true
};

export default nextConfig;

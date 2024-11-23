/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: "anonymous",
  /* additional config options here */
};

const outputConfig = {
  // Generate a static export
  trailingSlash: true,

  // Set the output directory for the export
  distDir: "out",
};

module.exports = {
  ...nextConfig,
  ...outputConfig,
};

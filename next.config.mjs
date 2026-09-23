/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    "192.168.10.12",
    "192.168.10.12:3000",
    "localhost",
    "localhost:3000",
    "127.0.0.1",
    "127.0.0.1:3000",
  ],
};

export default nextConfig;

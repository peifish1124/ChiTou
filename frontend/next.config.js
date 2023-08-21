/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["maps.googleapis.com"],
  },
  async redirects() {
    return [
      {
        source: "/login",
        has: [
          {
            type: "cookie",
            key: "accessToken",
          },
        ],
        permanent: false,
        destination: "/",
      },
      {
        source: "/(|trip/edit/|trip/.*/edit)",
        missing: [
          {
            type: "cookie",
            key: "accessToken",
          },
        ],
        permanent: false,
        destination: "/login",
      },
    ];
  },
};

module.exports = nextConfig;

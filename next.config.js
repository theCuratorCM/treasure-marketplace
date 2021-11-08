module.exports = {
  images: {
    domains: ["gateway.pinata.cloud"],
  },
  async redirects() {
    return [
      {
        source: "/collection",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

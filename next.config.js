module.exports = {
  images: {
    domains: ["treasure-marketplace.mypinata.cloud"],
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

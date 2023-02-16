module.exports = {
  target: "serverless",
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-eval'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self' data:;",
          },
        ],
      },
    ];
  },
  trailingSlash: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = "electron-renderer";
    }

    return config;
  },
  exportPathMap: function () {
    return {
      "/": { page: "/home" },
      "/chat/[...params]": { page: "/chat" },
    };
  },
};

module.exports = {
  trailingSlash: true,
  target: "serverless",
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

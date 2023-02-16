module.exports = {
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

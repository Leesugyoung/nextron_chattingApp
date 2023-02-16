module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = "electron-renderer";
    }

    return config;
  },
  exportPathMap: function () {
    return {
      "/": { page: "/" },
      "/chat/[...params]": { page: "/chat" },
    };
  },
};

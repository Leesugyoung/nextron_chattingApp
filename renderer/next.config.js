module.exports = {
  trailingSlash: true,
  env: {
    FIREBASE_API_KEY: process.env.apiKey,
    AUTH_DOMAIN: process.env.authDomain,
    PROJECT_ID: process.env.projectId,
    STORAGE_BUCKET: process.env.storageBucket,
    MESSAGING_SENDER_ID: process.env.messagingSenderId,
    APP_ID: process.env.appId,
    MEASUREMENTID: process.env.measurementId,
    DATABASEURL: process.env.databaseURL,
  },
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

const packageJson = require("./package.json");

/**
 * @typedef {import('expo/config').ExpoConfig} ExpoConfig
 */

/**
 * @type {ExpoConfig}
 */
const config = {
  name: packageJson.name,
  slug: packageJson.name,
  version: packageJson.version,
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: `com.xseignard.${packageJson.name}`,
    supportsTablet: true,
  },
  android: {
    package: `com.xseignard.${packageJson.name}`,
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  extra: {
    eas: {
      projectId: "8779f01e-529b-40be-9712-f14db700195f",
    },
  },
};

module.exports = config;

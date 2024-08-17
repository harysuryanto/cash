import { ConfigContext, ExpoConfig } from "expo/config";

const packageJson = require("./package.json");
const VERSION: string = packageJson.version;
const ENV = process.env.APP_ENV || "development";
const BUNDLE_ID_POSTFIX = ENV === "production" ? "" : `.${ENV}`;
const NAME: string = `Cash${ENV === "production" ? "" : ` (${ENV})`}`;
const SCHEME: string = "cash";

module.exports = (_: ConfigContext): Partial<ExpoConfig> => {
  return {
    name: NAME,
    slug: "cash",
    version: VERSION,
    scheme: SCHEME,
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      bundleIdentifier: `id.harysuryanto.cash${BUNDLE_ID_POSTFIX}`,
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: `id.harysuryanto.cash${BUNDLE_ID_POSTFIX}`,
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: ["expo-router", "expo-font"],
    experiments: {
      typedRoutes: true,
    },
    updates: {
      url: "https://u.expo.dev/4d491cde-a25d-41cc-8cf0-4304256de998",
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    extra: {
      eas: {
        projectId: "4d491cde-a25d-41cc-8cf0-4304256de998",
      },
    },
  };
};

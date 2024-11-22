import { ExpoConfig } from "expo/config";

const packageJson = require("./package.json");
const VERSION = packageJson.version as string;
const ENV = process.env.EXPO_PUBLIC_APP_ENV || "development";
const NAME_POSTFIX = ENV === "production" ? "" : ` (${ENV})`;
const SCHEME_POSTFIX = ENV === "production" ? "" : `-${ENV}`;
const BUNDLE_ID_POSTFIX = ENV === "production" ? "" : `.${ENV}`;

export default {
  name: `Cash${NAME_POSTFIX}`,
  slug: "cash",
  version: VERSION,
  scheme: `cash${SCHEME_POSTFIX}`,
  orientation: "default",
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
    versionCode: 1,
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
    platform: process.env.EXPO_PUBLIC_PLATFORM,
  },
} satisfies ExpoConfig;

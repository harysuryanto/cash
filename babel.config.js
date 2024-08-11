const ENV = (process.env.ENVIRONMENT || "development").toLowerCase();

module.exports = function (api) {
  api.cache(true);
  console.info("🌏 Using .env." + ENV + " for babel config");

  const plugins = [
    [
      "module:react-native-dotenv",
      {
        envName: "ENVIRONMENT",
        moduleName: "@env",
        path: ".env." + ENV,
      },
    ],
  ];

  return {
    presets: ["babel-preset-expo"],
    plugins,
  };
};

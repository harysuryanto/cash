const ENV = (process.env.APP_ENV || "development").toLowerCase();

module.exports = function (api) {
  api.cache(true);
  console.info("🌏 Using .env." + ENV + " in babel.config.js");

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env." + ENV,
        },
      ],
    ],
  };
};

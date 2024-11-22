// See important env rules at https://docs.expo.dev/guides/environment-variables/#how-to-read-from-environment-variables.
export const env = Object.freeze({
  EXPO_PUBLIC_APP_ENV: (process.env.EXPO_PUBLIC_APP_ENV || "development") as
    | "development"
    | "staging"
    | "production",
});

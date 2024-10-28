import { z } from "zod";

// const activeEnv = process.env.EXPO_PUBLIC_APP_ENV || "development";

// interface Env {
//   dev: string;
//   stag: string;
//   prod: string;
// }

// const createEnv = (prop: Env) => {
//   switch (activeEnv) {
//     case "development":
//       return prop.dev;
//     case "staging":
//       return prop.stag;
//     case "production":
//       return prop.prod;
//     default:
//       return prop.dev;
//   }
// };

/**
 * Must start with "EXPO_PUBLIC_" for variables names
 */

// const EXPO_PUBLIC_APP_ENV = createEnv({
//   dev: "development",
//   stag: "staging",
//   prod: "production",
// });

const envSchema = z.object({
  EXPO_PUBLIC_APP_ENV: z
    .enum(["development", "staging", "production"])
    .default("development"),
});

export const env = envSchema.parse(process.env);

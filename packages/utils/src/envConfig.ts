import "dotenv/config";          // 1) auto-loads the first .env it finds in cwd/parents
import { z } from "zod";

const _env = z
  .object({
    NODE_ENV: z.enum(["development","production","test"]).default("production"),

    HOST: z.string().nonempty().default("localhost"),
    PORT: z.coerce.number().int().positive().default(8000),

    CORS_ORIGINS: z
      .string()
      .optional()
      .transform((s) =>
        s
          ? s.split(",").map((u) => new URL(u).toString())
          : ["http://localhost:3000"]
      ),

    COMMON_RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().positive().default(1000),
    COMMON_RATE_LIMIT_WINDOW_MS:    z.coerce.number().int().positive().default(1000),

    MONGO_URI:            z.string().url().default("mongodb://localhost:27017"),
    MONGO_DB_NAME:        z.string().nonempty().default("service-name-template"),
    REGISTRY_URL:         z.string().url().default("http://localhost:3000/registry"),
    SERVICE_NAME:         z.string().nonempty().default("service-name-template"),
    HEARTBEAT_INTERVAL_MS: z.coerce.number().int().positive().default(5000),
  })
  .parse(process.env);          // throws if anything’s missing or invalid

export const env = {
  ..._env,
  isDev:  _env.NODE_ENV === "development",
  isProd: _env.NODE_ENV === "production",
  isTest: _env.NODE_ENV === "test",
};

export type Env = typeof _env;
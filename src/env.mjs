import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    OPENAI_API_KEY: z.string().min(1),
  },
  client: {},
  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
  experimental__runtimeEnv: {},
});

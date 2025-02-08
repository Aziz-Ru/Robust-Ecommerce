import { config } from "dotenv";
import { z } from "zod";

const EnvSchema = z.object({
  DB_URL: z
    .string({
      required_error: "DB_URL is required",

      message: "DB_URL is required and must be a string",
    })
    .nonempty(),
  DB_HOST: z
    .string({
      message: "DB_HOST is required and must be a string.Exm:localhost",
    })
    .nonempty(),
  DB_USER: z
    .string({
      message: "DB_USER is required and must be a string.Exm:root",
    })
    .nonempty(),
  DB_PASSWORD: z
    .string({
      message: "DB_PASSWORD is required and must be a string",
    })
    .nonempty(),
  DB_NAME: z
    .string({
      message: "DB_NAME is required and must be a string:e.g. mydb",
    })
    .nonempty(),
  DB_PORT: z.coerce
    .number({
      message: "DB_PORT is required and must be a number.Ex:5432",
    })
    .int(),
  PORT: z.coerce
    .number({
      message: "PORT is required and must be a number.Exm:3000",
    })
    .int({ message: "PORT must be an integer" }),
  JWT_SECRET_KEY: z
    .string({
      message: "JWT_SECRET_KEY is required and must be a string",
    })
    .nonempty(),
  JWT_EXPIRES_IN: z
    .string({
      message: "JWT_EXPIRES_IN is required and must be a string.Exm:7d",
    })
    .nonempty(),
  REFRESH_TOKEN_SECRET_KEY: z
    .string({
      message: "REFRESH_TOKEN_SECRET_KEY is required and must be a string",
    })
    .nonempty(),
  REFRESH_TOKEN_EXPIRES_IN: z
    .string({
      message:
        "REFRESH_TOKEN_EXPIRES_IN is required and must be a string.Exm:7d",
    })
    .nonempty(),
  RATE_LIMITER_WINDOW: z.coerce
    .number({
      message: "RATE_LIMITER_WINDOW is required and must be a string.Exm:1000",
    })
    .int(),
  RATE_LIMITER_MAX: z.coerce
    .number({
      message: "RATE_LIMITER_MAX is required and must be a string.Exm:1000",
    })
    .int(),
  RATE_LIMITER_DELAY: z.coerce
    .number({
      message: "RATE_LIMITER_DELAY is required and must be a string.Exm:1000",
    })
    .int(),
  V1: z
    .string({
      message: "PREFIX is required and must be a string.Exm:api/v1",
    })
    .nonempty(),
  NODE_ENV: z
    .string({
      message: "NODE_ENV is required and must be a string.Exm:development",
    })
    .nonempty(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

config();

try {
  EnvSchema.parse(process.env);
} catch (error: any) {
  if (error instanceof z.ZodError) {
    error.errors.forEach((err) => {
      console.error(err.message);
    });
  } else {
    console.error(error.errors);
  }

  process.exit(1);
}

export default EnvSchema.parse(process.env);

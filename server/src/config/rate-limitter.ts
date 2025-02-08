import rateLimit from "express-rate-limit";
import env from "./env";

const limitter = rateLimit({
  windowMs: env.RATE_LIMITER_WINDOW,
  max: env.RATE_LIMITER_MAX,
  message: { msg: "Too many requests, please try again later." },
  statusCode: 429,
  headers: true,
});

export default limitter;

import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import { createServer } from "http";
import httpStatus from "http-status";
import morgan from "morgan";
import routes from "./app";
import env from "./config/env";
import limitter from "./config/rate-limitter";
import { errorConverter, errorHandler } from "./middlewares/error";
import ApiError from "./utils/ApiError";
// create an express app.
const app = express();

const server = createServer(app);

// Middlewares
// parsing incoming requests with JSON payload.
app.use(express.json());
// parsing incoming requests with urlencoded payload.
app.use(express.urlencoded({ extended: true }));

// logging incoming requests.
app.use(morgan("dev"));
// compressing responses.
app.use(compression());
// securing the app by setting various HTTP headers.
app.use(helmet());

app.use(cookieParser(env.JWT_SECRET_KEY));
// enabling cors.
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// disabling the powered-by header.
app.disable("x-powered-by");
// disabling the etag header.
app.disable("etag");
// serving static files.
app.use(express.static("public"));

app.use(limitter);

// Routes
app.use(env.V1, routes);

// 404 route.
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// Error handling middleware.
app.use(errorConverter);
app.use(errorHandler);

// start the server.
server.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});

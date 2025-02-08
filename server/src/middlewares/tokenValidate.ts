import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import env from "../config/env";
import ApiError from "../utils/ApiError";
import catchAsync from "../utils/catchAsync";

const cookieValidate = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.cookies.token;
      console.log(payload);
      const isVerified = await jwt.verify(payload, env.JWT_SECRET_KEY);
      if (!isVerified) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are unauthorized");
      }
      next();
    } catch (error) {
      //   console.log(error);
      throw new ApiError(httpStatus.UNAUTHORIZED, "You are unauthorized");
    }
  });
};

export default cookieValidate;

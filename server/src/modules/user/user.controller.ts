import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../utils/ApiError";
import catchAsync from "../../utils/catchAsync";
import * as userService from "./user.service";

// get users
export const getUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await userService.getUsers();
  return res.status(200).json(users);
});

// get user
export const getUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.getUser(req);
  return res.status(200).json(user);
});

// delete user
export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  await userService.deleteUser(req);
  res.status(200).json({
    code: 200,
    message: "User deleted successfully",
  });
});

// update user
export const updateUser = catchAsync(async (req: Request, res: Response) => {
  if (req.body.email) {
    if (await userService.getUserByEmail(req.body.email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email already exists");
    }
  }
  await userService.updateUser(req);
  res.status(200).json({
    code: 200,
    message: "User updated successfully",
  });
});

// create user
export const createUser = catchAsync(async (req: Request, res: Response) => {
  if (await userService.getUserByEmail(req.body.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already exists");
  }
  await userService.createUser(req);
  res.json({
    code: 200,
    message: "User created successfully",
  });
});

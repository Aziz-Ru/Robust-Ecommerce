import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import * as AuthService from "./auth.service";
//login
export const login = catchAsync(async (req: Request, res: Response) => {
  const token = await AuthService.login(req);
  const maxAge = 2 * 24 * 60 * 60 * 1000;
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: maxAge,
  });
  res.status(200).json({
    code: 200,
    message: "User successfully login",
  });
});
//register
export const register = catchAsync(async (req: Request, res: Response) => {
  await AuthService.register(req);
  res.status(201).json({
    code: 201,
    message: "User Created Successfully",
  });
});

export const logout = async (req: Request, res: Response) => {
  await AuthService.logout(req.cookies.token);
  res.clearCookie("token").status(200).json({
    code: 200,
    message: "Logout Successfully",
  });
};

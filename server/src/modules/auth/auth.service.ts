import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { Request } from "express";
import status from "http-status";
import jwt from "jsonwebtoken";
import env from "../../config/env";
import db from "../../db";
import { users } from "../../db/schema";
import ApiError from "../../utils/ApiError";
import { createUser, getUserByEmail } from "../user/user.service";

//login
export const login = async (req: Request) => {
  const { email, password } = req.body;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    throw new ApiError(status.BAD_REQUEST, "Invalid User");
  }

  const checkPassword = await bcrypt.compare(password, existingUser.password);
  if (!checkPassword) {
    throw new ApiError(status.BAD_REQUEST, "Invalid User");
  }
  await db
    .update(users)
    .set({
      lastSignedInAt: new Date(),
    })
    .where(eq(users.id, existingUser.id));

  const token = jwt.sign(
    {
      uid: existingUser.id,
      date: new Date(),
    },
    env.JWT_SECRET_KEY
  );

  return token;
};
//register
export const register = async (req: Request) => {
  const existingUser = await getUserByEmail(req.body.email);

  if (existingUser) {
    throw new ApiError(status.BAD_REQUEST, "This Email Already Exist");
  }
  await createUser(req);
};

//logout
export const logout = async (token: string) => {
  const payload: any = await jwt.verify(token, env.JWT_SECRET_KEY);
  await db
    .update(users)
    .set({
      lastSignedInAt: new Date(),
    })
    .where(eq(users.id, payload.uid));
};

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { Request } from "express";
import { v4 as uuid } from "uuid";
import db from "../../db";
import { users, userView } from "../../db/schema";
import ApiError from "../../utils/ApiError";

export const getUsers = async () => {
  return await db.select().from(userView);
};

export const getUser = async (req: Request) => {
  const userId = req.params.userId;
  const user = await db.select().from(userView).where(eq(userView.id, userId));
  if (!user[0]) {
    throw new ApiError(404, "User not found");
  }
  return user[0];
};

export const updateUser = async (req: Request) => {
  const userId = req.params.userId;
  const body = req.body;
  console.log(body);
  return await db.update(users).set(body).where(eq(users.id, userId));
};

export const deleteUser = async (req: Request) => {
  const userId = req.params.userId;
  return await db.delete(users).where(eq(users.id, userId));
};

export const createUser = async (req: Request) => {
  const body = req.body;
  const uid = uuid();
  const today = new Date();
  const confirmCodeSentAt = today;
  today.setMinutes(today.getMinutes() + 5);
  const salts = await bcrypt.genSalt(12);

  const password = await bcrypt.hash(body.password, salts);
  const randomCode = Math.floor(100000 + Math.random() * 900000);

  await db.insert(users).values({
    id: uid,
    email: body.email,
    password: password,
    emailVerified: false,
    confirmationCode: randomCode.toString(),
    confirmationCodeSentAt: confirmCodeSentAt,
    confirmedAt: today,
    isActivated: true,
    platform: body.platform,
    lastSignedInAt: new Date(),
    deviceId: body.deviceId,
  });
};

export const getUserByEmail = async (email: string) => {
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  return existingUser[0];
};

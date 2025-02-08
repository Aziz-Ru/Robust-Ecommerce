import { z } from "zod";
import { createUserModel } from "./user.schema";

export const createUser = {
  body: createUserModel,
};

export const getUser = {
  params: z.object({
    userId: z.string().uuid(),
  }),
};

export const getUsers = {
  query: z.object({
    name: z.string().optional(),
    sortBy: z.string().optional(),
    limit: z.number().optional(),
    page: z.string().optional(),
  }),
};

export const updateUser = {
  params: z.object({
    userId: z.string().uuid(),
  }),
  body: createUserModel.partial(),
};

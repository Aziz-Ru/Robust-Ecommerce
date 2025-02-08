import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string({
      message: "Name must be a string",
    })
    .min(2)
    .max(50, { message: "Name must be between 3 and 100 characters" }),
  description: z
    .string({
      message: "Description must be a string",
    })
    .min(3)
    .max(255, { message: "Description must be between 3 and 255 characters" })
    .optional(),

  iconUrl: z
    .string({
      message: "Icon URL must be a string",
    })
    .min(3)
    .max(255, { message: "Icon URL must be between 3 and 255 characters" })
    .optional(),
  metaTitle: z
    .string({
      message: "Meta title must be a string",
    })
    .min(3)
    .max(255)
    .optional(),
  metaDescription: z
    .string({
      message: "Meta description must be a string",
    })
    .min(3)
    .optional(),
});

export const createCategoryValidationSchema = {
  body: categorySchema,
};

export const categoryUpdateSchema = {
  body: categorySchema.partial(),
  params: z.object({
    slug: z
      .string({
        message: "Slug must be a string",
      })
      .min(2, { message: "Slug must be at least 2 characters" }),
  }),
};

export const categoryParamsSchema = {
  params: z.object({
    slug: z
      .string({
        message: "Slug must be a string",
      })
      .min(2, { message: "Slug must be at least 2 characters" }),
  }),
};

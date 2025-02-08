import { z } from "zod";

const productSchema = z.object({
  name: z
    .string({
      message: "Name must be a string",
    })
    .min(3)
    .max(255),
  description: z
    .string({
      message: "Description must be a string",
    })
    .min(3),
  price: z
    .number({
      message: "Price must be a number",
    })
    .min(1, { message: "Price must be greater than 0" }),
  salePrice: z
    .number({
      message: "Sale price must be a number",
    })
    .min(1, { message: "Sale price must be greater than 0" }),
  costPrice: z
    .number({
      message: "Cost price must be a number",
    })
    .min(1, { message: "Cost price must be greater than 0" }),

  stockQuantity: z
    .number({
      message: "Stock quantity must be a number",
    })
    .min(1, {
      message: "Stock quantity must be greater than 0",
    }),
  lowStockThershold: z
    .number({
      message: "Low stock thershold must be a number",
    })
    .min(1, {
      message: "Low stock thershold must be greater than 0",
    })
    .default(1),

  sku: z
    .string({
      message: "SKU must be a string",
    })
    .min(3)
    .max(55, { message: "SKU must be between 3 and 55 characters" }),
  manufacturer: z
    .string({
      message: "Manufacturer must be a string",
    })
    .min(2)
    .max(255, { message: "Manufacturer must be between 3 and 255 characters" }),
  barcode: z
    .string({
      message: "Barcode must be a string",
    })
    .min(3)
    .max(255, { message: "Barcode must be between 3 and 255 characters" })
    .optional(),
  weight: z
    .number({
      message: "Weight must be a number",
    })
    .min(1, { message: "Weight must be greater than 0 gm" })
    .optional(),
  color: z
    .string({
      message: "Color must be a string",
    })
    .min(3)
    .max(100, { message: "Color must be between 3 and 100 characters" })
    .optional(),
  dimension: z
    .string({
      message: "Dimension must be a string",
    })
    .min(3)
    .max(100, { message: "Dimension must be between 3 and 100 characters" })
    .optional(),
  isActive: z
    .boolean({
      message: "isActive must be a boolean",
    })
    .default(true),
  isFeatured: z
    .boolean({
      message: "isFeatured must be a boolean",
    })
    .default(false),
  isBackOrderAllowed: z
    .boolean({
      message: "isBackOrderAllowed must be a boolean",
    })
    .default(false),
  isFreeShipping: z
    .boolean({
      message: "isFreeShipping must be a boolean",
    })
    .default(false),
  tags: z
    .string({
      message: "Tags must be a string",
    })
    .min(3)
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
  category: z
    .array(
      z.object({
        name: z
          .string({
            message: "Category name must be a string",
          })
          .min(3)
          .max(255),
      }),
      { message: "Category must be an array of objects" }
    )
    .min(1, { message: "At least one category is required" }),
  images: z
    .array(
      z.object({
        imageUrl: z
          .string({
            message: "imageUrl must be a string",
          })
          .url({ message: "imageUrl must be a valid url" }),
        altText: z
          .string({
            message: "Alt text must be a string",
          })
          .optional(),
      }),
      { message: "imageUrl must be an array of objects" }
    )
    .min(1, { message: "At least one image is required" }),
});

export const createProductValidationSchema = {
  body: productSchema,
};

export const productUpdateSchema = {
  body: productSchema.partial(),
  params: z.object({
    id: z.string({
      message: "Id must be a string",
    }),
  }),
};

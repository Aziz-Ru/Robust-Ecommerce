import { eq } from "drizzle-orm";
import { Request } from "express";
import db from "../../db";
import {
  categoryProductTable,
  categoryTable,
  productImageTable,
  productTable,
} from "../../db/schema";

export const getCategories = async (req: Request) => {
  return await db
    .select({
      slug: categoryTable.slug,
      name: categoryTable.name,
      iconUrl: categoryTable.iconUrl,
      metaTitle: categoryTable.metaTitle,
    })
    .from(categoryTable);
};

export const getCategoryByName = async (slug: string) => {
  const existingCategory = await db
    .select()
    .from(categoryProductTable)
    .where(eq(categoryProductTable.categoryId, slug))
    .innerJoin(
      productTable,
      eq(categoryProductTable.productId, productTable.id)
    )
    .innerJoin(
      categoryTable,
      eq(categoryProductTable.categoryId, categoryTable.slug)
    )
    .innerJoin(
      productImageTable,
      eq(productTable.id, productImageTable.productId)
    );
  const filterData = existingCategory.reduce(
    (acc: any, item) => {
      const category = item.category;
      const product: any = item.products;
      product["image"] = item.product_images;
      acc.products.push(product);
      acc.category = category;
      return acc;
    },
    { products: [] }
  );
  return filterData;
};

export const createCategory = async (req: Request) => {
  const { name, description, iconUrl, metaTitle, metaDescription } = req.body;
  const slug = name.toLowerCase().replace(/ /g, "-");
  await db.insert(categoryTable).values({
    slug,
    name,
    description,
    iconUrl,
    metaTitle,
    metaDescription,
  });
  return;
};

export const updateCategory = async (req: Request) => {
  const { name, description, iconUrl, metaTitle, metaDescription } = req.body;

  await db
    .update(categoryTable)
    .set({
      name,
      description,
      iconUrl,
      metaTitle,
      metaDescription,
    })
    .where(eq(categoryTable.slug, req.params.slug));
  return;
};

export const deleteCategory = async (slug: string) => {
  await db.delete(categoryTable).where(eq(categoryTable.slug, slug));
  return;
};

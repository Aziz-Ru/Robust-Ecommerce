import { and, eq } from "drizzle-orm";
import { Request } from "express";
import db from "../../db";
import {
  categoryProductTable,
  productImageTable,
  productTable,
} from "../../db/schema";
import { getPriceRange, getSortOrder } from "./utils";

export const queryProductsForCustomer = async (req: Request) => {
  const sort = getSortOrder(req.query.sort as string);
  const whereClause = req.query.price
    ? getPriceRange(req.query.price as string)
    : undefined;

  const currentPage = req.query.page ? parseInt(req.query.page as string) : 1;

  const all_products = await db.query.productTable.findMany({
    columns: {
      id: true,
      name: true,
      price: true,
      salePrice: true,
      stockQuantity: true,
      avgRating: true,
    },
    where: whereClause,
    orderBy: sort,
    offset: (currentPage - 1) * 10,
    limit: 10,
    with: {
      images: true,
      reviews: true,
    },
  });

  return all_products;
};

export const queryProductByIdForCustomer = async (id: string) => {
  const product = await db.query.productTable.findFirst({
    where: and(eq(productTable.id, id), eq(productTable.isActive, true)),
    columns: {
      id: true,
      name: true,
      price: true,
      salePrice: true,
      stockQuantity: true,
      avgRating: true,
      sku: true,
      manufacturer: true,
      barcode: true,
      weight: true,
      color: true,
      dimension: true,
      metaTitle: true,
      metaDescription: true,
      tags: true,
      totalViews: true,
    },
    with: {
      images: true,
      reviews: true,
    },
  });
  return product;
};

export const createProduct = async (req: Request) => {
  await db.transaction(async (tx) => {
    const product = await tx
      .insert(productTable)
      .values({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        salePrice: req.body.salePrice,
        costPrice: req.body.costPrice,
        stockQuantity: req.body.stockQuantity,
        lowStockThershold: req.body.lowStockThershold,
        sku: req.body.sku,
        manufacturer: req.body.manufacturer,
        barcode: req.body.barcode,
        weight: req.body.weight,
        color: req.body.color,
        dimension: req.body.dimension,
        isActive: req.body.isActive,
        isFeatured: req.body.isFeatured,
        isBackOrderAllowed: req.body.isBackOrderAllowed,
        isFreeShipping: req.body.isFreeShipping,
        tags: req.body.tags,
        metaTitle: req.body.metaTitle,
        metaDescription: req.body.metaDescription,
      })
      .returning({
        id: productTable.id,
      });
    for (const image of req.body.images) {
      await tx.insert(productImageTable).values({
        productId: product[0].id,
        imageUrl: image.imageUrl,
        altText: image.altText,
      });
    }

    for (const category of req.body.category) {
      await tx.insert(categoryProductTable).values({
        categoryId: category.name,
        productId: product[0].id,
      });
    }
  });

  return;
};

export const updateProduct = async (req: Request) => {
  await db
    .update(productTable)
    .set({
      name: req.body.name,

      description: req.body.description,
      price: req.body.price,
      salePrice: req.body.salePrice,
      costPrice: req.body.costPrice,
      stockQuantity: req.body.stockQuantity,
      lowStockThershold: req.body.lowStockThershold,
      sku: req.body.sku,
      manufacturer: req.body.manufacturer,
      barcode: req.body.barcode,
      weight: req.body.weight,
      color: req.body.color,
      dimension: req.body.dimension,
      isActive: req.body.isActive,
      isFeatured: req.body.isFeatured,
      isBackOrderAllowed: req.body.isBackOrderAllowed,
      isFreeShipping: req.body.isFreeShipping,
      tags: req.body.tags,
      metaTitle: req.body.metaTitle,
      metaDescription: req.body.metaDescription,
    })
    .where(eq(productTable.id, req.params.productId));
  return;
};

export const deleteProduct = async (id: string) => {
  await db.delete(productTable).where(eq(productTable.id, id));
  return;
};

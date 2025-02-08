import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import * as ProductService from "./product.service";

export const getProducts = catchAsync(async (req: Request, res: Response) => {
  const products = await ProductService.queryProductsForCustomer(req);
  return res.status(200).json(products);
});

export const getProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await ProductService.queryProductByIdForCustomer(
    req.params.productId
  );
  return res.status(200).json({ data: product });
});

export const createProduct = catchAsync(async (req: Request, res: Response) => {
  await ProductService.createProduct(req);
  return res.status(201).json({
    code: 201,
    message: "Product created successfully",
  });
});

export const updateProduct = catchAsync(async (req: Request, res: Response) => {
  await ProductService.updateProduct(req);
  return res.status(200).json({
    code: 200,
    message: "Product updated successfully",
  });
});

export const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  await ProductService.deleteProduct(req.params.productId);
  return res.status(204).json({
    code: 204,
    message: "Product deleted successfully",
  });
});

import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import * as CategoryService from "./category.service";
export const getAllCategory = catchAsync(
  async (req: Request, res: Response) => {
    return res.status(200).json({
      data: await CategoryService.getCategories(req),
    });
  }
);

export const getCategory = catchAsync(async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ data: await CategoryService.getCategoryByName(req.params.slug) });
});

export const createCategory = catchAsync(
  async (req: Request, res: Response) => {
    await CategoryService.createCategory(req);
    return res.status(200).json({
      code: 201,
      message: "Category created successfully",
    });
  }
);

export const updateCategory = catchAsync(
  async (req: Request, res: Response) => {
    await CategoryService.updateCategory(req);
    return res.status(200).json({
      code: 200,
      message: "Category updated successfully",
    });
  }
);

export const deleteCategory = catchAsync(
  async (req: Request, res: Response) => {
    await CategoryService.deleteCategory(req.params.slug);
    return res.status(200).json({
      code: 200,
      message: "Category deleted successfully",
    });
  }
);

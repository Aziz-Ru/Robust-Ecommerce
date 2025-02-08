import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { queryColumns, queryTables } from "./admin.service";

export const getAllTable = catchAsync(async (req: Request, res: Response) => {
  return res.status(200).json({ tables: await queryTables() });
});

export const getTable = catchAsync(async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ columns: await queryColumns(req.params.table) });
});

export const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  return res.status(200).json({ data: [] });
});

export const getAdmin = catchAsync(async (req: Request, res: Response) => {
  return res.status(200).json({ data: [] });
});

export const createAdmin = catchAsync(async (req: Request, res: Response) => {
  return res.status(201).json({
    code: 201,
    message: "Admin created successfully",
  });
});

export const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  return res.status(200).json({
    code: 200,
    message: "Admin updated successfully",
  });
});

export const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  return res.status(200).json({
    code: 200,
    message: "Admin deleted successfully",
  });
});

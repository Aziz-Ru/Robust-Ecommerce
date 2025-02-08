import { Router } from "express";
import validate from "../../middlewares/validate";
import * as CategoryController from "./category.controller";
import {
  categoryParamsSchema,
  categoryUpdateSchema,
  createCategoryValidationSchema,
} from "./category.validation";
const route = Router();

route
  .route("/")
  .get(CategoryController.getAllCategory)
  .post(
    validate(createCategoryValidationSchema),
    CategoryController.createCategory
  );

route
  .route("/:slug")
  .get(validate(categoryParamsSchema), CategoryController.getCategory)
  .put(validate(categoryUpdateSchema), CategoryController.updateCategory)
  .delete(validate(categoryParamsSchema), CategoryController.deleteCategory);

export default route;

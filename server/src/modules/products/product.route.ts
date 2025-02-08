import { Router } from "express";
import validate from "../../middlewares/validate";
import * as ProductController from "./product.controller";
import { createProductValidationSchema } from "./product.validation";
const router = Router();

router
  .route("/")
  .get(ProductController.getProducts)
  .post(
    validate(createProductValidationSchema),
    ProductController.createProduct
  );

router
  .route("/:productId")
  .get(ProductController.getProduct)
  .put(ProductController.updateProduct)
  .delete(ProductController.deleteProduct);

export default router;

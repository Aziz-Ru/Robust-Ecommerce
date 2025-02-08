import { Request, Response, Router } from "express";
import adminRoute from "./modules/admin/admin.route";
import authRoute from "./modules/auth/auth.route";
import categoryRoute from "./modules/category/category.route";
import productRoute from "./modules/products/product.route";
import userRoute from "./modules/user/user.route";

const router = Router();

const routes = [
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/products",
    route: productRoute,
  },
  {
    path: "/categories",
    route: categoryRoute,
  },
  {
    path: "/admin",
    route: adminRoute,
  },
];
router.get("/", (req: Request, res: Response) => {
  res.send("it works");
});

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

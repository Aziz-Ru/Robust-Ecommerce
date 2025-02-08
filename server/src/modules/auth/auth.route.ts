import { Router } from "express";
import validate from "../../middlewares/validate";
import { createUser } from "../user/user.validation";
import * as AuthController from "./auth.controller";
const router = Router();

router.post("/login", AuthController.login);
router.post("/register", validate(createUser), AuthController.register);
router.post("/logout", AuthController.logout);

export default router;

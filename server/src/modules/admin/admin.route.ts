import { Router } from "express";
import { getAllTable, getTable } from "./admin.controller";

const router = Router();

router.route("/table").get(getAllTable);
router.route("/table/:table").get(getTable);

export default router;

import express from "express";
import { checkAdminOrNot, postAdmin } from "../controllers/adminController";

const router = express.Router();

router.get("/", checkAdminOrNot);
router.post("/addAdmin", postAdmin);

export default router;

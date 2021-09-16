import express from "express";
import {
  addSingleService,
  deleteSingleService,
  getAllServices,
  getSingleService,
} from "../controllers/servicesController";

const router = express.Router();

router.get("/all", getAllServices);
router.get("/singleService/:id", getSingleService);
router.post("/addService", addSingleService);
router.delete("/deleteService/:id", deleteSingleService);

export default router;

import express from "express";
import { addSingleReview, getAllReview } from "../controllers/reviewController";

const router = express.Router();
router.get("/reviews", getAllReview);
router.post("/addReview", addSingleReview);

export default router;

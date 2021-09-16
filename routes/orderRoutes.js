import express from "express";
import {
  addSingleOrder,
  getAllOrder,
  getOrdersByEmail,
  updateOrderForAdmin,
} from "../controllers/orderController";

const router = express.Router();

router.get("/allOrders", getAllOrder);
router.get("/orders", getOrdersByEmail);
router.post("/addOrder", addSingleOrder);
router.put("/updateOrder/:id", updateOrderForAdmin);

export default router;

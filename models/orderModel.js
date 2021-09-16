import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  paymentId: { type: String, required: true },
  service: { type: {}, required: true },
  user: { type: {}, required: true },
  status: {
    type: String,
    required: true,
    enum: ["done", "working", "pending"],
  },
  created: { type: Date, default: new Date() },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;

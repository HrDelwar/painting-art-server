import mongoose from "mongoose";

const serviceSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  charge: { type: String, required: true },
  photo: { type: String, required: true },
});

const Service = mongoose.model("Service", serviceSchema);

export default Service;

import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  email: { type: String, required: true },
  created: { type: Date, default: new Date() },
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;

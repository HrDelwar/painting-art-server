import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  displayName: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String, required: true },
  rating: { type: String, required: true },
  photoURL: { type: String, required: true },
  created: { type: Date, default: new Date() },
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;

import models from "../models";
const { Review } = models;

//add single review
export const addSingleReview = async (req, res) => {
  try {
    const newReview = new Review(req.body);
    const review = await newReview.save();
    if (review) {
      res.status(200).send(true);
    } else {
      res.status(500).send(false);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// get all review
export const getAllReview = async (req, res) => {
  try {
    const reviews = await Review.find();
    if (reviews) {
      res.status(200).send(reviews);
    } else {
      res.status(404).send([]);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

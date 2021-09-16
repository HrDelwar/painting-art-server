import { isAdminOrNot } from "../helperFunction";
import models from "../models";

const { Order } = models;

//add single order
export const addSingleOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const order = await newOrder.save();
    if (order) {
      res.status(200).send(true);
    } else {
      res.status(404).send(false);
    }
  } catch (err) {
    res.status(501).send(err.message);
  }
};

//get all order
export const getAllOrder = async (req, res) => {
  try {
    const status = await isAdminOrNot(req.headers.email);
    if (status) {
      try {
        const orders = await Order.find();
        if (orders) {
          res.status(200).send(orders);
        } else {
          res.status(404).send([]);
        }
      } catch (err) {
        res.status(501).send(err.message);
      }
    } else {
      res.send({ message: "unAuthorized" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// get orders by email
export const getOrdersByEmail = async (req, res) => {
  if (!req.headers.email) {
    res.send("pass email with headers property name 'email'");
  }
  try {
    const orders = await Order.find({ "user.email": req.headers.email });
    if (orders) {
      res.status(200).send(orders);
    } else {
      res.status(404).send([]);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// update order for admin
export const updateOrderForAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const email = req.headers.email;
    const statusInfo = req.headers.status;
    const status = await isAdminOrNot(email);
    if (status) {
      try {
        const orders = await Order.updateOne(
          { _id: id },
          { status: statusInfo }
        );

        if (orders.modifiedCount > 0) {
          res.status(200).send(true);
        } else {
          res.status(404).send(false);
        }
      } catch (err) {
        res.status(500).send(err.message);
      }
    } else {
      res.send({ message: "unAuthorized" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

import { isAdminOrNot } from "../helperFunction";
import models from "../models";

const { Admin } = models;

// check is admin or not
export const checkAdminOrNot = async (req, res) => {
  const email = req.headers.email;
  try {
    const admin = await Admin.findOne({ email });
    if (admin) {
      res.status(200).send(true);
    } else {
      res.status(404).send(false);
    }
  } catch (err) {
    res.status(501).send(false);
  }
};


// post a admin
export const postAdmin = async (req, res) => {
  const data = req.body;
  try {
    const status = await isAdminOrNot(req.headers.user);
    if (status) {
      try {
        const newAdmin = new Admin(data);
        const admin = await newAdmin.save();
        res.send({ status: 200, admin });
      } catch (err) {
        res.send({ statue: false, message: err.message });
      }
    } else {
      res.send({ message: "unAuthorized" });
    }
  } catch (err) {
    res.send({ err });
  }
};

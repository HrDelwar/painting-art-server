import { isAdminOrNot } from "../helperFunction";
import models from "../models";

const { Service } = models;

// add a service
export const addSingleService = async (req, res) => {
  try {
    const status = await isAdminOrNot(req.headers.user);
    if (status) {
      try {
        const newService = new Service(req.body);
        const service = await newService.save();
        res.send({ status: 200, service });
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

// get all services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    if (services) {
      return res.status(200).send(services);
    } else {
      console.log({ services });
    }
  } catch (err) {
    res.status(501).send(err.message);
  }
};

//get single service
export const getSingleService = async (req, res) => {
  try {
    const id = req.params.id;
    const service = await Service.findById(id);
    if (service) {
      res.status(200).send(service);
    } else {
      res.status(404).send({});
    }
  } catch (err) {
    res.status(501).send(err.message);
  }
};

// delete single service
export const deleteSingleService = async (req, res) => {
  try {
    const status = await isAdminOrNot(req.headers.email);
    if (status) {
      try {
        const service = await Service.deleteOne({ _id: req.params.id });
        res.status(200).send(service.deletedCount>0);
      } catch (err) {
        res.send(err.message);
      }
    } else {
      res.status(403).send({ message: "unAuthorized" });
    }
  } catch (err) {
    res.status(501).send(err.message);
  }
};

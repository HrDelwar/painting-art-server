import express from "express";
import cors from "cors";
import dbConnection from "./dbConnection";
import dotenv from "dotenv";
import routes from "./routes";

//create express app
const app = express();

// linting port
const port = process.env.PORT || 8000;

// app configure
app.use(express.json());
app.use(cors());
dotenv.config();

// mongoDB connection with mongoose
dbConnection();

// handle routes
app.use("/admin", routes.adminRoutes);
app.use("/service", routes.servicesRoutes);
app.use("/order", routes.orderRoutes);
app.use("/review", routes.reviewRoutes);

// root response api
app.get("/", (req, res) => {
  res.status(200).send("Well to server");
});

// run server
app.listen(port, () => {
  console.log("listening port " + port);
});

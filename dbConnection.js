import mongoose from "mongoose";

const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const dbConnection = () => {
  mongoose
    .connect(process.env.MONGODB_URI, option)
    .then(() => {
      console.log("Yap! DB Connect successfully!");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default dbConnection;

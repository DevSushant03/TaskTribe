import mongoose from "mongoose";
const connectDb = async () => {
  mongoose.connection.on("connected", () => console.log("DATABASE CONNECTED"));
  await mongoose.connect(`${process.env.MONGODB_URI}/tasktribe`);
};
export default connectDb;
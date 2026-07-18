import mongoose from "mongoose";
import dns from 'node:dns/promises';
dns.setServers(['1.1.1.1', '8.8.8.8']);

const connectDb = async () => {
  mongoose.connection.on("connected", () => console.log("DATABASE CONNECTED"));
  await mongoose.connect(`${process.env.MONGODB_URI}/tasktribe`);
};
export default connectDb;
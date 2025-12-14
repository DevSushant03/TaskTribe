import { app, server } from "./src/app.js";
import dotenv from "dotenv";
import connectDb from "./src/config/db.js";
dotenv.config();
connectDb();
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server + Socket.IO running on ${PORT}`);
});
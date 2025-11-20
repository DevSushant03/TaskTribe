import app from "./src/app.js";
import dotenv from "dotenv";
import connectDb from "./src/config/db.js";
dotenv.config();
connectDb();
app.listen(process.env.PORT||3000, () => {
  console.log(`Server listening on port ${PORT}`);
});
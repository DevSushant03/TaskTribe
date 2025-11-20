//index.js
import { Router } from "express";
import authRoutes from "./routes/auth_routes.js";
import userRoutes from "./routes/user_routes.js";

const router = Router();

router.use("/", authRoutes);
router.use("/user", userRoutes);

export default router;

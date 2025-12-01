//index.js
import { Router } from "express";
import authRoutes from "./routes/auth_routes.js";
import userRoutes from "./routes/user_routes.js";
import taskRoutes from "./routes/task_routes.js";
import bankRoutes from "./routes/bank_routes.js";
const router = Router();

router.use("/", authRoutes);
router.use("/user", userRoutes);
router.use("/task", taskRoutes);
router.use("/bank", bankRoutes);

export default router;

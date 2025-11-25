//index.js
import { Router } from "express";
import authRoutes from "./routes/auth_routes.js";
import userRoutes from "./routes/user_routes.js";
import taskRoutes from "./routes/task_routes.js";
const router = Router();

router.use("/", authRoutes);
router.use("/user", userRoutes);
router.use("/task", taskRoutes);

export default router;

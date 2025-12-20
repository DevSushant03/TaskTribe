//index.js
import { Router } from "express";
import authRoutes from "./routes/auth_routes.js";
import userRoutes from "./routes/user_routes.js";
import taskRoutes from "./routes/task_routes.js";
import bankRoutes from "./routes/bank_routes.js";
import chatsRoutes from "./routes/chats_routes.js";
import notificationRoutes from "./routes/notification_routes.js";
const router = Router();

router.use("/", authRoutes);
router.use("/user", userRoutes);
router.use("/task", taskRoutes);
router.use("/chats", chatsRoutes);
router.use("/bank", bankRoutes);
router.use("/notification", notificationRoutes);

export default router;

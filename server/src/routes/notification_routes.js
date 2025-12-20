import { Router } from "express";
import { 
  getAllNotification, 
  markNotificationAsRead,
  markAllNotificationsAsRead 
} from "../controller/notify_controller.js";
import { verifyAuth } from "../middleware/auth.js";
const router = Router();

router.get("/getAllNotification", verifyAuth, getAllNotification);
router.post("/markAsRead/:notificationId", verifyAuth, markNotificationAsRead);
router.post("/markAllAsRead", verifyAuth, markAllNotificationsAsRead);

export default router;
import { Router } from "express";
import { verifyAuth } from "../middleware/auth.js";
import {
  getMessages,
  getUserForSideBar,
  markMessageAsSeen,
  sendMessage,
} from "../controller/chats_controller.js";

const router = Router();

router.get("/getAllUsers", verifyAuth, getUserForSideBar);
router.get("/getMessage/:id", verifyAuth, getMessages);
router.post("/markMessageSeen/:id", verifyAuth, markMessageAsSeen);
router.post("/sendMessage/:chatRoomId", verifyAuth, sendMessage);

export default router;

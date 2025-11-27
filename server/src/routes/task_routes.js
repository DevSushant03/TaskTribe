import { Router } from "express";
import upload from "../middleware/multer.js";
import { verifyAuth } from "../middleware/auth.js";
import {
  createTask,
  getAllTasks,
  getTaskById,
  deleteTask,
  applyForTask,
  getMyTask,
  rejectApplicant,
  acceptApplicant,
} from "../controller/task_controller.js";
const router = Router();

router.post("/createTask", verifyAuth, upload.array("files"), createTask);
router.get("/getAllTask",verifyAuth, getAllTasks);
router.get("/getTask/:taskId", verifyAuth, getTaskById);
router.get("/deleteTask/:taskId", verifyAuth, deleteTask);
router.post("/apply/:taskId", verifyAuth, applyForTask);
router.get("/myTask", verifyAuth, getMyTask);
router.post("/rejectApplicant/:applicantId", verifyAuth, rejectApplicant);
router.post("/acceptApplicant/:applicantId", verifyAuth, acceptApplicant);

export default router;

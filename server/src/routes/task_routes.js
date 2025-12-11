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
  getAssignedTask,
  submitWork,
  markAsComplete,
} from "../controller/task_controller.js";
const router = Router();

router.post("/createTask", verifyAuth, upload.array("files"), createTask);
router.get("/getAllTask", verifyAuth, getAllTasks);
router.get("/getTask/:taskId", verifyAuth, getTaskById);
router.get("/deleteTask/:taskId", verifyAuth, deleteTask);
router.post("/apply/:taskId", verifyAuth, applyForTask);
router.get("/myTask", verifyAuth, getMyTask);
router.get("/assignedToMe", verifyAuth, getAssignedTask);
router.post(
  "/:TaskId/rejectApplicant/:applicantId",
  verifyAuth,
  rejectApplicant
);
router.post(
  "/:TaskId/acceptApplicant/:applicantId",
  verifyAuth,
  acceptApplicant
);
router.post(
  "/:TaskId/submitWork",
  verifyAuth,
  upload.array("workFiles"),
  submitWork
);
router.post("/markAsComplete/:taskId", verifyAuth, markAsComplete);

export default router;

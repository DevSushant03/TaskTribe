import { Router } from "express";
import { getUserData, setUserData } from "../controller/user_controller.js";
import { verifyAuth } from "../middleware/auth.js";
import upload from "../middleware/multer.js";
const router = Router();

router.get("/getuser/:id",verifyAuth, getUserData);
// router.put("/updateUserData/:id",verifyAuth, updateUserData);
router.post("/setUserData",upload.single("photo"),verifyAuth, setUserData);


export default router;

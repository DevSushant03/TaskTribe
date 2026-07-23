import { Router } from "express";
import { getUserData, setUserData, editProfile, editProfilePic } from "../controller/user_controller.js";
import { verifyAuth } from "../middleware/auth.js";
import upload from "../middleware/multer.js";
const router = Router();

router.get("/getuser",verifyAuth, getUserData);
router.post("/setUserData",upload.single("photo"),verifyAuth, setUserData);
router.put("/editProfile/",verifyAuth, editProfile);
router.post("/changeProfilePic/:id",upload.single("photo"),verifyAuth, editProfilePic);


export default router;

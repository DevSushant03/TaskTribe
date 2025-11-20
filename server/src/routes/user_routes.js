import { Router } from "express";
import { getUserData, setUserData } from "../controller/user_controller.js";
import { verifyAuth } from "../middleware/auth.js";
const router = Router();

router.get("/getuser/:id",verifyAuth, getUserData);
// router.put("/updateUserData/:id",verifyAuth, updateUserData);
router.post("/setUserData",verifyAuth, setUserData);


export default router;

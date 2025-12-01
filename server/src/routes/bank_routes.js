import { Router } from "express";
import { verifyAuth } from "../middleware/auth.js";
import { addBankDetails } from "../controller/bank_controller.js";

const router = Router();

router.post("/addDetails", verifyAuth, addBankDetails);

export default router;

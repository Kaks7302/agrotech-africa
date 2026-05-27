import express from "express";
import { getMyInvestments } from "../controllers/investmentController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/my", protect, getMyInvestments);

export default router;
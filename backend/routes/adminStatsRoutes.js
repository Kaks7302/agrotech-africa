import express from "express";
import { getAdminStats } from "../controllers/adminStatsController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, adminOnly, getAdminStats);

export default router;
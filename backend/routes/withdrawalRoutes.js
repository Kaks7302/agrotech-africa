import express from "express";

import {
  createWithdrawal,
  getMyWithdrawals,
  getAllWithdrawals,
  approveWithdrawal,
  rejectWithdrawal,
} from "../controllers/withdrawalController.js";

import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createWithdrawal);

router.get("/my", protect, getMyWithdrawals);

router.get("/admin/all", protect, adminOnly, getAllWithdrawals);

router.put("/admin/approve/:id", protect, adminOnly, approveWithdrawal);

router.put("/admin/reject/:id", protect, adminOnly, rejectWithdrawal);

export default router;
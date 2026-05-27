import express from "express";

import {
  createDeposit,
  getMyDeposits,
  getAllDeposits,
  approveDeposit,
  rejectDeposit,
} from "../controllers/depositController.js";

import { protect, adminOnly } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", protect, upload.single("screenshot"), createDeposit);

router.get("/my", protect, getMyDeposits);

router.get("/admin/all", protect, adminOnly, getAllDeposits);

router.put("/admin/approve/:id", protect, adminOnly, approveDeposit);

router.put("/admin/reject/:id", protect, adminOnly, rejectDeposit);

export default router;
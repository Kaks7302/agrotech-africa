import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cron from "node-cron";
import fs from "fs";

import authRoutes from "./routes/authRoutes.js";
import depositRoutes from "./routes/depositRoutes.js";
import investmentRoutes from "./routes/investmentRoutes.js";
import withdrawalRoutes from "./routes/withdrawalRoutes.js";
import adminStatsRoutes from "./routes/adminStatsRoutes.js";

import { processDailyEarnings } from "./utils/earningsEngine.js";

dotenv.config();

const app = express();

app.set("trust proxy", 1);

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests. Try again later.",
  })
);

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Agrotech Africa Backend Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/deposits", depositRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/withdrawals", withdrawalRoutes);
app.use("/api/admin-stats", adminStatsRoutes);

cron.schedule("0 0 * * *", () => {
  processDailyEarnings();
});

app.get("/api/cron/earnings", async (req, res) => {
  try {
    const secret = req.query.secret;

    if (secret !== process.env.CRON_SECRET) {
      return res.status(401).json({
        message: "Unauthorized cron request",
      });
    }

    await processDailyEarnings();

    res.json({
      message: "Daily earnings processed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Daily earnings failed",
      error: error.message,
    });
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log(error);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Agrotech backend running");
});
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/authRoutes.js";
import depositRoutes from "./routes/depositRoutes.js";
import investmentRoutes from "./routes/investmentRoutes.js";
import withdrawalRoutes from "./routes/withdrawalRoutes.js";
import adminStatsRoutes from "./routes/adminStatsRoutes.js";

dotenv.config();

const app = express();

app.set("trust proxy", 1);

app.use(express.json());

app.use("/uploads", express.static("uploads"));

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

app.use("/api/auth", authRoutes);
app.use("/api/deposits", depositRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/withdrawals", withdrawalRoutes);
app.use("/api/admin-stats", adminStatsRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Agrotech backend running`);
});
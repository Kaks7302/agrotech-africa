import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    deposit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deposit",
      required: true,
    },

    packageName: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    dailyProfit: {
      type: Number,
      required: true,
    },

    duration: {
      type: Number,
      default: 365,
    },

    daysPaid: {
      type: Number,
      default: 0,
    },

    totalEarned: {
      type: Number,
      default: 0,
    },

    lastPaidAt: {
      type: Date,
      default: null,
    },

    startDate: {
      type: Date,
      default: Date.now,
    },

    endDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Investment", investmentSchema);
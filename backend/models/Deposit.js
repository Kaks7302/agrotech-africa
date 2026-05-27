import mongoose from "mongoose";

const depositSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

    paymentMethod: {
      type: String,
      default: "E-mola",
    },

    paymentReference: {
      type: String,
      required: true,
    },

    screenshot: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Deposit", depositSchema);
import Investment from "../models/Investment.js";
import User from "../models/User.js";

export const processDailyEarnings = async () => {
  try {
    const investments = await Investment.find({
      status: "active",
    });

    const now = new Date();

    for (const investment of investments) {
      if (investment.daysPaid >= investment.duration) {
        investment.status = "completed";
        await investment.save();
        continue;
      }

      let shouldPay = false;

      if (!investment.lastPaidAt) {
        const startDate = new Date(investment.startDate || investment.createdAt);
        const hoursSinceStart =
          (now.getTime() - startDate.getTime()) / (1000 * 60 * 60);

        if (hoursSinceStart >= 24) {
          shouldPay = true;
        }
      } else {
        const lastPaid = new Date(investment.lastPaidAt);
        const hoursSinceLastPaid =
          (now.getTime() - lastPaid.getTime()) / (1000 * 60 * 60);

        if (hoursSinceLastPaid >= 24) {
          shouldPay = true;
        }
      }

      if (!shouldPay) {
        continue;
      }

      await User.findByIdAndUpdate(investment.user, {
        $inc: {
          profitBalance: investment.dailyProfit,
          balance: investment.dailyProfit,
        },
      });

      investment.daysPaid += 1;
      investment.totalEarned += investment.dailyProfit;
      investment.lastPaidAt = now;

      if (investment.daysPaid >= investment.duration) {
        investment.status = "completed";
      }

      await investment.save();
    }

    console.log("Daily earnings processed successfully");
  } catch (error) {
    console.log("Daily earnings processing failed:", error.message);
  }
};
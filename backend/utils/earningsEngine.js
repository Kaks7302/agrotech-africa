import Investment from "../models/Investment.js";
import User from "../models/User.js";

export const processDailyEarnings = async () => {
  try {
    const investments = await Investment.find({
      status: "active",
    });

    const now = new Date();

    for (const investment of investments) {
      const lastPaid = investment.lastPaidAt;

      const shouldPay =
        !lastPaid ||
        now.getTime() - new Date(lastPaid).getTime() >= 24 * 60 * 60 * 1000;

      if (!shouldPay) {
        continue;
      }

      if (investment.daysPaid >= investment.duration) {
        investment.status = "completed";
        await investment.save();
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
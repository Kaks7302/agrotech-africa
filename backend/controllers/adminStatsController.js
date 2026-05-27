import User from "../models/User.js";
import Deposit from "../models/Deposit.js";
import Withdrawal from "../models/Withdrawal.js";
import Investment from "../models/Investment.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalDeposits = await Deposit.aggregate([
      { $match: { status: "approved" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const pendingDeposits = await Deposit.countDocuments({
      status: "pending",
    });

    const totalWithdrawals = await Withdrawal.aggregate([
      { $match: { status: "approved" } },
      { $group: { _id: null, total: { $sum: "$receiveAmount" } } },
    ]);

    const pendingWithdrawals = await Withdrawal.countDocuments({
      status: "pending",
    });

    const activeInvestments = await Investment.countDocuments({
      status: "active",
    });

    const totalProfitPaid = await Investment.aggregate([
      { $group: { _id: null, total: { $sum: "$totalEarned" } } },
    ]);

    res.json({
      totalUsers,
      totalDeposits: totalDeposits[0]?.total || 0,
      pendingDeposits,
      totalWithdrawals: totalWithdrawals[0]?.total || 0,
      pendingWithdrawals,
      activeInvestments,
      totalProfitPaid: totalProfitPaid[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch admin stats",
      error: error.message,
    });
  }
};
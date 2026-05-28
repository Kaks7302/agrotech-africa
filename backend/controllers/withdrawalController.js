import Withdrawal from "../models/Withdrawal.js";
import User from "../models/User.js";
import sendTelegramMessage from "../utils/sendTelegramMessage.js";

export const createWithdrawal = async (req, res) => {
  try {
    const { amount, phone } = req.body;

    const withdrawAmount = Number(amount);

    if (!withdrawAmount || !phone) {
      return res.status(400).json({
        message: "Amount and phone number are required",
      });
    }

    if (withdrawAmount < 100) {
      return res.status(400).json({
        message: "Minimum withdrawal is 100 MT",
      });
    }

    const user = await User.findById(req.user._id);

    if (user.profitBalance < withdrawAmount) {
      return res.status(400).json({
        message: "Insufficient profit balance",
      });
    }

    const fee = withdrawAmount * 0.1;
    const receiveAmount = withdrawAmount - fee;

    user.profitBalance -= withdrawAmount;
    user.balance -= withdrawAmount;

    await user.save();

    const withdrawal = await Withdrawal.create({
      user: user._id,
      amount: withdrawAmount,
      fee,
      receiveAmount,
      phone,
    });

    await sendTelegramMessage(`
💸 New Withdrawal Request

👤 User: ${user.username}
📞 Account Phone: ${user.phone}
📲 Payout Number: ${phone}

💰 Requested: ${withdrawAmount} MT
🧾 Fee: ${fee} MT
✅ User Receives: ${receiveAmount} MT

⏳ Status: Pending Approval
`);

    res.status(201).json({
      message: "Withdrawal request submitted successfully",
      withdrawal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Withdrawal request failed",
      error: error.message,
    });
  }
};

export const getMyWithdrawals = async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(withdrawals);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch withdrawals",
      error: error.message,
    });
  }
};

export const getAllWithdrawals = async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find()
      .populate("user", "username phone")
      .sort({ createdAt: -1 });

    res.json(withdrawals);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch all withdrawals",
      error: error.message,
    });
  }
};

export const approveWithdrawal = async (req, res) => {
  try {
    const withdrawal = await Withdrawal.findById(req.params.id);

    if (!withdrawal) {
      return res.status(404).json({
        message: "Withdrawal not found",
      });
    }

    withdrawal.status = "approved";
    await withdrawal.save();

    res.json({
      message: "Withdrawal approved successfully",
      withdrawal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to approve withdrawal",
      error: error.message,
    });
  }
};

export const rejectWithdrawal = async (req, res) => {
  try {
    const withdrawal = await Withdrawal.findById(req.params.id);

    if (!withdrawal) {
      return res.status(404).json({
        message: "Withdrawal not found",
      });
    }

    if (withdrawal.status === "rejected") {
      return res.status(400).json({
        message: "Withdrawal already rejected",
      });
    }

    const user = await User.findById(withdrawal.user);

    if (withdrawal.status === "pending") {
      user.profitBalance += withdrawal.amount;
      user.balance += withdrawal.amount;
      await user.save();
    }

    withdrawal.status = "rejected";
    await withdrawal.save();

    res.json({
      message: "Withdrawal rejected and balance returned",
      withdrawal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to reject withdrawal",
      error: error.message,
    });
  }
};
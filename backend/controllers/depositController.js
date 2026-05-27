import Deposit from "../models/Deposit.js";
import User from "../models/User.js";
import Investment from "../models/Investment.js";

export const createDeposit = async (req, res) => {
  try {
    const {
      packageName,
      amount,
      dailyProfit,
      duration,
      paymentReference,
    } = req.body;

    if (!packageName || !amount || !dailyProfit || !paymentReference) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Payment screenshot is required",
      });
    }

    const deposit = await Deposit.create({
      user: req.user._id,
      packageName,
      amount: Number(amount),
      dailyProfit: Number(dailyProfit),
      duration: Number(duration) || 365,
      paymentReference,
      screenshot: req.file.filename,
    });

    res.status(201).json({
      message:
        "Payment proof submitted successfully. Waiting for admin approval.",
      deposit,
    });
  } catch (error) {
    res.status(500).json({
      message: "Deposit submission failed",
      error: error.message,
    });
  }
};

export const getMyDeposits = async (req, res) => {
  try {
    const deposits = await Deposit.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(deposits);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch deposits",
      error: error.message,
    });
  }
};

export const getAllDeposits = async (req, res) => {
  try {
    const deposits = await Deposit.find()
      .populate("user", "username phone referredBy")
      .sort({ createdAt: -1 });

    res.json(deposits);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch all deposits",
      error: error.message,
    });
  }
};

export const approveDeposit = async (req, res) => {
  try {
    const deposit = await Deposit.findById(req.params.id);

    if (!deposit) {
      return res.status(404).json({
        message: "Deposit not found",
      });
    }

    if (deposit.status === "approved") {
      return res.status(400).json({
        message: "Deposit already approved",
      });
    }

    deposit.status = "approved";
    await deposit.save();

    const buyer = await User.findById(deposit.user);

    await User.findByIdAndUpdate(deposit.user, {
      $inc: {
        balance: deposit.amount,
      },
    });

    if (buyer?.referredBy) {
      const referrer = await User.findOne({
        referralCode: buyer.referredBy,
      });

      if (referrer) {
        const referralBonus = deposit.amount * 0.1;

        referrer.balance += referralBonus;
        referrer.profitBalance += referralBonus;

        await referrer.save();
      }
    }

    const existingInvestment = await Investment.findOne({
      deposit: deposit._id,
    });

    if (!existingInvestment) {
      const startDate = new Date();

      const endDate = new Date();
      endDate.setDate(endDate.getDate() + deposit.duration);

      await Investment.create({
        user: deposit.user,
        deposit: deposit._id,
        packageName: deposit.packageName,
        amount: deposit.amount,
        dailyProfit: deposit.dailyProfit,
        duration: deposit.duration,
        startDate,
        endDate,
      });
    }

    res.json({
      message: "Deposit approved, investment activated, referral checked",
      deposit,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to approve deposit",
      error: error.message,
    });
  }
};

export const rejectDeposit = async (req, res) => {
  try {
    const deposit = await Deposit.findById(req.params.id);

    if (!deposit) {
      return res.status(404).json({
        message: "Deposit not found",
      });
    }

    deposit.status = "rejected";
    await deposit.save();

    res.json({
      message: "Deposit rejected",
      deposit,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to reject deposit",
      error: error.message,
    });
  }
};
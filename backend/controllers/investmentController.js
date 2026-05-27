import Investment from "../models/Investment.js";

export const getMyInvestments = async (req, res) => {
  try {
    const investments = await Investment.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(investments);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch investments",
      error: error.message,
    });
  }
};
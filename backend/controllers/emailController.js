import VerificationCode from "../models/VerificationCode.js";
import sendEmail from "../utils/sendEmail.js";

const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendVerificationCode = async (req, res) => {
  try {
    const { email, purpose } = req.body;

    if (!email || !purpose) {
      return res.status(400).json({
        message: "Email and purpose are required",
      });
    }

    const code = generateCode();

    await VerificationCode.deleteMany({
      email,
      purpose,
    });

    await VerificationCode.create({
      email,
      purpose,
      code,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    await sendEmail({
      to: email,
      subject: "Agrotech Africa Verification Code",
      message: `Your Agrotech Africa verification code is: ${code}. This code expires in 10 minutes.`,
    });

    res.json({
      message: "Verification code sent to email",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to send verification code",
      error: error.message,
    });
  }
};

export const verifyCode = async (req, res) => {
  try {
    const { email, code, purpose } = req.body;

    const record = await VerificationCode.findOne({
      email,
      code,
      purpose,
      expiresAt: { $gt: new Date() },
    });

    if (!record) {
      return res.status(400).json({
        message: "Invalid or expired verification code",
      });
    }

    res.json({
      message: "Email verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Verification failed",
      error: error.message,
    });
  }
};
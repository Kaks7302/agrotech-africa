import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import sendTelegramMessage from "../utils/sendTelegramMessage.js";

const generateReferralCode = (username) => {
  const cleanName = username.replace(/\s+/g, "").toUpperCase().slice(0, 4);
  const randomNumber = Math.floor(10000 + Math.random() * 90000);

  return `AGRO-${cleanName}-${randomNumber}`;
};

export const registerUser = async (req, res) => {
  try {
    const { username, email, phone, password, referredBy } = req.body;

    if (!username || !email || !phone || !password) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    if (!phone.startsWith("258")) {
      return res.status(400).json({
        message: "Mozambique number must start with 258",
      });
    }

    const existingPhone = await User.findOne({ phone });

    if (existingPhone) {
      return res.status(400).json({
        message: "Phone number already registered",
      });
    }

    const existingEmail = await User.findOne({ email: email.toLowerCase() });

    if (existingEmail) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword,
      referralCode: generateReferralCode(username),
      referredBy: referredBy || "",
    });

    await sendTelegramMessage(`
🎉 New User Registered

👤 Name: ${user.username}
📧 Email: ${user.email}
📞 Phone: ${user.phone}

👥 Referral Code: ${user.referralCode}

🟢 New member joined Agrotech Africa
`);

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.status(201).json({
      message: "Account created successfully",

      token,

      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        balance: user.balance,
        profitBalance: user.profitBalance,
        referralCode: user.referralCode,
        referredBy: user.referredBy,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(401).json({
        message: "Invalid phone number or password",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid phone number or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.json({
      message: "Login successful",

      token,

      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        balance: user.balance,
        profitBalance: user.profitBalance,
        referralCode: user.referralCode,
        referredBy: user.referredBy,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

export const getMe = async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        phone: req.user.phone,
        balance: req.user.balance,
        profitBalance: req.user.profitBalance,
        referralCode: req.user.referralCode,
        referredBy: req.user.referredBy,
        isAdmin: req.user.isAdmin,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};
import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },

      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text: message,
    });

    console.log("Email sent to:", to);
  } catch (error) {
    console.log("Email sending failed:", error.message);
    throw new Error("Email could not be sent");
  }
};

export default sendEmail;
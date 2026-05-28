import axios from "axios";

const sendTelegramMessage = async (message) => {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    await axios.post(url, {
      chat_id: chatId,
      text: message,
    });

  } catch (error) {
    console.log("Telegram notification failed:", error.message);
  }
};

export default sendTelegramMessage;
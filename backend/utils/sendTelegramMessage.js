import axios from "axios";

const sendTelegramMessage = async (message) => {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.log("Telegram token or chat ID missing");
      return;
    }

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const res = await axios.post(url, {
      chat_id: chatId,
      text: message,
    });

    console.log("Telegram message sent:", res.data.ok);
  } catch (error) {
    console.log("Telegram notification failed:");
    console.log(error.response?.data || error.message);
  }
};

export default sendTelegramMessage;
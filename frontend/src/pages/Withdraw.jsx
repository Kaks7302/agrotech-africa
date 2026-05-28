import React, { useState } from "react";
import API from "../services/api";
import BottomNav from "../components/BottomNav";
import WhatsAppButton from "../components/WhatsAppButton";
import Toast from "../components/Toast";
import { t } from "../i18n";
import "./withdraw.css";

function Withdraw() {
  const user = JSON.parse(localStorage.getItem("agrotech_user"));

  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState(user?.phone || "");
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const fee = amount ? Number(amount) * 0.1 : 0;
  const receiveAmount = amount ? Number(amount) - fee : 0;

  const submitWithdrawal = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/withdrawals", {
        amount,
        phone,
      });

      setToast({
        message: res.data.message,
        type: "success",
      });

      setAmount("");
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Withdrawal failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="withdraw-page">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />

      <div className="withdraw-card">
        <h1>{t("withdrawFunds")}</h1>

        <p className="withdraw-note">{t("minimumWithdrawNote")}</p>

        <form onSubmit={submitWithdrawal}>
          <input
            type="number"
            placeholder={t("amountToWithdraw")}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <input
            type="text"
            placeholder={t("emolaPhone")}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <div className="withdraw-summary">
            <p>
              {t("fee")}: {fee} MT
            </p>

            <p>
              {t("youReceive")}: {receiveAmount} MT
            </p>
          </div>

          <button disabled={loading}>
            {loading ? "..." : t("submitWithdrawal")}
          </button>
        </form>

        <button
          className="back-btn"
          onClick={() => (window.location.href = "/dashboard")}
        >
          {t("backToDashboard")}
        </button>
      </div>

      <WhatsAppButton />
      <BottomNav />
    </div>
  );
}

export default Withdraw;
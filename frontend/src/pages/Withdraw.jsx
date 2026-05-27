import React, { useState } from "react";
import API from "../services/api";
import BottomNav from "../components/BottomNav";
import "./withdraw.css";

function Withdraw() {
  const user = JSON.parse(localStorage.getItem("agrotech_user"));

  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState(user?.phone || "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fee = amount ? Number(amount) * 0.1 : 0;
  const receiveAmount = amount ? Number(amount) - fee : 0;

  const submitWithdrawal = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const res = await API.post("/withdrawals", {
        amount,
        phone,
      });

      setMessage(res.data.message);

      setAmount("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Withdrawal failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="withdraw-page">
      <div className="withdraw-card">
        <h1>Withdraw Funds</h1>

        <p className="withdraw-note">
          Minimum withdrawal is 100 MT. A 10% fee is deducted.
        </p>

        {message && <div className="withdraw-message">{message}</div>}

        <form onSubmit={submitWithdrawal}>
          <input
            type="number"
            placeholder="Amount to withdraw"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <input
            type="text"
            placeholder="E-mola phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <div className="withdraw-summary">
            <p>Fee: {fee} MT</p>
            <p>You Receive: {receiveAmount} MT</p>
          </div>

          <button disabled={loading}>
            {loading ? "Submitting..." : "Submit Withdrawal"}
          </button>
        </form>

        <button
          className="back-btn"
          onClick={() => (window.location.href = "/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>

      <BottomNav />
    </div>
  );
}

export default Withdraw;
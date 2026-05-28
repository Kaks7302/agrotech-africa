import React, { useEffect, useState } from "react";
import API from "../services/api";
import BottomNav from "../components/BottomNav";
import "./myWithdrawals.css";
import WhatsAppButton from "../components/WhatsAppButton";

function MyWithdrawals() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [message, setMessage] = useState("");

  const fetchWithdrawals = async () => {
    try {
      const res = await API.get("/withdrawals/my");
      setWithdrawals(res.data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to load withdrawals");
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  return (
    <div className="my-withdraw-page">
      <div className="my-withdraw-topbar">
        <h1>My Withdrawals</h1>

        <button onClick={() => (window.location.href = "/dashboard")}>
          Dashboard
        </button>
      </div>

      {message && <div className="my-withdraw-message">{message}</div>}

      {withdrawals.length === 0 ? (
        <div className="my-withdraw-empty">
          <h2>No withdrawals yet</h2>
          <p>Your withdrawal requests will appear here.</p>
        </div>
      ) : (
        <div className="my-withdraw-grid">
          {withdrawals.map((item) => (
            <div className="my-withdraw-card" key={item._id}>
              <h2>{item.amount} MT</h2>

              <p>
                <strong>Fee:</strong> {item.fee} MT
              </p>

              <p>
                <strong>You Receive:</strong> {item.receiveAmount} MT
              </p>

              <p>
                <strong>E-mola Number:</strong> {item.phone}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className={`withdraw-status ${item.status}`}>
                  {item.status}
                </span>
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      <BottomNav />
      <WhatsAppButton />
    </div>
  );
}

export default MyWithdrawals;
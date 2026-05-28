import React, { useEffect, useState } from "react";
import API from "../services/api";
import BottomNav from "../components/BottomNav";
import "./investments.css";
import WhatsAppButton from "../components/WhatsAppButton";

function MyInvestments() {
  const [investments, setInvestments] = useState([]);
  const [message, setMessage] = useState("");

  const fetchInvestments = async () => {
    try {
      const res = await API.get("/investments/my");
      setInvestments(res.data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to load investments");
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  return (
    <div className="invest-page">
      <div className="invest-topbar">
        <h1>My Investments</h1>

        <button onClick={() => (window.location.href = "/dashboard")}>
          Dashboard
        </button>
      </div>

      {message && <div className="invest-message">{message}</div>}

      {investments.length === 0 ? (
        <div className="empty-box">
          <h2>No active investments yet</h2>
          <p>Buy a package and wait for admin approval.</p>
        </div>
      ) : (
        <div className="invest-grid">
          {investments.map((item) => (
            <div className="invest-card" key={item._id}>
              <h2>{item.packageName}</h2>

              <p>
                <strong>Investment:</strong> {item.amount} MT
              </p>

              <p>
                <strong>Daily Profit:</strong> {item.dailyProfit} MT
              </p>

              <p>
                <strong>Days Paid:</strong> {item.daysPaid} / {item.duration}
              </p>

              <p>
                <strong>Total Earned:</strong> {item.totalEarned} MT
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className={`invest-status ${item.status}`}>
                  {item.status}
                </span>
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

export default MyInvestments;
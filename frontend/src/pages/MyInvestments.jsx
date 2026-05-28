import React, { useEffect, useState } from "react";
import API from "../services/api";
import BottomNav from "../components/BottomNav";
import { t } from "../i18n";
import "./investments.css";

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
        <h1>{t("myInvestments")}</h1>

        <button onClick={() => (window.location.href = "/dashboard")}>
          {t("dashboard")}
        </button>
      </div>

      {message && <div className="invest-message">{message}</div>}

      {investments.length === 0 ? (
        <div className="empty-box">
          <h2>{t("noActiveInvestments")}</h2>
          <p>{t("buyPackageApproval")}</p>
        </div>
      ) : (
        <div className="invest-grid">
          {investments.map((item) => (
            <div className="invest-card" key={item._id}>
              <h2>{item.packageName}</h2>

              <p>
                <strong>{t("investment")}:</strong> {item.amount} MT
              </p>

              <p>
                <strong>{t("dailyProfit")}:</strong> {item.dailyProfit} MT
              </p>

              <p>
                <strong>{t("daysPaid")}:</strong> {item.daysPaid} /{" "}
                {item.duration}
              </p>

              <p>
                <strong>{t("totalEarned")}:</strong> {item.totalEarned} MT
              </p>

              <p>
                <strong>{t("status")}:</strong>{" "}
                <span className={`invest-status ${item.status}`}>
                  {item.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}

      <BottomNav />
    </div>
  );
}

export default MyInvestments;
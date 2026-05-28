import React, { useEffect, useState } from "react";
import API from "../services/api";
import BottomNav from "../components/BottomNav";
import { t } from "../i18n";
import "./myWithdrawals.css";

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
        <h1>{t("myWithdrawals")}</h1>

        <button onClick={() => (window.location.href = "/dashboard")}>
          {t("dashboard")}
        </button>
      </div>

      {message && <div className="my-withdraw-message">{message}</div>}

      {withdrawals.length === 0 ? (
        <div className="my-withdraw-empty">
          <h2>{t("noWithdrawalsYet")}</h2>
          <p>{t("withdrawalRequestsAppear")}</p>
        </div>
      ) : (
        <div className="my-withdraw-grid">
          {withdrawals.map((item) => (
            <div className="my-withdraw-card" key={item._id}>
              <h2>
                {t("amount")}: {item.amount} MT
              </h2>

              <p>
                <strong>{t("fee")}:</strong> {item.fee} MT
              </p>

              <p>
                <strong>{t("receiveAmount")}:</strong> {item.receiveAmount} MT
              </p>

              <p>
                <strong>{t("emolaPhone")}:</strong> {item.phone}
              </p>

              <p>
                <strong>{t("status")}:</strong>{" "}
                <span className={`withdraw-status ${item.status}`}>
                  {item.status}
                </span>
              </p>

              <p>
                <strong>{t("date")}:</strong>{" "}
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      <BottomNav />
    </div>
  );
}

export default MyWithdrawals;
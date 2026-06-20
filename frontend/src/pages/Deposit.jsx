import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";
import Toast from "../components/Toast";
import { t } from "../i18n";
import "./deposit.css";

function Deposit() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedPackage = location.state;

  const [paymentReference, setPaymentReference] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!screenshot) {
      setToast({
        message: t("uploadScreenshot"),
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("packageName", selectedPackage.name);
      formData.append("amount", selectedPackage.amountNumber);
      formData.append("dailyProfit", selectedPackage.dailyNumber);
      formData.append("duration", 365);
      formData.append("paymentReference", paymentReference);
      formData.append("screenshot", screenshot);

      const res = await API.post("/deposits", formData);

      setToast({
        message: res.data.message,
        type: "success",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2500);
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Deposit submission failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!selectedPackage) {
    return (
      <div className="deposit-page">
        <div className="deposit-card">
          <h1>{t("noPackageSelected")}</h1>

          <button onClick={() => navigate("/dashboard")}>
            {t("backToDashboard")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="deposit-page">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />

      <div className="deposit-card">
        <h1>{t("completePayment")}</h1>

        <div className="package-box">
          <h2>{selectedPackage?.name}</h2>
          <h3>{selectedPackage?.amount}</h3>
          <p>{t("dailyProfit")}: {selectedPackage?.daily}</p>
        </div>

        <div className="payment-info">
          <h3>{t("paymentDetails")}</h3>

          <p>
            <strong>{t("emolaNumber")}:</strong> 874008679
          </p>

          <p>
            <strong>{t("accountHolder")}:</strong> Angelina Fernando
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={t("paymentReference")}
            value={paymentReference}
            onChange={(e) => setPaymentReference(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setScreenshot(e.target.files[0])}
          />

          <button disabled={loading}>
            {loading ? "..." : t("submitPayment")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Deposit;
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";
import Toast from "../components/Toast";
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
        message: "Please upload payment screenshot",
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
          <h1>No Package Selected</h1>

          <button onClick={() => navigate("/dashboard")}>
            Back to Dashboard
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
        <h1>Complete Payment</h1>

        <div className="package-box">
          <h2>{selectedPackage?.name}</h2>

          <h3>{selectedPackage?.amount}</h3>

          <p>Daily Profit: {selectedPackage?.daily}</p>
        </div>

        <div className="payment-info">
          <h3>E-mola Payment Details</h3>

          <p>
            <strong>Number:</strong> 866150334
          </p>

          <p>
            <strong>Account Holder:</strong> Momed Uqueio
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Payment Reference"
            value={paymentReference}
            onChange={(e) => setPaymentReference(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setScreenshot(e.target.files[0])}
          />

          <button disabled={loading}>
            {loading ? "Submitting..." : "Submit Payment"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Deposit;
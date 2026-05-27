import React, { useEffect, useState } from "react";
import API from "../services/api";
import Toast from "../components/Toast";
import "./adminWithdrawals.css";

function AdminWithdrawals() {
  const [withdrawals, setWithdrawals] = useState([]);

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const fetchWithdrawals = async () => {
    try {
      const res = await API.get("/withdrawals/admin/all");
      setWithdrawals(res.data);
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Failed to load withdrawals",
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const approveWithdrawal = async (id) => {
    try {
      const res = await API.put(`/withdrawals/admin/approve/${id}`);

      setToast({
        message: res.data.message,
        type: "success",
      });

      fetchWithdrawals();
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Approval failed",
        type: "error",
      });
    }
  };

  const rejectWithdrawal = async (id) => {
    try {
      const res = await API.put(`/withdrawals/admin/reject/${id}`);

      setToast({
        message: res.data.message,
        type: "success",
      });

      fetchWithdrawals();
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Reject failed",
        type: "error",
      });
    }
  };

  return (
    <div className="admin-withdraw-page">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />

      <div className="admin-withdraw-topbar">
        <h1>Admin Withdrawals</h1>

        <button onClick={() => (window.location.href = "/admin")}>
          Deposits Admin
        </button>
      </div>

      {withdrawals.length === 0 ? (
        <div className="admin-withdraw-empty">
          <h2>No withdrawal requests yet</h2>
          <p>User withdrawal requests will appear here.</p>
        </div>
      ) : (
        <div className="admin-withdraw-grid">
          {withdrawals.map((item) => (
            <div className="admin-withdraw-card" key={item._id}>
              <h2>{item.amount} MT</h2>

              <p>
                <strong>User:</strong> {item.user?.username}
              </p>

              <p>
                <strong>User Phone:</strong> {item.user?.phone}
              </p>

              <p>
                <strong>Payout Number:</strong> {item.phone}
              </p>

              <p>
                <strong>Fee:</strong> {item.fee} MT
              </p>

              <p>
                <strong>User Receives:</strong> {item.receiveAmount} MT
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className={`admin-withdraw-status ${item.status}`}>
                  {item.status}
                </span>
              </p>

              {item.status === "pending" && (
                <div className="admin-withdraw-actions">
                  <button onClick={() => approveWithdrawal(item._id)}>
                    Approve
                  </button>

                  <button
                    className="reject"
                    onClick={() => rejectWithdrawal(item._id)}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminWithdrawals;
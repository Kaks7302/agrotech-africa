import React, { useEffect, useState } from "react";
import API from "../services/api";
import Toast from "../components/Toast";
import "./admin.css";

function AdminDashboard() {
  const [deposits, setDeposits] = useState([]);
  const [stats, setStats] = useState(null);

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const fetchStats = async () => {
    try {
      const res = await API.get("/admin-stats");
      setStats(res.data);
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Failed to load admin stats",
        type: "error",
      });
    }
  };

  const fetchDeposits = async () => {
    try {
      const res = await API.get("/deposits/admin/all");
      setDeposits(res.data);
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Failed to load deposits",
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchStats();
    fetchDeposits();
  }, []);

  const approveDeposit = async (id) => {
    try {
      const res = await API.put(`/deposits/admin/approve/${id}`);

      setToast({
        message: res.data.message,
        type: "success",
      });

      fetchStats();
      fetchDeposits();
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Approval failed",
        type: "error",
      });
    }
  };

  const rejectDeposit = async (id) => {
    try {
      const res = await API.put(`/deposits/admin/reject/${id}`);

      setToast({
        message: res.data.message,
        type: "success",
      });

      fetchStats();
      fetchDeposits();
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Reject failed",
        type: "error",
      });
    }
  };

  return (
    <div className="admin-page">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />

      <div className="admin-topbar">
        <h1>Admin Dashboard</h1>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <h3>Total Users</h3>
          <h2>{stats?.totalUsers || 0}</h2>
        </div>

        <div className="admin-stat-card">
          <h3>Total Deposits</h3>
          <h2>{stats?.totalDeposits || 0} MT</h2>
        </div>

        <div className="admin-stat-card">
          <h3>Pending Deposits</h3>
          <h2>{stats?.pendingDeposits || 0}</h2>
        </div>

        <div className="admin-stat-card">
          <h3>Total Withdrawals</h3>
          <h2>{stats?.totalWithdrawals || 0} MT</h2>
        </div>

        <div className="admin-stat-card">
          <h3>Pending Withdrawals</h3>
          <h2>{stats?.pendingWithdrawals || 0}</h2>
        </div>

        <div className="admin-stat-card">
          <h3>Active Investments</h3>
          <h2>{stats?.activeInvestments || 0}</h2>
        </div>

        <div className="admin-stat-card">
          <h3>Total Profit Paid</h3>
          <h2>{stats?.totalProfitPaid || 0} MT</h2>
        </div>
      </div>

      <button
        className="admin-switch-btn"
        onClick={() => (window.location.href = "/admin-withdrawals")}
      >
        Manage Withdrawals
      </button>

      <h2>Payment Proofs</h2>

      <div className="admin-grid">
        {deposits.map((item) => (
          <div className="admin-card" key={item._id}>
            <h3>{item.packageName}</h3>

            <p>
              <strong>User:</strong> {item.user?.username}
            </p>

            <p>
              <strong>Phone:</strong> {item.user?.phone}
            </p>

            <p>
              <strong>Amount:</strong> {item.amount} MT
            </p>

            <p>
              <strong>Daily Profit:</strong> {item.dailyProfit} MT
            </p>

            <p>
              <strong>Reference:</strong> {item.paymentReference}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span className={`status ${item.status}`}>{item.status}</span>
            </p>

            <a
              href={`http://localhost:5000/uploads/${item.screenshot}`}
              target="_blank"
              rel="noreferrer"
            >
              View Screenshot
            </a>

            {item.status === "pending" && (
              <div className="admin-actions">
                <button onClick={() => approveDeposit(item._id)}>
                  Approve
                </button>

                <button
                  className="reject"
                  onClick={() => rejectDeposit(item._id)}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
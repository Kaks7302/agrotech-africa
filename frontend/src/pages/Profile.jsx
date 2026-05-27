import React, { useEffect, useState } from "react";
import API from "../services/api";
import BottomNav from "../components/BottomNav";
import WhatsAppButton from "../components/WhatsAppButton";
import Toast from "../components/Toast";
import "./profile.css";

function Profile() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("agrotech_user"))
  );

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const fetchUser = async () => {
    try {
      const res = await API.get("/auth/me");

      setUser(res.data.user);

      localStorage.setItem("agrotech_user", JSON.stringify(res.data.user));
    } catch (error) {
      setToast({
        message: "Failed to load profile",
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const copyReferral = () => {
    navigator.clipboard.writeText(user?.referralCode || "");

    setToast({
      message: "Referral code copied",
      type: "success",
    });
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="profile-page">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />

      <div className="profile-topbar">
        <h1>My Profile</h1>

        <button onClick={() => (window.location.href = "/dashboard")}>
          Dashboard
        </button>
      </div>

      <div className="profile-card main-profile">
        <div className="avatar">{user?.username?.charAt(0) || "A"}</div>

        <h2>{user?.username}</h2>

        <p>{user?.phone}</p>
      </div>

      <div className="profile-grid">
        <div className="profile-card">
          <h3>Total Balance</h3>
          <h2>{user?.balance || 0} MT</h2>
        </div>

        <div className="profile-card">
          <h3>Profit Balance</h3>
          <h2>{user?.profitBalance || 0} MT</h2>
        </div>
      </div>

      <div className="profile-card">
        <h3>Referral Code</h3>

        <div className="profile-referral">{user?.referralCode}</div>

        <button onClick={copyReferral}>Copy Referral Code</button>
      </div>

      <div className="profile-card">
        <h3>Referred By</h3>

        <p>{user?.referredBy || "No upline"}</p>
      </div>

      <div className="profile-card">
        <h3>Support</h3>

        <p>Need help with deposits, withdrawals, or your account?</p>

        <a
          href="https://wa.me/258866150334"
          target="_blank"
          rel="noreferrer"
          className="profile-support"
        >
          Contact WhatsApp Support
        </a>
      </div>

      <button className="profile-logout" onClick={logout}>
        Logout
      </button>

      <WhatsAppButton />
      <BottomNav />
    </div>
  );
}

export default Profile;
import React, { useEffect, useState } from "react";
import API from "../services/api";
import BottomNav from "../components/BottomNav";
import WhatsAppButton from "../components/WhatsAppButton";
import Toast from "../components/Toast";
import "./referrals.css";

function Referrals() {
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
        message: "Failed to load referral data",
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const referralCode = user?.referralCode || "";

  const inviteMessage = `Join Agrotech Africa and start investing today. Use my referral code: ${referralCode}`;

  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(inviteMessage)}`;

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);

    setToast({
      message: "Referral code copied successfully",
      type: "success",
    });
  };

  return (
    <div className="referral-page">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />

      <div className="referral-topbar">
        <h1>Referrals</h1>

        <button onClick={() => (window.location.href = "/dashboard")}>
          Dashboard
        </button>
      </div>

      <div className="referral-card">
        <h2>Your Referral Code</h2>

        <div className="referral-code">{referralCode}</div>

        <button onClick={copyCode}>Copy Code</button>
      </div>

      <div className="referral-card">
        <h2>How It Works</h2>

        <p>Invite friends using your referral code.</p>

        <p>
          When they buy a package and admin approves their deposit, you earn 10%
          commission.
        </p>

        <p>Your referral bonus goes directly into your profit balance.</p>
      </div>

      <div className="referral-card">
        <h2>Your Upline</h2>

        <p>
          {user?.referredBy
            ? user.referredBy
            : "You were not referred by anyone."}
        </p>
      </div>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        className="share-btn"
      >
        Share on WhatsApp
      </a>

      <WhatsAppButton />
      <BottomNav />
    </div>
  );
}

export default Referrals;
import React, { useEffect, useState } from "react";
import API from "../services/api";
import BottomNav from "../components/BottomNav";
import WhatsAppButton from "../components/WhatsAppButton";
import Toast from "../components/Toast";
import { t } from "../i18n";
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
    } catch {
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
      message: t("copied"),
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
        <h1>{t("profile")}</h1>

        <button onClick={() => (window.location.href = "/dashboard")}>
          {t("dashboard")}
        </button>
      </div>

      <div className="profile-card main-profile">
        <div className="avatar">{user?.username?.charAt(0) || "A"}</div>

        <h2>{user?.username}</h2>

        <p>{user?.phone}</p>
      </div>

      <div className="profile-grid">
        <div className="profile-card">
          <h3>{t("totalBalance")}</h3>
          <h2>{user?.balance || 0} MT</h2>
        </div>

        <div className="profile-card">
          <h3>{t("profitBalance")}</h3>
          <h2>{user?.profitBalance || 0} MT</h2>
        </div>
      </div>

      <div className="profile-card">
        <h3>{t("referralCode")}</h3>

        <div className="profile-referral">{user?.referralCode}</div>

        <button onClick={copyReferral}>{t("copyReferralCode")}</button>
      </div>

      <div className="profile-card">
        <h3>Upline</h3>

        <p>{user?.referredBy || "N/A"}</p>
      </div>

      <div className="profile-card">
        <h3>{t("support")}</h3>

        <p>{t("contactSupport")}</p>

        <a
          href="https://wa.me/258866150334"
          target="_blank"
          rel="noreferrer"
          className="profile-support"
        >
          WhatsApp
        </a>
      </div>

      <button className="profile-logout" onClick={logout}>
        {t("logout")}
      </button>

      <WhatsAppButton />
      <BottomNav />
    </div>
  );
}

export default Profile;
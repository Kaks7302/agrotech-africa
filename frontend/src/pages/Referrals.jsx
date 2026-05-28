import React, { useEffect, useState } from "react";
import API from "../services/api";
import BottomNav from "../components/BottomNav";
import WhatsAppButton from "../components/WhatsAppButton";
import Toast from "../components/Toast";
import { t } from "../i18n";
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
    } catch {
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

  const inviteMessage =
    `${t("register")} Agrotech Africa. ${t("referralCode")}: ${referralCode}`;

  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(
    inviteMessage
  )}`;

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);

    setToast({
      message: t("copied"),
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
        <h1>{t("referrals")}</h1>

        <button onClick={() => (window.location.href = "/dashboard")}>
          {t("dashboard")}
        </button>
      </div>

      <div className="referral-card">
        <h2>{t("yourReferralCode")}</h2>

        <div className="referral-code">{referralCode}</div>

        <button onClick={copyCode}>{t("copyCode")}</button>
      </div>

      <div className="referral-card">
        <h2>{t("referralProgram")}</h2>

        <p>{t("inviteEarn")}</p>

        <p>10% {t("bonusEarned")}</p>
      </div>

      <div className="referral-card">
        <h2>Upline</h2>

        <p>{user?.referredBy ? user.referredBy : "N/A"}</p>
      </div>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        className="share-btn"
      >
        WhatsApp
      </a>

      <WhatsAppButton />
      <BottomNav />
    </div>
  );
}

export default Referrals;
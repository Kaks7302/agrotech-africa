import React from "react";
import { Link, useLocation } from "react-router-dom";
import { t } from "../i18n";
import "./bottomNav.css";

function BottomNav() {
  const location = useLocation();

  return (
    <div className="bottom-nav">
      <Link
        to="/dashboard"
        className={
          location.pathname === "/dashboard" ? "active" : ""
        }
      >
        <span>🏠</span>
        <p>{t("home")}</p>
      </Link>

      <Link
        to="/investments"
        className={
          location.pathname === "/investments"
            ? "active"
            : ""
        }
      >
        <span>💼</span>
        <p>{t("investments")}</p>
      </Link>

      <Link
        to="/withdraw"
        className={
          location.pathname === "/withdraw"
            ? "active"
            : ""
        }
      >
        <span>💰</span>
        <p>{t("wallet")}</p>
      </Link>

      <Link
        to="/referrals"
        className={
          location.pathname === "/referrals"
            ? "active"
            : ""
        }
      >
        <span>👥</span>
        <p>{t("team")}</p>
      </Link>

      <Link
        to="/profile"
        className={
          location.pathname === "/profile"
            ? "active"
            : ""
        }
      >
        <span>👤</span>
        <p>{t("account")}</p>
      </Link>
    </div>
  );
}

export default BottomNav;
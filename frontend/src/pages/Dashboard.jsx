import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import BottomNav from "../components/BottomNav";
import WhatsAppButton from "../components/WhatsAppButton";
import { t } from "../i18n";
import "./dashboard.css";

import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import p3 from "../assets/p3.jpg";
import p4 from "../assets/p4.jpg";
import p5 from "../assets/p5.jpg";
import p6 from "../assets/p6.jpg";
import p7 from "../assets/p7.jpg";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("agrotech_user"))
  );

  const fetchUser = async () => {
    try {
      const res = await API.get("/auth/me");
      setUser(res.data.user);
      localStorage.setItem("agrotech_user", JSON.stringify(res.data.user));
    } catch (error) {
      console.log(error.response?.data?.message || "Failed to refresh user");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const packages = [
    {
      name: "Digital Starter Package",
      amount: "1,500 MT",
      amountNumber: 1500,
      daily: "75 MT",
      dailyNumber: 75,
      image: p1,
    },
    {
      name: "Tech Harvest Package",
      amount: "3,500 MT",
      amountNumber: 3500,
      daily: "175 MT",
      dailyNumber: 175,
      image: p2,
    },
    {
      name: "Agro Smart Package",
      amount: "6,000 MT",
      amountNumber: 6000,
      daily: "300 MT",
      dailyNumber: 300,
      image: p3,
    },
    {
      name: "Rural Tech Pro Package",
      amount: "10,000 MT",
      amountNumber: 10000,
      daily: "500 MT",
      dailyNumber: 500,
      image: p4,
    },
    {
      name: "Smart Premium Package",
      amount: "15,000 MT",
      amountNumber: 15000,
      daily: "750 MT",
      dailyNumber: 750,
      image: p5,
    },
    {
      name: "Digital Master Package",
      amount: "20,000 MT",
      amountNumber: 20000,
      daily: "1,000 MT",
      dailyNumber: 1000,
      image: p6,
    },
    {
      name: "Future Tech Package",
      amount: "30,000 MT",
      amountNumber: 30000,
      daily: "1,500 MT",
      dailyNumber: 1500,
      image: p7,
    },
  ];

  const buyPackage = (item) => {
    navigate("/deposit", { state: item });
  };

  return (
    <div className="dashboard">
      <div className="topbar">
        <h1>AGROTECH AFRICA</h1>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          {t("logout")}
        </button>
      </div>

      <div className="welcome-card">
        <h2>
          {t("welcome")} {user?.username}
        </h2>

        <p>Technology, Innovation & Financial Growth For A Stronger Future</p>
      </div>

      <div className="balance-grid">
        <div className="balance-card">
          <h3>{t("totalBalance")}</h3>
          <h1>{user?.balance || 0} MT</h1>
        </div>

        <div className="balance-card">
          <h3>{t("profitBalance")}</h3>
          <h1>{user?.profitBalance || 0} MT</h1>
        </div>

        <div className="balance-card">
          <h3>{t("referralCode")}</h3>
          <h2>{user?.referralCode}</h2>
        </div>
      </div>

      <div className="package-section">
        <h2>{t("investmentPlans")}</h2>

        <p className="plan-text">
          {t("duration")}: 365 Days • Estimated Daily Return: Up to 5.00%
        </p>

        <div className="packages">
          {packages.map((item, index) => (
            <div className="card" key={index}>
              <img src={item.image} alt={item.name} className="package-img" />

              <div className="card-body">
                <h3>{item.name}</h3>

                <h1>{item.amount}</h1>

                <p>
                  {t("dailyProfit")}: {item.daily}
                </p>

                <p>{t("duration")}: 365 Days</p>

                <button onClick={() => buyPackage(item)}>
                  {t("buyNow")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <WhatsAppButton />
      <BottomNav />
    </div>
  );
}

export default Dashboard;
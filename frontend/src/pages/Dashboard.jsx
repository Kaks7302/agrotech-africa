import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import BottomNav from "../components/BottomNav";
import WhatsAppButton from "../components/WhatsAppButton";
import "./dashboard.css";

import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import p3 from "../assets/p3.jpg";
import p4 from "../assets/p4.jpg";
import p5 from "../assets/p5.jpg";
import p6 from "../assets/p6.jpg";
import p7 from "../assets/p7.jpg";
import p8 from "../assets/p8.jpg";
import p9 from "../assets/p9.jpg";

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
    { name: "Digital Start Package", amount: "1,300 MT", amountNumber: 1300, daily: "43 MT", dailyNumber: 43, image: p1 },
    { name: "Tech Harvest Package", amount: "3,600 MT", amountNumber: 3600, daily: "120 MT", dailyNumber: 120, image: p2 },
    { name: "Agro Smart Package", amount: "6,600 MT", amountNumber: 6600, daily: "220 MT", dailyNumber: 220, image: p3 },
    { name: "Rural Tech Pro Package", amount: "9,600 MT", amountNumber: 9600, daily: "320 MT", dailyNumber: 320, image: p4 },
    { name: "Smart Premium Package", amount: "12,600 MT", amountNumber: 12600, daily: "420 MT", dailyNumber: 420, image: p5 },
    { name: "Digital Master Package", amount: "15,600 MT", amountNumber: 15600, daily: "520 MT", dailyNumber: 520, image: p6 },
    { name: "Future Tech Package", amount: "18,600 MT", amountNumber: 18600, daily: "620 MT", dailyNumber: 620, image: p7 },
    { name: "Elite Innovation Package", amount: "21,600 MT", amountNumber: 21600, daily: "720 MT", dailyNumber: 720, image: p8 },
    { name: "Mega Vision Package", amount: "25,000 MT", amountNumber: 25000, daily: "833 MT", dailyNumber: 833, image: p9 },
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
          Logout
        </button>
      </div>

      <div className="welcome-card">
        <h2>Welcome {user?.username}</h2>
        <p>Technology, Innovation & Financial Growth For A Stronger Future</p>
      </div>

      <div className="balance-grid">
        <div className="balance-card">
          <h3>Total Balance</h3>
          <h1>{user?.balance || 0} MT</h1>
        </div>

        <div className="balance-card">
          <h3>Profit Balance</h3>
          <h1>{user?.profitBalance || 0} MT</h1>
        </div>

        <div className="balance-card">
          <h3>Referral Code</h3>
          <h2>{user?.referralCode}</h2>
        </div>
      </div>

      <div className="package-section">
        <h2>Investment Plans</h2>
        <p className="plan-text">Duration: 365 Days • Daily Profit: 3.33%</p>

        <div className="packages">
          {packages.map((item, index) => (
            <div className="card" key={index}>
              <img src={item.image} alt={item.name} className="package-img" />

              <div className="card-body">
                <h3>{item.name}</h3>
                <h1>{item.amount}</h1>
                <p>Daily Profit: {item.daily}</p>
                <p>Duration: 365 Days</p>

                <button onClick={() => buyPackage(item)}>Buy Now</button>
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
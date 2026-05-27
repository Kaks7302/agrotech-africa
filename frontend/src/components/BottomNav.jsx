import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./bottomNav.css";

function BottomNav() {
  const location = useLocation();

  const navItems = [
    {
      name: "Home",
      path: "/dashboard",
      icon: "🏠",
    },

    {
      name: "Invest",
      path: "/investments",
      icon: "📈",
    },

    {
      name: "Refer",
      path: "/referrals",
      icon: "🤝",
    },

    {
      name: "Withdraw",
      path: "/withdraw",
      icon: "💸",
    },

    {
      name: "History",
      path: "/my-withdrawals",
      icon: "📋",
    },

    {
      name: "Profile",
      path: "/profile",
      icon: "👤",
    },

    {
      name: "Support",
      path: "https://wa.me/258866150334",
      icon: "💬",
      external: true,
    },
  ];

  return (
    <div className="bottom-nav">
      {navItems.map((item) =>
        item.external ? (
          <a
            key={item.name}
            href={item.path}
            target="_blank"
            rel="noreferrer"
            className="bottom-nav-item"
          >
            <span>{item.icon}</span>
            <small>{item.name}</small>
          </a>
        ) : (
          <Link
            key={item.name}
            to={item.path}
            className={`bottom-nav-item ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            <span>{item.icon}</span>
            <small>{item.name}</small>
          </Link>
        )
      )}
    </div>
  );
}

export default BottomNav;
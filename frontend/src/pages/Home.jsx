import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  const previewPackages = [
    {
      name: "Digital Start",
      price: "1,300 MT",
      daily: "43 MT/day",
    },
    {
      name: "Agro Smart",
      price: "6,600 MT",
      daily: "220 MT/day",
    },
    {
      name: "Mega Vision",
      price: "25,000 MT",
      daily: "833 MT/day",
    },
  ];

  return (
    <div className="landing-page">
      <header className="landing-hero">
        <nav className="landing-nav">
          <h2>AGROTECH AFRICA</h2>

          <div>
            <Link to="/login">Login</Link>
            <Link to="/register" className="nav-btn">
              Register
            </Link>
          </div>
        </nav>

        <div className="hero-content">
          <span>🌱 Technology & Investments</span>

          <h1>Grow Your Future With Agrotech Africa</h1>

          <p>
            A digital investment platform built for Mozambique, combining
            agriculture-inspired growth, technology, referrals, and daily income
            tracking.
          </p>

          <div className="hero-buttons">
            <Link to="/register">Create Account</Link>
            <Link to="/login" className="secondary-btn">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      <section className="landing-stats">
        <div>
          <h2>365</h2>
          <p>Days Duration</p>
        </div>

        <div>
          <h2>3.33%</h2>
          <p>Daily Profit</p>
        </div>

        <div>
          <h2>100 MT</h2>
          <p>Minimum Withdrawal</p>
        </div>

        <div>
          <h2>10%</h2>
          <p>Referral Bonus</p>
        </div>
      </section>

      <section className="how-section">
        <h2>How It Works</h2>

        <div className="how-grid">
          <div>
            <h3>1. Create Account</h3>
            <p>Register with your Mozambique phone number.</p>
          </div>

          <div>
            <h3>2. Choose Package</h3>
            <p>Select your preferred investment plan.</p>
          </div>

          <div>
            <h3>3. Pay via E-mola</h3>
            <p>Submit payment reference and screenshot proof.</p>
          </div>

          <div>
            <h3>4. Earn Daily</h3>
            <p>After approval, your package starts earning daily.</p>
          </div>
        </div>
      </section>

      <section className="preview-section">
        <h2>Popular Investment Plans</h2>

        <div className="preview-grid">
          {previewPackages.map((item, index) => (
            <div className="preview-card" key={index}>
              <h3>{item.name}</h3>
              <h1>{item.price}</h1>
              <p>{item.daily}</p>
              <Link to="/register">Start Now</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="support-section">
        <h2>Need Assistance?</h2>

        <p>
          Contact our support team on WhatsApp for help with deposits,
          withdrawals, and account setup.
        </p>

        <a
          href="https://wa.me/258866150334"
          target="_blank"
          rel="noreferrer"
        >
          Chat on WhatsApp
        </a>
      </section>
    </div>
  );
}

export default Home;
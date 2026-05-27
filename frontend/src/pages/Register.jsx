import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import Toast from "../components/Toast";
import "./auth.css";

function Register() {
  const navigate = useNavigate();

  const [captcha] = useState({
    a: Math.floor(Math.random() * 10) + 1,
    b: Math.floor(Math.random() * 10) + 1,
  });

  const [captchaAnswer, setCaptchaAnswer] = useState("");

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const [form, setForm] = useState({
    username: "",
    phone: "",
    password: "",
    referredBy: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (Number(captchaAnswer) !== captcha.a + captcha.b) {
      setToast({
        message: "Human verification failed",
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/register", form);

      localStorage.setItem("agrotech_token", res.data.token);
      localStorage.setItem("agrotech_user", JSON.stringify(res.data.user));

      setToast({
        message: "Account created successfully",
        type: "success",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Registration failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />

      <div className="auth-card">
        <h1>Create Account</h1>
        <p>Join Agrotech Africa today</p>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            value={form.username}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number: 258XXXXXXXXX"
            value={form.phone}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <input
            type="text"
            name="referredBy"
            placeholder="Referral Code Optional"
            value={form.referredBy}
            onChange={handleChange}
          />

          <div className="captcha-box">
            <label>
              Human Verification: {captcha.a} + {captcha.b} = ?
            </label>

            <input
              type="number"
              placeholder="Enter answer"
              value={captchaAnswer}
              onChange={(e) => setCaptchaAnswer(e.target.value)}
            />
          </div>

          <button disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </div>
    </div>
  );
}

export default Register;
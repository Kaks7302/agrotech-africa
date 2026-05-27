import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import Toast from "../components/Toast";
import "./auth.css";

function Login() {
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
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
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

      const res = await API.post("/auth/login", form);

      localStorage.setItem("agrotech_token", res.data.token);

      localStorage.setItem(
        "agrotech_user",
        JSON.stringify(res.data.user)
      );

      setToast({
        message: "Login successful",
        type: "success",
      });

      setTimeout(() => {
        if (res.data.user.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }, 1000);

    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Login failed",
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
        onClose={() =>
          setToast({
            message: "",
            type: "success",
          })
        }
      />

      <div className="auth-card">
        <h1>Welcome Back</h1>

        <p>Login with your Mozambique phone number</p>

        <form onSubmit={handleLogin}>
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

          <div className="captcha-box">
            <label>
              Human Verification: {captcha.a} + {captcha.b} = ?
            </label>

            <input
              type="number"
              placeholder="Enter answer"
              value={captchaAnswer}
              onChange={(e) =>
                setCaptchaAnswer(e.target.value)
              }
            />
          </div>

          <button disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <span>
          Don’t have an account?{" "}
          <Link to="/register">Register</Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
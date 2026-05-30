import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import Toast from "../components/Toast";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { t } from "../i18n";
import "./auth.css";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

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
        message: t("humanFailed"),
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", form);

      localStorage.setItem("agrotech_token", res.data.token);
      localStorage.setItem("agrotech_user", JSON.stringify(res.data.user));

      setToast({
        message: t("loginSuccess"),
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
        message: error.response?.data?.message || t("loginFailed"),
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

      <LanguageSwitcher />

      <div className="auth-card">
        <h1>{t("login")}</h1>

        <p>{t("welcome")}</p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="phone"
            placeholder={t("phoneNumber")}
            value={form.phone}
            onChange={handleChange}
          />

          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder={t("password")}
              value={form.password}
              onChange={handleChange}
            />

            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <div className="captcha-box">
            <label>
              {t("humanVerification")}: {captcha.a} + {captcha.b} = ?
            </label>

            <input
              type="number"
              placeholder={t("answer")}
              value={captchaAnswer}
              onChange={(e) => setCaptchaAnswer(e.target.value)}
            />
          </div>

          <button disabled={loading}>{loading ? "..." : t("login")}</button>
        </form>

        <span>
          {t("register")}? <Link to="/register">{t("register")}</Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
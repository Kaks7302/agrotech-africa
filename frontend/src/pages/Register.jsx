import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import API from "../services/api";
import Toast from "../components/Toast";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { t } from "../i18n";
import "./auth.css";

function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);
  const [emailCode, setEmailCode] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);

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
    email: "",
    phone: "",
    password: "",
    referredBy: searchParams.get("ref") || "",
  });

  const [loading, setLoading] = useState(false);

  const passwordChecks = {
    length: form.password.length >= 8,
    uppercase: /[A-Z]/.test(form.password),
    lowercase: /[a-z]/.test(form.password),
    number: /[0-9]/.test(form.password),
    special: /[^A-Za-z0-9]/.test(form.password),
  };

  const passwordIsValid =
    passwordChecks.length &&
    passwordChecks.uppercase &&
    passwordChecks.lowercase &&
    passwordChecks.number &&
    passwordChecks.special;

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmailVerified(false);
    }

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const sendCode = async () => {
    if (!form.email) {
      setToast({
        message: "Enter your email first",
        type: "error",
      });
      return;
    }

    try {
      setSendingCode(true);

      const res = await API.post("/email/send-code", {
        email: form.email,
        purpose: "register",
      });

      setToast({
        message: res.data.message,
        type: "success",
      });
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Failed to send code",
        type: "error",
      });
    } finally {
      setSendingCode(false);
    }
  };

  const verifyEmailCode = async () => {
    if (!form.email || !emailCode) {
      setToast({
        message: "Enter email and verification code",
        type: "error",
      });
      return;
    }

    try {
      setVerifyingCode(true);

      const res = await API.post("/email/verify-code", {
        email: form.email,
        code: emailCode,
        purpose: "register",
      });

      setEmailVerified(true);

      setToast({
        message: res.data.message,
        type: "success",
      });
    } catch (error) {
      setEmailVerified(false);

      setToast({
        message: error.response?.data?.message || "Invalid verification code",
        type: "error",
      });
    } finally {
      setVerifyingCode(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!emailVerified) {
      setToast({
        message: "Please verify your email before registering",
        type: "error",
      });
      return;
    }

    if (!passwordIsValid) {
      setToast({
        message: t("passwordWeak"),
        type: "error",
      });
      return;
    }

    if (Number(captchaAnswer) !== captcha.a + captcha.b) {
      setToast({
        message: t("humanFailed"),
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
        message: t("accountCreated"),
        type: "success",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (error) {
      setToast({
        message: error.response?.data?.message || t("registrationFailed"),
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
        <h1>{t("createAccount")}</h1>

        <p>Agrotech Africa</p>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="username"
            placeholder={t("fullName")}
            value={form.username}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <button
            type="button"
            className="secondary-auth-btn"
            onClick={sendCode}
            disabled={sendingCode || emailVerified}
          >
            {emailVerified
              ? "Email Verified"
              : sendingCode
              ? "Sending..."
              : "Send Email Code"}
          </button>

          <input
            type="text"
            placeholder="Email Verification Code"
            value={emailCode}
            onChange={(e) => setEmailCode(e.target.value)}
          />

          <button
            type="button"
            className="secondary-auth-btn"
            onClick={verifyEmailCode}
            disabled={verifyingCode || emailVerified}
          >
            {emailVerified
              ? "Verified"
              : verifyingCode
              ? "Verifying..."
              : "Verify Email"}
          </button>

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

          <div className="password-rules">
            <p className={passwordChecks.length ? "valid" : "invalid"}>
              ✓ {t("passwordMin8")}
            </p>

            <p className={passwordChecks.uppercase ? "valid" : "invalid"}>
              ✓ {t("passwordUppercase")}
            </p>

            <p className={passwordChecks.lowercase ? "valid" : "invalid"}>
              ✓ {t("passwordLowercase")}
            </p>

            <p className={passwordChecks.number ? "valid" : "invalid"}>
              ✓ {t("passwordNumber")}
            </p>

            <p className={passwordChecks.special ? "valid" : "invalid"}>
              ✓ {t("passwordSpecial")}
            </p>
          </div>

          <input
            type="text"
            name="referredBy"
            placeholder={t("referralCode")}
            value={form.referredBy}
            onChange={handleChange}
          />

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

          <button disabled={loading || !emailVerified}>
            {loading ? "..." : t("register")}
          </button>
        </form>

        <span>
          {t("login")}? <Link to="/login">{t("login")}</Link>
        </span>
      </div>
    </div>
  );
}

export default Register;
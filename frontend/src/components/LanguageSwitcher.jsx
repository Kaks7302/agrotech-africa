import React, { useState } from "react";
import "./languageSwitcher.css";

function LanguageSwitcher() {
  const [lang, setLang] = useState(localStorage.getItem("agrotech_lang") || "en");

  const changeLanguage = (value) => {
    localStorage.setItem("agrotech_lang", value);
    setLang(value);
    window.location.reload();
  };

  return (
    <select
      className="language-switcher"
      value={lang}
      onChange={(e) => changeLanguage(e.target.value)}
    >
      <option value="en">English</option>
      <option value="pt">Português</option>
    </select>
  );
}

export default LanguageSwitcher;
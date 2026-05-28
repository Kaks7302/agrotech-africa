import React, { useEffect, useState } from "react";
import { getLanguage, setLanguage } from "../i18n";
import "./languageSwitcher.css";

function LanguageSwitcher() {
  const [lang, setLang] = useState(getLanguage());

  useEffect(() => {
    const update = () => setLang(getLanguage());

    window.addEventListener("languageChanged", update);

    return () => window.removeEventListener("languageChanged", update);
  }, []);

  const changeLang = (value) => {
    setLanguage(value);
    setLang(value);
    window.location.reload();
  };

  return (
    <div className="language-toggle">
      <button
        className={lang === "pt" ? "active" : ""}
        onClick={() => changeLang("pt")}
      >
        PT
      </button>

      <span>|</span>

      <button
        className={lang === "en" ? "active" : ""}
        onClick={() => changeLang("en")}
      >
        EN
      </button>
    </div>
  );
}

export default LanguageSwitcher;
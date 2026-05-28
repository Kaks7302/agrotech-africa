import React, { useEffect, useState } from "react";
import "./installButton.css";

function InstallButton() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      setShowButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const installApp = async () => {
    if (!installPrompt) return;

    installPrompt.prompt();

    await installPrompt.userChoice;

    setInstallPrompt(null);
    setShowButton(false);
  };

  if (!showButton) return null;

  return (
    <button className="install-button" onClick={installApp}>
      📲 Instalar App
    </button>
  );
}

export default InstallButton;
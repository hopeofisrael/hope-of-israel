import React, { useState, useEffect } from "react";

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the default mini-infobar from appearing
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt(); // Show the install prompt
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === "accepted") {
      console.log("PWA installed successfully!");
    } else {
      console.log("PWA installation dismissed.");
    }
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div style={styles.popup}>
      <div style={styles.content}>
        <p style={styles.text}>Install Hope of Israel for quick access!</p>
        <div style={styles.buttons}>
          <button style={styles.installButton} onClick={handleInstallClick}>
            Install
          </button>
          <button style={styles.dismissButton} onClick={handleDismiss}>
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  popup: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 1000,
    backgroundColor: "#ffffff",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "16px",
    maxWidth: "300px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  text: {
    marginBottom: "12px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  buttons: {
    display: "flex",
    gap: "8px",
  },
  installButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  dismissButton: {
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default InstallPrompt;

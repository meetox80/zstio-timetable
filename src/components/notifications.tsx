"use client";

import { useEffect } from "react";

const Notifications: React.FC = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/notifications-sw.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope,
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    } else {
      console.log("Service Worker is not supported in this browser.");
    }
  }, []);

  return null;
};

export default Notifications;

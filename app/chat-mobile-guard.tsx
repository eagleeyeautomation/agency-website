"use client";

import { useEffect } from "react";

/** Keep LeadConnector's launcher accessible without an automatic greeting covering CTAs. */
export function ChatMobileGuard() {
  useEffect(() => {
    const install = () => {
      const root = document.querySelector("chat-widget")?.shadowRoot;
      if (!root || root.querySelector("#eea-mobile-chat-position")) return;
      const style = document.createElement("style");
      style.id = "eea-mobile-chat-position";
      style.textContent = ".lc_text-widget--prompt { display: none !important; }";
      root.appendChild(style);
    };
    install();
    const observer = new MutationObserver(install);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
  return null;
}

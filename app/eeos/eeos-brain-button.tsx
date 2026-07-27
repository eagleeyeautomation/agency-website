"use client";

import { BrainCircuit } from "lucide-react";

declare global {
  interface Window {
    leadConnector?: {
      chatWidget?: {
        openWidget?: () => void;
      };
    };
  }
}

export function EeosBrainButton() {
  const openEeosBrain = () => {
    window.leadConnector?.chatWidget?.openWidget?.();
  };

  return (
    <button className="button primary" type="button" onClick={openEeosBrain}>
      <BrainCircuit size={19} aria-hidden="true" />
      Speak to EEOS Brain
    </button>
  );
}

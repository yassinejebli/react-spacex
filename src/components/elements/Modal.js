import React from "react";
import { createPortal } from "react-dom";

export default function ({ children }) {
  const domEl = document.getElementById("modal");

  if (!domEl) return null;

  return createPortal(children, domEl);
}

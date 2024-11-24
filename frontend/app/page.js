"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app";

export default function Home() {
  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
}

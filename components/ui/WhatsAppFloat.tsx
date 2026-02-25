"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function WhatsAppFloat() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "28px",
        left: "28px",
        zIndex: 9999,
      }}
    >
      <motion.button
        type="button"
        aria-label="تواصل عبر واتساب"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.12, rotate: 8 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => window.open("https://wa.me/213XXXXXXXXX", "_blank")}
        className="relative flex items-center justify-center rounded-full cursor-pointer"
        style={{
          width: "60px",
          height: "60px",
          border: "none",
          background: "#25D366",
          boxShadow: "0 4px 20px rgba(37,211,102,0.5)",
        }}
      >
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full"
          style={{
            border: "2px solid rgba(37,211,102,0.65)",
            pointerEvents: "none",
          }}
          animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }}
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="currentColor"
          aria-hidden="true"
          style={{ width: "28px", height: "28px", color: "#FFFFFF", zIndex: 1 }}
        >
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.129 6.744 3.047 9.379L1.054 31.25l6.093-1.955a15.93 15.93 0 008.857 2.68C24.826 31.975 32 24.799 32 16.004 32 7.176 24.826 0 16.004 0zm9.338 22.617c-.393 1.107-1.941 2.025-3.174 2.293-.846.18-1.951.324-5.672-1.219-4.762-1.975-7.826-6.813-8.063-7.127-.229-.314-1.916-2.551-1.916-4.865 0-2.314 1.213-3.451 1.643-3.924.393-.43 1.022-.615 1.617-.615.195 0 .371.01.527.018.43.018.645.043.928.717.352.84 1.213 2.955 1.32 3.172.107.217.213.502.072.803-.131.305-.262.494-.48.766-.217.271-.42.479-.637.77-.197.26-.42.537-.174.957.246.412 1.096 1.807 2.354 2.928 1.615 1.439 2.975 1.885 3.398 2.094.424.209.67.174.916-.107.254-.281 1.08-1.256 1.369-1.689.281-.434.57-.357.957-.215.393.143 2.494 1.178 2.92 1.393.43.215.713.322.82.502.105.18.105 1.037-.289 2.145z" />
        </svg>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -8 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="pointer-events-none absolute top-1/2"
        style={{
          left: "calc(100% + 10px)",
          transform: "translateY(-50%)",
          background: "#1F1F1F",
          color: "#FFFFFF",
          borderRadius: "999px",
          padding: "7px 12px",
          fontSize: "12px",
          whiteSpace: "nowrap",
          boxShadow: "0 6px 18px rgba(0,0,0,0.22)",
        }}
      >
        تواصل عبر واتساب
      </motion.div>
    </div>
  );
}

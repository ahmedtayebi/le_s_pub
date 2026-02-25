"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] origin-left"
      style={{
        scaleX: scrollYProgress,
        zIndex: 9998,
        background: "linear-gradient(90deg, #A8832A 0%, #C9A84C 45%, #F0C040 100%)",
      }}
    />
  );
}

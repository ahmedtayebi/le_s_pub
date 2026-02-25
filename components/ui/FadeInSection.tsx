"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "left" | "right";

interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
}

export default function FadeInSection({
  children,
  delay = 0,
  direction = "up",
}: FadeInSectionProps) {
  const hiddenState =
    direction === "left"
      ? { opacity: 0, x: -40 }
      : direction === "right"
      ? { opacity: 0, x: 40 }
      : { opacity: 0, y: 40 };

  return (
    <motion.div
      initial={hiddenState}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

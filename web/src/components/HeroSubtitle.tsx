"use client";

import { motion } from "framer-motion";

interface HeroSubtitleProps {
  delay?: number;
  className?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function HeroSubtitle({}: HeroSubtitleProps) {
  return (
    <motion.h3
      {...fadeInUp}
      transition={{ ...fadeInUp.transition, delay: 0.15 }}
      className="mx-auto mt-5 max-w-2xl px-2 text-xl sm:text-2xl md:text-3xl font-bold text-white"
    >
      The new infrastructure for digital trust.
    </motion.h3>
  );
}

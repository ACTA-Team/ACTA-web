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
      className="mx-auto mt-5 max-w-2xl px-2 text-lg sm:text-xl md:text-[44px] font-bold text-transparent bg-clip-text bg-[linear-gradient(180deg,#F0E7CC_0%,#E9F8D8_55%,#FFFFFF_100%)]"
    >
      The new infrastructure for digital trust.
    </motion.h3>
  );
}

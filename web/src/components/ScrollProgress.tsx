"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 50,   
    damping: 20,     
    mass: 0.5        
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-50 h-0.5 w-[100%] origin-left rounded-full bg-gradient-to-r from-[#0066ff] to-[#7b4dff]"
    />
  );
}

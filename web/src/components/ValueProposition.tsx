"use client";

import type React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Lock,
  Hash,
  Zap,
  Globe,
} from "lucide-react";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};
const staggerChildren = { animate: { transition: { staggerChildren: 0.08 } } };

export default function ValueProposition() {
  return (
    <section className="space-y-10">
      <motion.div
        className="text-center"
        variants={staggerChildren}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <motion.div
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm"
          {...fadeInUp}
        >
          <AnimatedShinyText className="font-medium">
            “Issue trust at the speed of light.”
          </AnimatedShinyText>
        </motion.div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-16"
        variants={staggerChildren}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {[
          {
            icon: <Lock className="w-6 h-6" />,
            title: "Privacy by design",
            desc: "No PII on-chain; only hash + state. Data encrypted off-chain.",
          },
          {
            icon: <Hash className="w-6 h-6" />,
            title: "Deterministic proofs",
            desc: "JCS + SHA-256 → same content = same hash. Objective verification.",
          },
          {
            icon: <Zap className="w-6 h-6" />,
            title: "1-click verification",
            desc: "Embeddable widget + public portal. No extra integration to verify.",
          },
          {
            icon: <Globe className="w-6 h-6" />,
            title: "Verifiable by anyone",
            desc: "Provider-independent: public verification against the chain.",
          },
        ].map((f, i) => (
          <motion.div key={i} variants={fadeInUp}>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 rounded-2xl hover:bg-card/70 transition-all duration-300 hover:scale-[1.02] cursor-default">
              <CardHeader className="space-y-1">
                <div className="text-white/80 mb-2">{f.icon}</div>
                <CardTitle className="text-lg">{f.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {f.desc}
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

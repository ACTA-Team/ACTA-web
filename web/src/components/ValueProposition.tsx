"use client";

import { motion } from "framer-motion";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";

const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45 },
};
const stagger = { animate: { transition: { staggerChildren: 0.08 } } };

type Feature = { title: string; desc: string };

const FEATURES: Feature[] = [
  {
    title: "Privacy by design",
    desc: "No PII on-chain; only hash + state. Data encrypted off-chain.",
  },
  {
    title: "Deterministic proofs",
    desc: "JCS + SHA-256 → same content = same hash. Objective verification.",
  },
  {
    title: "1-click verification",
    desc: "Embeddable widget + public portal. No extra integration to verify.",
  },
  {
    title: "Verifiable by anyone",
    desc: "Provider-independent: public verification against the chain.",
  },
];

export default function ValueProposition() {
  return (
    <section className="space-y-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      {/* top badge stays */}
      <motion.div
        className="text-center"
        variants={stagger}
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
        variants={stagger}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "0px 0px -80px 0px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
      >
        {FEATURES.map((f, i) => (
          <motion.div key={i} variants={fadeInUp}>
            <FeatureCard title={f.title} desc={f.desc} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/** Card styled like the reference screenshot */
function FeatureCard({ title, desc }: Feature) {
  return (
    <div
      className={[
        "relative h-full rounded-3xl p-6 sm:p-7 text-center",
        // surface
        "bg-[rgba(255,255,255,0.03)] border border-white/10",
        // inner + outer shadow
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_40px_rgba(0,0,0,0.35)]",
        // hover
        "transition-all duration-300 hover:-translate-y-0.5",
        "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_24px_60px_rgba(0,0,0,0.45)]",
        "hover:ring-1 hover:ring-white/10",
        // double border via ::after
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-3xl after:border after:border-white/5",
      ].join(" ")}
    >
      <h3
        className={[
          "mb-3 font-extrabold uppercase tracking-[0.18em]",
          "text-transparent bg-clip-text",
          // cream → mint gradient (como la imagen)
          "bg-[linear-gradient(180deg,#F0E7CC_0%,#E9F8D8_55%,#FFFFFF_100%)]",
          "drop-shadow-[0_0_10px_rgba(255,255,255,0.08)]",
          "text-lg sm:text-xl",
        ].join(" ")}
      >
        {title}
      </h3>

      <p className="mx-auto max-w-[32ch] text-sm sm:text-base leading-relaxed text-white/85">
        {desc}
      </p>

      {/* soft inner vignette */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_0_60px_rgba(255,255,255,0.03)]" />
    </div>
  );
}

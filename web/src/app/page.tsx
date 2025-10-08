"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Aurora from "@/components/Aurora";
import UseCasesCarousel from "@/components/UseCasesCarousel";

import Image from "next/image";
import ScrollProgress from "@/components/ScrollProgress";
import HowItWorks from "@/components/HowItWorks";

import FAQ from "@/components/FAQ";
import ValueProposition from "@/components/ValueProposition";
import ValuePropositionDetails from "@/components/ValueDetails";
import ValueDetailsExtended from "@/components/ValueDetailsExtended";
import { TextAnimate } from "@/components/magicui/text-animate";
import Footer from "@/components/Footer";
import { Particles } from "@/components/magicui/particles";
import { ShineBorder } from "@/components/magicui/shine-border";
import { usePostHog } from "posthog-js/react";

import AnimatedActa from "@/components/AnimatedActa";
import WaitlistForm from "@/components/WaitlistForm";
import FlipCredential from "@/components/FlipCredential";
import HeroSubtitle from "@/components/HeroSubtitle";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function ActaLanding() {
  const ph = usePostHog();
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollProgress />

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[#1B1F2E]" />
        {/* <Aurora /> */}
        <Particles
          className="absolute inset-0 z-0"
          quantity={60}
          staticity={40}
          ease={70}
          size={0.4}
          vx={0}
          vy={0}
          color="#ffffff"
        />
      </div>

      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between"></div>
      </nav>

      <section className="relative z-10 isolate px-4 sm:px-6 py-12 sm:py-20 min-h-[85vh] md:min-h-[90vh] flex items-center">
        <div className="pointer-events-none absolute inset-0 z-0">
          {/* Logo difuminado de fondo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/Acta-logo.png"
              alt="ACTA Logo Background"
              className="w-96 h-96 object-contain opacity-30 blur-[3px] scale-220"
            />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent [mask-image:radial-gradient(350px_200px_at_50%_0%,#000_40%,transparent_80%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0,transparent_23%,rgba(255,255,255,.06)_24%,transparent_25%),linear-gradient(to_bottom,transparent_0,transparent_23%,rgba(255,255,255,.06)_24%,transparent_25%)] bg-[size:44px_44px] opacity-40" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <div className="flex flex-col items-center gap-2 mb-12">
            <AnimatedActa />
          </div>

          <HeroSubtitle delay={0.15} />

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            {...fadeInUp}
            transition={{ delay: 0.3 }}
          >
            <div className="relative overflow-hidden rounded-2xl">
              <ShineBorder
                shineColor={["#404040", "#808080", "#404040"]}
                borderWidth={1}
              />
              <Button
                asChild
                className="bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] rounded-2xl h-14 px-8 text-lg font-semibold shadow-lg transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#404040]/40 w-full"
              >
                <a
                  href="/demo"
                  onClick={() =>
                    ph?.capture("clicked_try_demo", {
                      location: "landing_page",
                    })
                  }
                >
                  Try our Demo!
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 px-4 sm:px-6 py-6 sm:py-14">
        <div className="relative max-w-6xl mx-auto">
          <ValueProposition />
        </div>
      </section>

      <section className="relative z-10 px-4 sm:px-6 py-6 sm:py-14">
        <div className="relative max-w-6xl mx-auto">
          <ValuePropositionDetails />
        </div>
      </section>

      <section className="relative z-10 px-4 sm:px-6 py-6 sm:py-14">
        <div className="relative max-w-6xl mx-auto">
          <ValueDetailsExtended />
        </div>
      </section>

      <section className="relative z-10 px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-16"
            {...fadeInUp}
          >
            Use cases
          </motion.h2>
          <motion.div {...fadeInUp}>
            <UseCasesCarousel />
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-16"
            {...fadeInUp}
          >
            How it works
          </motion.h2>
          <motion.div {...fadeInUp}>
            <HowItWorks />
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-16"
            {...fadeInUp}
          >
            Credential Demo
          </motion.h2>
          <motion.div className="flex justify-center" {...fadeInUp}>
            <FlipCredential />
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-2xl mx-auto">
          <motion.div {...fadeInUp}>
            <WaitlistForm />
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-16"
            {...fadeInUp}
          >
            Frequently asked questions
          </motion.h2>
          <motion.div {...fadeInUp}>
            <FAQ />
          </motion.div>
        </div>
      </section>

      {/* footer section */}
      <footer className="relative z-10 px-4 sm:px-6 py-8 sm:py-12 border-t border-border/50">
        <Footer />
      </footer>
    </div>
  );
}

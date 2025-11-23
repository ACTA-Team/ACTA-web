"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Database, FileText, Wrench, Unlink, Info } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};
const staggerChildren = { animate: { transition: { staggerChildren: 0.08 } } };

export default function ValueDetailsExtended() {
  return (
    <section className="space-y-10">
      <motion.div
        className="space-y-4"
        variants={staggerChildren}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <motion.h3 className="text-xl font-semibold" variants={fadeInUp}>
          Common alternatives — and why we win
        </motion.h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              value: "inhouse",
              icon: <Wrench className="w-4 h-4" />,
              title: "Build in-house",
              pain: "Pain: Expensive, slow, and requires deep expertise to build DID, encryption, Vaults, on-chain anchoring, and public verification..",
              win: "ACTA: Ships the full stack — DID:pkh, issuer API/SDK, encrypted Vault, Soroban anchoring, and instant on-chain verification.",
            },
            {
              value: "pdf",
              icon: <FileText className="w-4 h-4" />,
              title: "PDFs / e-sign",
              pain: "Pain: Easy to forge, hard to verify, and no live status (no revocation, no updates).",
              win: "ACTA: Cryptographic credentials with live on-chain status and public, objective verification.",
            },
            {
              value: "onchain",
              icon: <Database className="w-4 h-4" />,
              title: "Web2 storage",
              pain: "Pain: Centralized servers hold unencrypted PII, easy to breach, modify, or lose. If the company dies, your credential dies.",
              win: "ACTA: Encrypted Vaults on-chain, even if ACTA disappears your credentials will remain verifiable forever thanks to Soroban.",
            },
            {
              value: "noanchor",
              icon: <Unlink className="w-4 h-4" />,
              title: "VCs without anchoring",
              pain: "Pain: Rely entirely on the issuer’s backend; no public proof of authenticity or revocation.",
              win: "ACTA: Anchored on Soroban public, tamper-proof verification that never depends on the issuer.",
            },
          ].map(a => (
            <Accordion key={a.value} type="single" collapsible>
              <AccordionItem
                value={a.value}
                className="rounded-xl border border-white/10 bg-white/5 px-3"
              >
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    {a.icon}
                    <span className="font-medium">{a.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2 text-sm text-white/70">
                  <div>• {a.pain}</div>
                  <div>• {a.win}</div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="mb-8"
        variants={staggerChildren}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <motion.div
          className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 text-sm"
          {...fadeInUp}
        >
          <div className="flex items-start gap-4">
            <Info className="mt-1 h-6 w-6 text-white/70 flex-shrink-0" />
            <div className="space-y-3">
              <p className="font-semibold text-white text-base">
                &ldquo;Zero databases architecture&rdquo;
              </p>
              <p className="text-white/70 leading-relaxed">
                You don’t need to store or manage credential data.
ACTA keeps the encrypted payload on-chain and manages the full lifecycle on Soroban.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <Badge className="bg-white/10 text-white border-white/20">
                  No backend needed
                </Badge>
                <Badge className="bg-white/10 text-white border-white/20">
                  Data on-chain
                </Badge>
                <Badge className="bg-white/10 text-white border-white/20">
                  Verifiable by anyone
                </Badge>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

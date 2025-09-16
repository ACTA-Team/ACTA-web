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

import {
  Database,
  FileText,
  Wrench,
  Unlink,
  Info,
} from "lucide-react";

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
              pain: "Expensive, slow; maintain on-chain, security & public verification.",
              win: "Acta ships it all: API/SDK, anchoring, public verification.",
            },
            {
              value: "pdf",
              icon: <FileText className="w-4 h-4" />,
              title: "PDFs / e-sign",
              pain: "Hard for third parties to verify; no live state.",
              win: "Live status + objective, public verification.",
            },
            {
              value: "onchain",
              icon: <Database className="w-4 h-4" />,
              title: "Store everything on-chain",
              pain: "Costly, slow, exposes PII.",
              win: "Hash on-chain; encrypted data off-chain (privacy + low cost).",
            },
            {
              value: "noanchor",
              icon: <Unlink className="w-4 h-4" />,
              title: "VCs without anchoring",
              pain: "Depend 100% on issuer; little public traceability.",
              win: "Public anchoring on Stellar: anyone can verify.",
            },
          ].map((a) => (
            <Accordion key={a.value} type="single" collapsible>
              <AccordionItem value={a.value} className="rounded-xl border border-white/10 bg-white/5 px-3">
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
              <p className="font-semibold text-white text-base">&ldquo;Zero databases&rdquo; — what we mean</p>
              <p className="text-white/70 leading-relaxed">
                You don&apos;t need to run a database for credentials. Acta manages encrypted storage
                and on-chain state; your app can be stateless (store only the <code className="bg-white/10 px-1.5 py-0.5 rounded text-white">credentialId</code>).
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <Badge className="bg-white/10 text-white border-white/20">Hash on-chain</Badge>
                <Badge className="bg-white/10 text-white border-white/20">Data off-chain</Badge>
                <Badge className="bg-white/10 text-white border-white/20">Verifiable by anyone</Badge>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
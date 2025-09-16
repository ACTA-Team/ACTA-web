"use client";

import { JSX, useState } from "react";
import { motion } from "framer-motion";
import { Globe, Link2, ShieldCheck, Copy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const fadeInUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45 },
};
const staggerChildren = { animate: { transition: { staggerChildren: 0.08 } } };

function Code({ children }: { children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);
  const text = typeof children === "string" ? (children as string) : "";
  return (
    <div className="relative mt-3 overflow-hidden rounded-xl border border-white/10 bg-black/40">
      <button
        onClick={async () => {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        }}
        className="absolute right-2 top-2 rounded-lg border border-white/10 bg-white/10 px-2 py-1 text-xs text-white/80 hover:bg-white/15"
        aria-label="Copy"
        title={copied ? "Copied!" : "Copy"}
      >
        <Copy className="mr-1 inline-block h-3.5 w-3.5" />
        {copied ? "Copied" : "Copy"}
      </button>
      <pre className="overflow-x-auto p-3 text-xs leading-relaxed text-white/90">
        <code className="font-mono">{children}</code>
      </pre>
    </div>
  );
}

type Step = {
  step: string;
  icon: JSX.Element;
  title: string;
  description: string;
  bullets: string[];
  snippet?: string;
};

function StepCard({ data }: { data: Step }) {
  const [flipped, setFlipped] = useState(false);

  return (
    //  explicit height so the grid doesn't collapse
    <div className="relative h-[460px] sm:h-[480px] md:h-[520px] lg:h-[440px]" style={{ perspective: 1200 }}>
      <motion.div
        className="relative h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 16, mass: 0.8 }}
        whileTap={{ scale: 0.995 }}
      >
        {/* FRONT */}
        <Card
          className="absolute inset-0 flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Badge className="rounded-xl bg-white/10 px-2.5 py-1 text-white">
                {data.step}
              </Badge>
              <div className="text-white/80">{data.icon}</div>
            </div>

            <h3 className="text-lg font-semibold text-white">{data.title}</h3>
            <p className="mt-1 text-sm text-white/70">{data.description}</p>

            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {data.bullets.map((b, k) => (
                <li key={k} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#0066ff] to-[#7b4dff]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {data.snippet && (
            <div className="mt-auto">
              <button
                onClick={() => setFlipped(true)}
                className="rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white/90 hover:bg-white/15"
                aria-label="Show sample"
              >
                Show sample
              </button>
            </div>
          )}
        </Card>

        {/* BACK */}
        <Card
          className="absolute inset-0 flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-sm"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="mb-2 text-sm font-semibold text-white/80">Sample</div>

          {/*  Scrollable area for the code */}
          <div className="flex-1 min-h-0 overflow-y-auto pr-1 scrollbar-thin">
            {data.snippet ? (
              <Code>{data.snippet}</Code>
            ) : (
              <div className="text-sm text-white/70">No sample available.</div>
            )}
          </div>

          <div className="pt-4">
            <button
              onClick={() => setFlipped(false)}
              className="rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white/90 hover:bg-white/15"
              aria-label="Back"
            >
              Back
            </button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

export default function HowItWorks() {
  const steps: Step[] = [
    {
      step: "1",
      icon: <Globe className="h-5 w-5" />,
      title: "Issuer emits credential",
      description:
        "Issuer calls our API/Panel using a template. We canonicalize and hash the payload.",
      bullets: [
        "Template → VC JSON (no volatile fields).",
        "JCS canonicalization → SHA-256 = content_hash.",
        "VC encrypted (AES-GCM) in Supabase Storage.",
        "We return verify link + QR (capability token).",
      ],
      snippet: `POST /v1/credentials
{
  "templateId": "tpl_escrow_completed_v1",
  "data": {
    "escrowId": "esc_7890",
    "network": "stellar-mainnet",
    "asset": "USDC",
    "amount": "500.00",
    "receiver": "GABC...RECEIVER",
    "roles": {
      "approver": "G...APP",
      "serviceProvider": "G...PROV",
      "releaseSigner": "G...SIG",
      "disputeResolver": "G...RES",
      "platform": "G...PLAT"
    },
    "releasedAt": "2025-08-15T16:30:10Z"
  }
}`,
    },
    {
      step: "2",
      icon: <Link2 className="h-5 w-5" />,
      title: "Hash anchored on Stellar",
      description:
        "Only hash + status go on-chain via Soroban. No PII, no heavy data.",
      bullets: [
        "We publish {hash, statusRef} in Soroban contract.",
        "Zero PII on-chain. Minimal costs and latency.",
        "Indexer listens to events → caches state in DB.",
        "We return txId and 'View on Stellar' link.",
      ],
      snippet: `On-chain record (conceptual)
{
  "credentialId": "cred_24f9",
  "hash": "0xa3f8...e91",
  "status": "Active",
  "txId": "6b1d9a..."
}`,
    },
    {
      step: "3",
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "Anyone verifies instantly",
      description:
        "Portal & widget recompute hash server-side and compare with the chain.",
      bullets: [
        "We retrieve encrypted VC → decrypt on server.",
        "Re-JCS + SHA-256 and compare with on-chain.",
        "We show ✔/⚠/✖ and metadata (issuer, type, tx).",
        "Embeddable widget + Verifier Portal (public).",
      ],
      snippet: `GET /v1/verify/cred_24f9
{
  "verified": true,
  "status": "Active",
  "checks": { "hash_match": true, "onchain_status": "Active" },
  "summary": { "issuer": "Trustless Work", "type": "EscrowCompleted" },
  "proof": { "onchain": { "network": "stellar", "tx": "6b1d9a..." } }
}`,
    },
  ];

  return (
    <section aria-labelledby="how-it-works">
      <div className="relative">
        {/* gradient line (optional) */}
        <svg
          className="pointer-events-none absolute left-0 top-1/2 hidden h-24 w-full -translate-y-1/2 lg:block"
          viewBox="0 0 100 24"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="hiwLine" x1="0" x2="1">
              <stop offset="0%" stopColor="#0066ff" />
              <stop offset="100%" stopColor="#7b4dff" />
            </linearGradient>
          </defs>
          <motion.path
            d="M2,12 C20,12 30,12 50,12 C70,12 80,12 98,12"
            fill="none"
            stroke="url(#hiwLine)"
            strokeWidth="0.8"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
        </svg>

        <motion.div
          className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          {steps.map((s, i) => (
            <motion.div key={i} variants={fadeInUp} className="h-full">
              <StepCard data={s} />
            </motion.div>
          ))}
        </motion.div>
      </div>

    
    </section>
  );
}

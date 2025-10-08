"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Particles } from "@/components/magicui/particles";
import { ShineBorder } from "@/components/magicui/shine-border";
import DappCredentialCard from "@/components/DappCredentialCard";
import { TextAnimate } from "@/components/magicui/text-animate";

type VerifyResult = {
  success?: boolean;
  data?: {
    contractId: string;
    hash: string;
    transactionHash: string;
    ledgerSequence: number;
    createdAt: string;
  };
  error?: string;
  details?: string;
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
} as const;

export default function DemoPage() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [qrTxUrl, setQrTxUrl] = useState<string | null>(null);

  const ACTA_API =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_ACTA_API_URL ||
    "http://localhost:8000";
  const STELLAR_NETWORK = process.env.NEXT_PUBLIC_STELLAR_NETWORK || "public";

  const handleVerify = async () => {
    setLoading(true);
    setOpen(true);
    setResult(null);
    setQrTxUrl(null);

    try {
      // Construir payload similar al dApp-ACTA (API v2)
      const expiresAt = new Date(Date.now() + 31536000000).toISOString();
      const payload = {
        data: {
          name: "Demo User",
          degree: "Identity",
          university: "ACTA",
          description: "Demo credential for ACTA verification",
          expiresAt,
          claims: {
            standard: "W3C VC 2.0",
            signature: "Ed25519 (Stellar)",
          },
        },
        metadata: {
          issuer: "ACTA",
          subject: "Demo User",
          expirationDate: expiresAt,
        },
      };

      // Usar únicamente el endpoint de credenciales del ACTA API.
      const res = await fetch(`${ACTA_API}/credentials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        const isPublicApi = /api\.acta\.build/.test(ACTA_API);
        const hint = isPublicApi
          ? "Public API no puede almacenar credenciales sin backend configurado"
          : undefined;
        const message = json?.message || json?.error || "Request failed";
        const details = json?.details || hint || `HTTP ${res.status}`;
        setResult({ error: message, details });
      } else {
        setResult(json as VerifyResult);
        const tx = (json as VerifyResult)?.data?.transactionHash;
        if (tx) {
          setQrTxUrl(`https://stellar.expert/explorer/${STELLAR_NETWORK}/tx/${tx}`);
        }
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setResult({ error: "Error de red", details: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[#1B1F2E]" />
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

      <section className="relative z-10 px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <motion.img
              src="/Acta-logo.png"
              alt="ACTA"
              className="mx-auto h-16 w-auto opacity-90"
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={fadeInUp.transition}
            />
            <TextAnimate
              as="h1"
              by="word"
              animation="blurInUp"
              delay={0.1}
              duration={0.6}
              className="mt-4 text-2xl sm:text-3xl font-bold"
              startOnView
              once
            >
              ACTA Demo
            </TextAnimate>
            <TextAnimate
              as="p"
              by="word"
              animation="fadeIn"
              delay={0.2}
              duration={0.5}
              className="text-muted-foreground mt-2"
              startOnView
              once
            >
              View a sample credential and verify it against the API.
            </TextAnimate>
          </div>

          <div className="flex justify-center">
            <motion.div
              className="relative w-full max-w-[920px]"
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={fadeInUp.transition}
            >
              <div className="">
              <DappCredentialCard
                title="ACTA Identity"
                front={{
                  holder: "John Doe",
                  issuedBy: "ACTA",
                  issuedOn: "Jan 15, 2025",
                  expiresOn: "12/25",
                  category: "Identity",
                }}
                backFields={[
                  { k: "Credential ID", v: "cred_demo-1234-identity" },
                  { k: "Standard", v: "W3C Verifiable Credential 2.0" },
                  { k: "Signature", v: "Ed25519 (Stellar)" },
                  { k: "Status", v: "Active" },
                  { k: "On-chain hash", v: "0x8f7a…b21c" },
                ]}
                qrFrontValue={qrTxUrl || ""}
                qrBackValue="https://acta.app/verify/cred_demo-1234-identity"
              />
              </div>
              <motion.div
                className="mt-2 sm:mt-3 flex justify-start"
                initial={fadeInUp.initial}
                animate={fadeInUp.animate}
                transition={{ ...fadeInUp.transition, delay: 0.1 }}
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <ShineBorder
                    shineColor={["#404040", "#808080", "#404040"]}
                    borderWidth={1}
                  />
                  <Button
                    onClick={handleVerify}
                    disabled={loading}
                    className="bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] rounded-2xl h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold shadow-lg transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#404040]/40"
                  >
                    {loading ? "Verificando…" : "Verificar"}
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>ACTA verification</DialogTitle>
          </DialogHeader>

          {!result && (
            <div className="py-4 text-sm text-muted-foreground">
              Processing request…
            </div>
          )}

          {result && result.error && (
            <div className="space-y-3">
              <div className="text-sm">
                Issuer: <span className="text-white/80">Acta</span>
              </div>
              <div className="text-sm">
                Recipient: <span className="text-white/80">Demo User</span>
              </div>
              <div className="text-sm">
                Blockchain:{" "}
                <span className="text-white/80">Stellar / Testnet</span>
              </div>
              <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-destructive text-sm">
                Something went wrong while searching the transaction. Please try
                again later.
                {result.details ? (
                  <div className="mt-2 text-xs opacity-80">
                    {result.details}
                  </div>
                ) : null}
              </div>
            </div>
          )}

          {result && result.success && result.data && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <Field k="Issuer" v="Acta" />
              <Field k="Recipient" v="Demo User" />
              <Field k="Blockchain" v="Stellar / Testnet" />
              <Field k="Issuance contract" v={result.data.contractId} />
              <Field k="Hash" v={result.data.hash} />
              <Field k="Transaction" v={result.data.transactionHash} />
              <Field
                k="Ledger sequence"
                v={String(result.data.ledgerSequence)}
              />
              <Field
                k="Created at"
                v={new Date(result.data.createdAt).toLocaleString()}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Field({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg bg-white/5 px-4 py-3 border border-white/10 break-all">
      <div className="uppercase tracking-wide text-white/60 text-xs">{k}</div>
      <div className="mt-1">{v}</div>
    </div>
  );
}

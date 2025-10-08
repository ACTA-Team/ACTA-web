"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Particles } from "@/components/magicui/particles";
import { ShineBorder } from "@/components/magicui/shine-border";
import DappCredentialCard from "@/components/DappCredentialCard";

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

export default function DemoPage() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerifyResult | null>(null);

  const ACTA_API = process.env.NEXT_PUBLIC_ACTA_API_URL || "http://localhost:8000";

  const handleVerify = async () => {
    setLoading(true);
    setOpen(true);
    setResult(null);

    try {
      const payload = {
        data: {
          credentialSubject: {
            id: "did:acta:demo123",
            name: "Demo User",
          },
          type: ["VerifiableCredential", "DemoCredential"],
          issuer: "Acta",
        },
        metadata: {
          issuer: "Acta",
          subject: "Demo User",
          expirationDate: new Date(Date.now() + 31536000000).toISOString(),
        },
      };

      const res = await fetch(`${ACTA_API}/credentials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) {
        setResult({ error: json?.error || "Request failed", details: json?.details });
      } else {
        setResult(json as VerifyResult);
      }
    } catch (e: any) {
      setResult({ error: "Network error", details: String(e?.message || e) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[#1B1F2E]" />
        <Particles className="absolute inset-0 z-0" quantity={60} staticity={40} ease={70} size={0.4} vx={0} vy={0} color="#ffffff" />
      </div>

      <section className="relative z-10 px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <img src="/Acta-logo.png" alt="ACTA" className="mx-auto h-16 w-auto opacity-90" />
            <h1 className="mt-4 text-2xl sm:text-3xl font-bold">ACTA Demo</h1>
            <p className="text-muted-foreground mt-2">View a sample credential and verify it against the API.</p>
          </div>

          <div className="flex justify-center">
            <div className="relative w-full max-w-5xl">
              <div className="flex items-center justify-center">
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
                  qrFrontValue="https://acta.app/demo/credential/identity-demo"
                  qrBackValue="https://acta.app/verify/cred_demo-1234-identity"
                />
              </div>
              <div className="mt-4 sm:mt-6 flex justify-start">
                <Button
                  onClick={handleVerify}
                  disabled={loading}
                  className="rounded-2xl h-12 px-6 font-semibold text-black bg-gradient-to-br from-[#FFE9A8] via-[#F8D776] to-[#D7B154] shadow-lg shadow-[#D7B154]/30 hover:brightness-105"
                >
                  {loading ? "Verifying…" : "Verify"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chaincert verification</DialogTitle>
          </DialogHeader>

          {!result && (
            <div className="py-4 text-sm text-muted-foreground">Processing request…</div>
          )}

          {result && result.error && (
            <div className="space-y-3">
              <div className="text-sm">Issuer: <span className="text-white/80">Acta</span></div>
              <div className="text-sm">Recipient: <span className="text-white/80">Demo User</span></div>
              <div className="text-sm">Blockchain: <span className="text-white/80">Stellar / Testnet</span></div>
              <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-destructive text-sm">
                Something went wrong while searching the transaction. Please try again later.
                {result.details ? (
                  <div className="mt-2 text-xs opacity-80">{result.details}</div>
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
              <Field k="Ledger sequence" v={String(result.data.ledgerSequence)} />
              <Field k="Created at" v={new Date(result.data.createdAt).toLocaleString()} />
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
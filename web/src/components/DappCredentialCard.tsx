"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { ShineBorder } from "@/components/magicui/shine-border";

type FrontFields = {
  holder: string;
  issuedBy: string;
  issuedOn: string;
  expiresOn: string;
  category: string;
};

type BackField = { k: string; v: string };

type Props = {
  title?: string;
  front: FrontFields;
  backFields: BackField[];
  qrFrontValue?: string;
  qrBackValue?: string;
};

// Visual card inspired by the dApp screenshot, but ensuring
// all fields present in FlipCredential (front + back).
export default function DappCredentialCard({
  title = "Identity Credential",
  front,
  backFields,
  qrFrontValue = "",
  qrBackValue = "",
}: Props) {
  const [flipped, setFlipped] = useState(false);
  const toggle = () => setFlipped((f) => !f);

  // Simple responsive scale for QR and fonts
  const baseW = 920;
  const scale = useMemo(() => 1, []);
  const titleSize = `clamp(16px, ${28 * scale}px, 34px)`;
  const detailsSize = `clamp(13px, ${18 * scale}px, 20px)`;
  const disclaimerSize = `clamp(10px, ${12 * scale}px, 14px)`;

  return (
    <div className="relative mx-auto rounded-2xl" style={{ perspective: 1200 }}>
      <motion.div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        onClick={toggle}
        className="relative select-none rounded-2xl shadow-xl cursor-pointer border border-[#F0E7CC]/30"
        style={{ width: `min(${baseW}px, 92vw)`, aspectRatio: "16 / 9", transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 14, mass: 0.8 }}
      >
        {/* Golden animated border that follows the flip */}
        <ShineBorder
          borderWidth={2}
          duration={12}
          shineColor={["#F0E7CC", "#E9F8D8", "#FFFFFF"]}
          className="rounded-2xl"
        />
        {/* FRONT */}
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl text-white"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #000000 100%)",
              opacity: 0.98,
            }}
          />

          <div className="relative h-full w-full grid grid-cols-1 md:grid-cols-12 gap-4 p-6">
            {/* Left info */}
            <div className="md:col-span-7 flex flex-col">
              <div className="flex items-center gap-3">
                <img src="/Acta-logo.png" alt="ACTA" className="h-8 w-auto opacity-90" />
                <h1 className="font-semibold tracking-wide" style={{ fontSize: titleSize }}>{title}</h1>
              </div>

              <div className="mt-5 space-y-3 font-serif" style={{ fontSize: detailsSize, lineHeight: 1.45 }}>
                <p><span className="text-white/80">Holder:</span> {front.holder}</p>
                <p><span className="text-white/80">Issued by:</span> {front.issuedBy}</p>
                <p><span className="text-white/80">Issued on:</span> {front.issuedOn}</p>
                <p><span className="text-white/80">Expires on:</span> {front.expiresOn}</p>
                <p><span className="text-white/80">Category:</span> {front.category}</p>
              </div>

              <div className="mt-auto pt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full border border-white/20 bg-white/10">✓</span>
                  <span className="text-sm">Verified</span>
                </div>
                <p className="italic text-white/70" style={{ fontSize: disclaimerSize }}>
                  *Demo credential; no legal validity*
                </p>
              </div>
            </div>

            {/* Right QR */}
            <div className="md:col-span-5 flex items-center justify-center">
              {qrFrontValue && (
                <div className="rounded-xl p-4 bg-white/10">
                  <QRCodeSVG value={qrFrontValue} level="M" includeMargin size={280} bgColor="transparent" fgColor="#ffffff" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl text-white"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="absolute inset-0" style={{ background: "linear-gradient(145deg, rgba(20,20,20,0.95), rgba(10,10,10,0.95))" }} />

          <div className="relative h-full w-full grid grid-cols-1 md:grid-cols-12 gap-4 p-6">
            <div className="md:col-span-7">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3" style={{ fontSize: detailsSize }}>
                {backFields.map((f) => (
                  <div key={f.k} className="rounded-lg bg-white/5 px-4 py-3 border border-white/10">
                    <dt className="text-xs uppercase tracking-wide text-white/60">{f.k}</dt>
                    <dd className="mt-1 break-all">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="md:col-span-5 flex items-center justify-center">
              {qrBackValue && (
                <QRCodeSVG value={qrBackValue} level="M" size={220} bgColor="transparent" fgColor="#ffffff" />
              )}
            </div>

            <div className="md:col-span-12 flex items-end">
              <p className="text-white/60">Back • Acta</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
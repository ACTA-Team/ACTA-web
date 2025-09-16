"use client";

import type React from "react";
import { motion } from "framer-motion";
import {
  Card,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { TextAnimate } from "@/components/magicui/text-animate";

import {
  ShieldCheck,
  Webhook,
  CheckCircle2,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};
const staggerChildren = { animate: { transition: { staggerChildren: 0.08 } } };

export default function ValueDetails() {
  return (
    <section className="space-y-10">
      <motion.div
        variants={staggerChildren}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-start"
      >
        {/* Left column - Title */}
        <motion.div {...fadeInUp} className="space-y-5">
          <TextAnimate
            className="text-left text-xl md:text-6xl font-bold"
            animation="slideLeft"
            by="word"
            delay={0.9}
            duration={1.2}
          >
            We are the simplest way to issue verifiable credentials.
          </TextAnimate>
        </motion.div>

        {/* Right column - Tabs */}
        <motion.div {...fadeInUp} className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6">
          <Tabs defaultValue="issuers" className="w-full">
            <TabsList className="grid grid-cols-3 w-full rounded-xl bg-white/5">
              <TabsTrigger 
                value="issuers" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#1B6BFF] data-[state=active]:to-[#8F43FF] data-[state=active]:text-white hover:bg-white/10 transition-all"
              >
                Issuers
              </TabsTrigger>
              <TabsTrigger 
                value="holders" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#1B6BFF] data-[state=active]:to-[#8F43FF] data-[state=active]:text-white hover:bg-white/10 transition-all"
              >
                Holders
              </TabsTrigger>
              <TabsTrigger 
                value="verifiers" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#1B6BFF] data-[state=active]:to-[#8F43FF] data-[state=active]:text-white hover:bg-white/10 transition-all"
              >
                Verifiers
              </TabsTrigger>
            </TabsList>

            <TabsContent value="issuers">
              <PersonaPanel
                icon={<Webhook className="w-5 h-5 text-white/80" />}
                title="For issuers (startups / platforms)"
                bullets={[
                  "Integrate in hours with API/SDK and templates.",
                  "Public state to reduce disputes and fraud.",
                  "Webhooks to automate lifecycle: issued/revoked/expired.",
                ]}
                badge="Build fast"
              />
            </TabsContent>

            <TabsContent value="holders">
              <PersonaPanel
                icon={<ShieldCheck className="w-5 h-5 text-white/80" />}
                title="For holders (end users)"
                bullets={[
                  "Share a link/QR without exposing your data.",
                  "If revoked or expired, verifiers see it immediately.",
                  "Portable across apps and devices.",
                ]}
                badge="Own your proof"
              />
            </TabsContent>

            <TabsContent value="verifiers">
              <PersonaPanel
                icon={<CheckCircle2 className="w-5 h-5 text-white/80" />}
                title="For verifiers (partners / third parties)"
                bullets={[
                  "No account required: open link or drop-in widget.",
                  "Objective verification against the blockchain.",
                  "Clear outcomes: Active · Revoked · Expired.",
                ]}
                badge="Verify instantly"
              />
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </section>
  );
}

function PersonaPanel({
  icon,
  title,
  bullets,
  badge,
}: {
  icon: React.ReactNode;
  title: string;
  bullets: string[];
  badge: string;
}) {
  return (
    <Card className="bg-card/40 backdrop-blur-sm border-border/50 rounded-2xl p-5 md:p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon}
          <h4 className="text-lg font-semibold">{title}</h4>
        </div>
        <Badge className="bg-white/10 text-white border-white/20 rounded-xl">{badge}</Badge>
      </div>
      <ul className="space-y-2 text-sm text-white/70">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#1B6BFF] to-[#8F43FF]" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
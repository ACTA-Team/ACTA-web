"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ShineBorder } from "@/components/magicui/shine-border";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzzawvnn";

type Status = "idle" | "ok" | "error";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  // Honeypot for bots
  const [botField, setBotField] = useState("");

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");

    if (botField) return; // likely a bot

    if (!validateEmail(email)) {
      setStatus("error");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          email,
          company,
          message,
          _gotcha: botField, // honeypot
          _subject: "New waitlist signup · Acta",
          page: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      if (!res.ok) throw new Error("Submission failed");

      // Reset form
      setEmail("");
      setCompany("");
      setMessage("");
      setStatus("ok");
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <ShineBorder
        borderWidth={2}
        duration={12}
        shineColor={["#efb810", "#efb810", "#efb810"]}
        className="rounded-2xl"
      />
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 rounded-2xl relative">
        <CardHeader className="px-8 pt-8 pb-6">
          <CardTitle className="text-3xl text-center mb-3">Join the waitlist</CardTitle>
          <CardDescription className="text-center text-lg">
            Get early access to Acta API and credits for early partners.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Honeypot field (hidden) */}
            <input
              type="text"
              name="_gotcha"
              value={botField}
              onChange={(e) => setBotField(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
              className="bg-input border-border rounded-xl h-12 text-base"
            />

            <Input
              type="text"
              placeholder="Company name (optional)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              aria-label="Company name"
              className="bg-input border-border rounded-xl h-12 text-base"
            />

            <Textarea
              placeholder="Tell us about your use case..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-label="Message"
              className="bg-input border-border rounded-xl min-h-[140px] text-base p-4"
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#efb810] to-[#efb810] text-black hover:from-[#d4a00e] hover:to-[#d4a00e] rounded-2xl h-14 font-semibold text-lg shadow-lg transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#efb810]/40"
            >
              {isSubmitting ? "Submitting..." : "Join Waitlist"}
            </Button>

            {status === "ok" && (
              <p className="text-sm text-green-500 text-center">
                Thank you! We will contact you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-500 text-center">
                Something went wrong. Please check your email and try again.
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqData = [
  {
    question: "What goes on-chain?",
    answer: "Only the hash + status. Your sensitive data stays encrypted off-chain for privacy.",
  },
  {
    question: "Do I need blockchain knowledge?",
    answer: "No, use our API/SDK. We handle all the blockchain complexity for you.",
  },
  {
    question: "Are there templates available?",
    answer:
      "Start from our bases or customize. We provide templates for common use cases like KYC, escrow, and certifications.",
  },
  {
    question: "Is verification public?",
    answer: "Yes, via link or widget. Anyone can verify credentials without needing special access.",
  },
  {
    question: "What about pricing?",
    answer:
      "Coming soon; early partners get credits. We're working on transparent, developer-friendly pricing.",
  },
  {
    question: "How secure is the system?",
    answer:
      "Built on Stellar blockchain with enterprise-grade encryption. Your data is protected both on and off-chain.",
  },
];

export default function FAQ() {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      {faqData.map((faq, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="bg-card/30 rounded-xl border-border/50 px-6"
        >
          <AccordionTrigger className="text-left hover:no-underline">{faq.question}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
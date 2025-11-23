"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "What goes on-chain?",
    answer: "Your credential its safely stored on the Stellar Blockchain.",
  },
  {
    question: "Do I need blockchain knowledge?",
    answer:
      "No, you only need to create a Wallet and we handle all the blockchain complexity for you.",
  },
  {
    question: "Are there templates available?",
    answer:
      "Start from our bases or customize. We provide templates for common use cases like, escrows, contributions badges, certifications and more.",
  },
  {
    question: "Is verification public?",
    answer:
      "Yes. On-chain state makes verification public and tamper-proof via link or QR, independent of the issuer.",
  },
  {
    question: "What about pricing?",
    answer:
      "Super simple: $1 USDC per credential. If you're an early partner, you get free credits or even free tiers.",
  },
  {
    question: "How secure is the system?",
    answer:
      "Built on Stellar blockchain with enterprise-grade encryption. Your data is protected on-chain.",
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
          <AccordionTrigger className="text-left hover:no-underline">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

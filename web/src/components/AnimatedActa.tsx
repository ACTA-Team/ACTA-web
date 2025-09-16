"use client";

import React from "react";
import clsx from "clsx";
import { TextAnimate } from "@/components/magicui/text-animate";


type MeltingWordProps = {
  word?: string;
  as?: React.ElementType;
  className?: string;
  delay?: number;
};

export default function MeltingWord({
  word = "Acta",
  as: Tag = "h1",
  className = "",
  delay = 0.06,
}: MeltingWordProps) {
  return (
    <div className="relative overflow-visible">
      <Tag
        data-text={word}
        className={clsx(
          "relative inline-block font-bold tracking-tight",
          "text-4xl sm:text-6xl lg:text-8xl",
          // main gradient text
          "bg-clip-text text-transparent",
          "bg-[linear-gradient(90deg,var(--primary),var(--accent),var(--primary))]",
          // subtle inner glow via drop-shadow
          "drop-shadow-[0_0_14px_rgba(106,82,255,0.25)]",
          // ---- glow layers (no CSS file needed) ----
          // layer 1 (wider, softer)
          "before:content-[attr(data-text)] before:absolute before:inset-0 before:-z-10",
          "before:bg-[linear-gradient(90deg,var(--primary),var(--accent),var(--primary))]",
          "before:bg-clip-text before:text-transparent before:pointer-events-none",
          "before:blur-[16px] before:opacity-40",
          // layer 2 (tighter, brighter)
          "after:content-[attr(data-text)] after:absolute after:inset-0 after:-z-10",
          "after:bg-[linear-gradient(90deg,var(--primary),var(--accent),var(--primary))]",
          "after:bg-clip-text after:text-transparent after:pointer-events-none",
          "after:blur-[8px] after:opacity-50",
          className
        )}
      >
        {/* Texto animado carácter por carácter: mantiene el mismo gradiente en cada span */}
        <TextAnimate
          animation="blurInUp"
          by="character"
          as="span"
          delay={delay}
          duration={0.5}
          className="relative z-10 inline-block"
          segmentClassName={clsx(
            "inline-block whitespace-pre",
            "bg-clip-text text-transparent",
            "bg-[linear-gradient(90deg,var(--primary),var(--accent),var(--primary))]",
            "drop-shadow-[0_0_14px_rgba(106,82,255,0.25)]"
          )}
          startOnView={false} // anima al montar
          once
          accessible
        >
          {word}
        </TextAnimate>

        
      </Tag>
    </div>
  );
}

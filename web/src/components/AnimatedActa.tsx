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
          // main white text
          "text-white",
          // subtle white glow via drop-shadow
          "drop-shadow-[0_0_14px_rgba(255,255,255,0.25)]",
          // ---- glow layers (no CSS file needed) ----
          // layer 1 (wider, softer)
          "before:content-[attr(data-text)] before:absolute before:inset-0 before:-z-10",
          "before:text-white before:pointer-events-none",
          "before:blur-[16px] before:opacity-40",
          // layer 2 (tighter, brighter)
          "after:content-[attr(data-text)] after:absolute after:inset-0 after:-z-10",
          "after:text-white after:pointer-events-none",
          "after:blur-[8px] after:opacity-50",
          className
        )}
      >
        {/* Animated text character by character: maintains the same gradient on each span */}
        <TextAnimate
          animation="blurInUp"
          by="character"
          as="span"
          delay={delay}
          duration={0.5}
          className="relative z-10 inline-block"
          segmentClassName={clsx(
            "inline-block whitespace-pre",
            "text-white",
            "drop-shadow-[0_0_14px_rgba(255,255,255,0.25)]"
          )}
          startOnView={false} 
          once
          accessible
        >
          {word}
        </TextAnimate>

        
      </Tag>
    </div>
  );
}

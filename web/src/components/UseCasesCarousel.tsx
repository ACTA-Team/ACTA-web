"use client";

import * as React from "react";
import { Marquee } from "@/components/ui/marquee"; // MagicUI component
import {
  BadgeCheck,
  Briefcase,
  Bug,
  Cpu,
  Database,
  FileCheck2,
  FileSignature,
  Fingerprint,
  Flag,
  GraduationCap,
  HeartHandshake,
  Leaf,
  LockKeyhole,
  PackageCheck,
  Receipt,
  ShieldCheck,
  Truck,
  UsersRound,
} from "lucide-react";

// ---------------------------------------------
// Data
// ---------------------------------------------
const cases = [
  {
    Icon: FileCheck2,
    title: "Escrow Completed",
    desc: "Verifiable proof that an escrow or gig was delivered and settled — zero disputes.",
  },
  {
    Icon: Bug,
    title: "Task / Contribution Delivered",
    desc: "Credential for completed tasks or contributions, building real cross-platform reputation.",
  },
  {
    Icon: UsersRound,
    title: "Contributor Reputation",
    desc: "A permanent, verifiable record of user performance in your platform.",
  },
  {
    Icon: BadgeCheck,
    title: "Crowdfunding Deliverable",
    desc: "Proof that a funded milestone or community-backed deliverable was shipped.",
  },
  {
    Icon: Flag,
    title: "Startup Milestone Shipped",
    desc: "Roadmap items delivered and approved — timestamped and verifiable.",
  },
  {
    Icon: HeartHandshake,
    title: "Impact / Donation Proof",
    desc: "Transparent, verifiable proof of where donations went and what was delivered.",
  },
  {
    Icon: Receipt,
    title: "Payment Proof",
    desc: "Credential showing a payout or invoice was actually completed.",
  },
  {
    Icon: Briefcase,
    title: "Role / Membership Verified",
    desc: "Attest real roles, positions, or memberships — without exposing raw PII.",
  },
  {
    Icon: ShieldCheck,
    title: "Release Attestation",
    desc: "Verify published builds, releases, or versions with checksums and signatures.",
  },
  {
    Icon: BadgeCheck,
    title: "Participation Badge",
    desc: "Issue badges for cohorts, hackathons, programs, contributors, power-users and more.",
  },
];



// ---------------------------------------------
// Card
// ---------------------------------------------
function CaseCard({
  Icon,
  title,
  desc,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <div className="min-w-[260px] sm:min-w-[280px] rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm flex-shrink-0">
      <Icon className="mb-3 h-6 w-6 text-white/70" />
      <div className="text-lg font-semibold text-white">{title}</div>
      <div className="mt-1 text-sm text-white/70">{desc}</div>
    </div>
  );
}

// ---------------------------------------------
// Component
// ---------------------------------------------
export type UseCasesCarouselProps = {
  /** Seconds per loop (Row A). Higher = slower. */
  durationSecA?: number;
  /** Seconds per loop (Row B). Higher = slower. */
  durationSecB?: number;
  /** Gap between items (px). */
  gapPx?: number;
  /** Pause animation on hover (desktop). */
  pauseOnHover?: boolean;
  /** Number of internal repeats MagicUI should render. */
  repeat?: number;
  /** Respect prefers-reduced-motion (stop if true). */
  respectReducedMotion?: boolean;
  className?: string;
};

export default function UseCasesCarousel({
  durationSecA = 60, // slower defaults
  durationSecB = 75, // a bit slower for subtle parallax
  gapPx = 16,
  pauseOnHover = true,
  repeat = 4,
  respectReducedMotion = true,
  className = "",
}: UseCasesCarouselProps) {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    if (!respectReducedMotion) return;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(m.matches);
    update();
    m.addEventListener?.("change", update);
    return () => m.removeEventListener?.("change", update);
  }, [respectReducedMotion]);

  const varsA = {
    "--duration": reduced ? "0s" : `${durationSecA}s`,
    "--gap": `${gapPx}px`,
  } as React.CSSProperties;

  const varsB = {
    "--duration": reduced ? "0s" : `${durationSecB}s`,
    "--gap": `${gapPx}px`,
  } as React.CSSProperties;

  return (
    <div
      className={`relative mx-auto max-w-6xl overflow-hidden ${className}`}
      style={{
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
      }}
    >
      {/* Row A (slower) */}
      <Marquee
        className="[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
        pauseOnHover={!!pauseOnHover}
        repeat={repeat}
        style={varsA}
      >
        {cases.map((c, i) => (
          <CaseCard key={`a-${i}`} {...c} />
        ))}
      </Marquee>

      {/* Row B (reverse & even slower for calm feel) */}
      <Marquee
        className="mt-4 opacity-90 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
        reverse
        pauseOnHover={!!pauseOnHover}
        repeat={repeat}
        style={varsB}
      >
        {cases.map((c, i) => (
          <CaseCard key={`b-${i}`} {...c} />
        ))}
      </Marquee>

      {/* Optional hard fades if you prefer them over mask-image */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent" />
    </div>
  );
}

import { ComponentPropsWithoutRef, CSSProperties, FC } from "react";
import { cn } from "@/lib/utils";

export interface AnimatedShinyTextProps
  extends ComponentPropsWithoutRef<"span"> {
  shimmerWidth?: number;
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 140,
  ...props
}) => {
  return (
    <span
      style={{ "--shiny-width": `${shimmerWidth}px` } as CSSProperties}
      className={cn(
        "relative inline-block text-transparent bg-clip-text bg-no-repeat",
        "[background-image:linear-gradient(90deg,transparent,rgba(255,255,255,.35),#1B6BFF,#8F43FF,rgba(255,255,255,.35),transparent)]",
        "[background-size:var(--shiny-width)_100%] [background-position:-200%_0]",
        "animate-shiny-text",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

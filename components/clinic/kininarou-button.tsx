"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface KininarouButtonProps {
  count: number;
  className?: string;
  compact?: boolean;
}

export function KininarouButton({ count, className, compact = false }: KininarouButtonProps) {
  const [active, setActive] = useState(false);
  const [displayCount, setDisplayCount] = useState(count);

  function toggle() {
    setActive((prev) => {
      const next = !prev;
      setDisplayCount(count + (next ? 1 : 0));
      return next;
    });
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle();
      }}
      className={cn(
        "flex items-center gap-1.5 rounded-md border font-medium transition-all duration-200 select-none",
        compact
          ? "px-2 py-1 text-[11px] backdrop-blur-sm"
          : "px-3 py-1.5 text-xs",
        active
          ? "bg-accent border-accent text-white"
          : compact
          ? "bg-black/50 border-white/20 text-white hover:bg-accent hover:border-accent"
          : "bg-white border-ha-border text-ha-text hover:border-accent hover:text-accent",
        className
      )}
      aria-label={active ? "キニナル！解除" : "キニナル！"}
    >
      <span className={cn("leading-none", active && "animate-heartbeat")}>キニナル！</span>
      <span className="leading-none tabular-nums">
        {displayCount.toLocaleString()}
      </span>
    </button>
  );
}

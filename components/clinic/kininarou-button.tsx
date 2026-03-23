"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface KininarouButtonProps {
  count: number;
  className?: string;
}

export function KininarouButton({ count, className }: KininarouButtonProps) {
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
        "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium transition-all duration-200 select-none",
        active
          ? "bg-accent border-accent text-white scale-105"
          : "bg-white border-ha-border text-ha-text hover:border-accent hover:text-accent",
        className
      )}
      aria-label={active ? "キニナル！解除" : "キニナル！"}
    >
      <Heart
        size={14}
        className={cn("transition-all", active && "fill-white animate-[heartbeat_0.3s_ease-in-out]")}
      />
      <span className="font-number">{displayCount.toLocaleString()}</span>
    </button>
  );
}

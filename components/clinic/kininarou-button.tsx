"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface KininarouButtonProps {
  count: number;
  className?: string;
  /** 写真上フローティング配置用の小サイズモード */
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
        "flex items-center gap-1 rounded-full border font-medium transition-all duration-200 select-none",
        compact
          ? "px-2 py-1 text-xs backdrop-blur-sm"
          : "px-3 py-1.5 text-sm",
        active
          ? "bg-accent border-accent text-white scale-105"
          : compact
          ? "bg-black/40 border-white/30 text-white hover:bg-accent hover:border-accent"
          : "bg-white border-ha-border text-ha-text hover:border-accent hover:text-accent",
        className
      )}
      aria-label={active ? "キニナル！解除" : "キニナル！"}
    >
      <Heart
        size={compact ? 12 : 14}
        className={cn(
          "transition-all",
          active && (compact ? "fill-white animate-heartbeat" : "fill-white animate-heartbeat")
        )}
      />
      {/* compact: 押下時のみカウント表示 */}
      {(!compact || active) && (
        <span className="font-number leading-none">
          {displayCount.toLocaleString()}
        </span>
      )}
    </button>
  );
}

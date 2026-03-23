"use client";

import type { Clinic } from "@/src/types/clinic";
import { getOpenStatus } from "@/src/lib/clinics";
import { cn } from "@/lib/utils";

interface ClinicStatusBadgeProps {
  clinic: Clinic;
  className?: string;
}

export function ClinicStatusBadge({ clinic, className }: ClinicStatusBadgeProps) {
  const status = getOpenStatus(clinic);
  return (
    <span
      className={cn(
        "text-xs font-medium px-2 py-0.5 rounded-full",
        status === "open"
          ? "bg-green-50 text-status-open"
          : "bg-red-50 text-status-closed",
        className
      )}
    >
      {status === "open" ? "● 営業中" : "● 休診"}
    </span>
  );
}

"use client";

import type { Clinic, DayKey } from "@/src/types/clinic";
import { cn } from "@/lib/utils";

const DAY_LABELS: Record<DayKey, string> = {
  monday: "月",
  tuesday: "火",
  wednesday: "水",
  thursday: "木",
  friday: "金",
  saturday: "土",
  sunday: "日",
};

const DAY_ORDER: DayKey[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

interface ClinicHoursProps {
  clinic: Clinic;
}

export function ClinicHours({ clinic }: ClinicHoursProps) {
  const today = DAY_ORDER[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];

  return (
    <div className="overflow-hidden rounded-lg border border-ha-border">
      <table className="w-full text-sm">
        <tbody>
          {DAY_ORDER.map((day) => {
            const hours = clinic.openingHours[day];
            const isToday = day === today;
            return (
              <tr
                key={day}
                className={cn(
                  "border-b border-ha-border last:border-0",
                  isToday && "bg-ha-bg-subtle"
                )}
              >
                <td className={cn("w-12 px-4 py-2.5 font-medium", isToday && "text-ha-text font-bold")}>
                  {DAY_LABELS[day]}
                  {isToday && (
                    <span className="ml-1 text-xs text-text-muted">今日</span>
                  )}
                </td>
                <td className="px-4 py-2.5 tabular-nums text-ha-text">
                  {hours ? (
                    <span>
                      {hours.open} – {hours.close}
                    </span>
                  ) : (
                    <span className="text-status-closed">休診</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {clinic.closedDays.length > 0 && (
        <div className="px-4 py-2 bg-ha-bg-subtle text-xs text-text-muted border-t border-ha-border">
          休診日: {clinic.closedDays.join("・")}
        </div>
      )}
    </div>
  );
}

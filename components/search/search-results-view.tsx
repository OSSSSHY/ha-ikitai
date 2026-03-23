"use client";

import { useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import type { Clinic } from "@/src/types/clinic";
import { ClinicCard } from "@/components/clinic/clinic-card";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

interface SearchResultsViewProps {
  clinics: Clinic[];
}

export function SearchResultsView({ clinics }: SearchResultsViewProps) {
  const [viewMode, setViewMode] = useState<"feed" | "grid">("feed");

  return (
    <>
      {/* 件数 + 切り替えボタン */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-text-muted">
          <span className="font-medium text-ha-text">{clinics.length}</span> 件
        </p>
        <div className="flex gap-1 bg-ha-bg-subtle rounded-lg p-1">
          <button
            onClick={() => setViewMode("feed")}
            className={cn(
              "p-1.5 rounded-md transition-all",
              viewMode === "feed" ? "bg-white shadow-sm text-primary" : "text-text-muted hover:text-ha-text"
            )}
            aria-label="フィード表示"
          >
            <List size={16} />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-1.5 rounded-md transition-all",
              viewMode === "grid" ? "bg-white shadow-sm text-primary" : "text-text-muted hover:text-ha-text"
            )}
            aria-label="グリッド表示"
          >
            <LayoutGrid size={16} />
          </button>
        </div>
      </div>

      {clinics.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-4">🔍</p>
          <p className="font-heading font-bold text-ha-text mb-2">条件に合う医院が見つかりません</p>
          <p className="text-text-muted text-sm">フィルター条件を変更してお試しください</p>
        </div>
      ) : viewMode === "feed" ? (
        <Suspense fallback={<div className="space-y-3">{Array.from({length:3}).map((_,i) => <div key={i} className="rounded-2xl bg-ha-bg-subtle animate-pulse h-72"/>)}</div>}>
          <div className="space-y-3">
            {clinics.map((clinic) => (
              <ClinicCard key={clinic.id} clinic={clinic} variant="feed" />
            ))}
          </div>
        </Suspense>
      ) : (
        <Suspense fallback={<div className="grid grid-cols-2 md:grid-cols-3 gap-3">{Array.from({length:6}).map((_,i) => <div key={i} className="rounded-2xl bg-ha-bg-subtle animate-pulse h-56"/>)}</div>}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {clinics.map((clinic) => (
              <ClinicCard key={clinic.id} clinic={clinic} variant="grid" />
            ))}
          </div>
        </Suspense>
      )}
    </>
  );
}

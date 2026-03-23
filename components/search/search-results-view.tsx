"use client";

import type { Clinic } from "@/src/types/clinic";
import { ClinicCard } from "@/components/clinic/clinic-card";
import { Suspense } from "react";

interface SearchResultsViewProps {
  clinics: Clinic[];
}

export function SearchResultsView({ clinics }: SearchResultsViewProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-text-muted">
          <span className="font-bold text-ha-text">{clinics.length}</span> 件
        </p>
      </div>

      {clinics.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-bold text-ha-text mb-2">条件に合う医院が見つかりません</p>
          <p className="text-text-muted text-sm">フィルター条件を変更してお試しください</p>
        </div>
      ) : (
        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-lg bg-ha-bg-subtle animate-pulse h-52" />
              ))}
            </div>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {clinics.map((clinic) => (
              <ClinicCard key={clinic.id} clinic={clinic} />
            ))}
          </div>
        </Suspense>
      )}
    </>
  );
}

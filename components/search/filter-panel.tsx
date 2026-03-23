"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

const SPECIALTIES = [
  "一般歯科",
  "矯正歯科",
  "審美歯科",
  "小児歯科",
  "口腔外科",
  "インプラント",
];

const FEATURES = [
  "キッズスペース",
  "個室あり",
  "駐車場",
  "バリアフリー",
  "土日診療",
  "夜間診療",
  "女性医師",
];

interface FilterPanelProps {
  inline?: boolean;
}

export function FilterPanel({ inline = true }: FilterPanelProps) {
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const activeSpecialties = params.getAll("specialty");
  const activeFeatures = params.getAll("feature");
  const sortBy = params.get("sort") ?? "kininarou";

  function toggleParam(key: string, value: string) {
    const sp = new URLSearchParams(params.toString());
    const current = sp.getAll(key);
    sp.delete(key);
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    next.forEach((v) => sp.append(key, v));
    startTransition(() => router.push(`/search?${sp.toString()}`));
  }

  function setSort(value: string) {
    const sp = new URLSearchParams(params.toString());
    sp.set("sort", value);
    startTransition(() => router.push(`/search?${sp.toString()}`));
  }

  return (
    <div className="space-y-2">
      {/* ソート + 診療科目 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <span className="text-[11px] text-text-muted shrink-0">並び替え</span>
        {[
          { value: "kininarou", label: "キニナル順" },
          { value: "review", label: "クチコミ順" },
        ].map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setSort(value)}
            className={cn(
              "shrink-0 px-3 py-1 rounded-md text-xs font-medium border transition-colors",
              sortBy === value
                ? "bg-ha-text border-ha-text text-white"
                : "bg-white border-ha-border text-text-muted hover:border-ha-text hover:text-ha-text"
            )}
          >
            {label}
          </button>
        ))}
        <span className="text-ha-border shrink-0">|</span>
        {SPECIALTIES.map((s) => (
          <button
            key={s}
            onClick={() => toggleParam("specialty", s)}
            className={cn(
              "shrink-0 px-3 py-1 rounded-md text-xs font-medium border transition-colors",
              activeSpecialties.includes(s)
                ? "bg-ha-text border-ha-text text-white"
                : "bg-white border-ha-border text-text-muted hover:border-ha-text hover:text-ha-text"
            )}
          >
            {s}
          </button>
        ))}
      </div>

      {/* 特徴チップ */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <span className="text-[11px] text-text-muted shrink-0">特徴</span>
        {FEATURES.map((f) => (
          <button
            key={f}
            onClick={() => toggleParam("feature", f)}
            className={cn(
              "shrink-0 px-3 py-1 rounded-md text-xs font-medium border transition-colors",
              activeFeatures.includes(f)
                ? "bg-ha-text border-ha-text text-white"
                : "bg-white border-ha-border text-text-muted hover:border-ha-text hover:text-ha-text"
            )}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}

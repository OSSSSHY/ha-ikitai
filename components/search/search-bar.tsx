"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  compact?: boolean;
  className?: string;
}

const PREFECTURES = ["奈良県", "大阪府", "京都府", "兵庫県", "滋賀県", "和歌山県"];

export function SearchBar({ compact = false, className }: SearchBarProps) {
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useState(params.get("query") ?? "");
  const [prefecture, setPrefecture] = useState(params.get("prefecture") ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const sp = new URLSearchParams();
    if (query) sp.set("query", query);
    if (prefecture) sp.set("prefecture", prefecture);
    startTransition(() => router.push(`/search?${sp.toString()}`));
  }

  if (compact) {
    return (
      <form
        onSubmit={handleSubmit}
        className={cn(
          "flex items-center gap-2 bg-white border border-ha-border rounded-md px-3 py-2",
          className
        )}
      >
        <select
          value={prefecture}
          onChange={(e) => setPrefecture(e.target.value)}
          className="text-sm bg-transparent outline-none text-ha-text border-r border-ha-border pr-2 mr-1"
        >
          <option value="">エリア</option>
          {PREFECTURES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="医院名・地名で検索"
          className="flex-1 text-sm bg-transparent outline-none placeholder-text-muted min-w-0"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-ha-text text-white text-xs font-medium px-3 py-1.5 rounded-md hover:bg-ha-text/85 transition-colors shrink-0"
        >
          検索
        </button>
      </form>
    );
  }

  // ヒーロー用
  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "bg-white rounded-lg p-1.5 flex flex-col sm:flex-row gap-1.5",
        className
      )}
    >
      <div className="flex items-center flex-1 px-3 py-2 border border-ha-border rounded-md">
        <select
          value={prefecture}
          onChange={(e) => setPrefecture(e.target.value)}
          className="flex-1 bg-transparent outline-none text-ha-text text-sm"
        >
          <option value="">都道府県を選ぶ</option>
          {PREFECTURES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center flex-[2] px-3 py-2 border border-ha-border rounded-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="医院名・地名・特徴で検索"
          className="flex-1 bg-transparent outline-none placeholder-text-muted text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-ha-text text-white font-medium px-6 py-2.5 rounded-md hover:bg-ha-text/85 transition-colors"
      >
        検索
      </button>
    </form>
  );
}

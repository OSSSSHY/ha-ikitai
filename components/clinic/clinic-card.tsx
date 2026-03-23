"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, Clock, ChevronRight } from "lucide-react";
import type { Clinic } from "@/src/types/clinic";
import { getOpenStatus } from "@/src/lib/clinics";
import { KininarouButton } from "./kininarou-button";
import { cn } from "@/lib/utils";

interface ClinicCardProps {
  clinic: Clinic;
  className?: string;
  /**
   * "grid" — 2列グリッド用。写真大きめ + オーバーレイテキスト（デフォルト）
   * "feed" — 全幅フィード用。aspect-[4/3] + 最小限フッター
   */
  variant?: "grid" | "feed";
}

export function ClinicCard({ clinic, className, variant = "grid" }: ClinicCardProps) {
  const status = getOpenStatus(clinic);
  const mainImg = clinic.instagramPosts[0]?.mediaUrl ?? clinic.heroImageUrl;

  if (variant === "feed") {
    return (
      <Link
        href={`/clinics/${clinic.slug}`}
        className={cn(
          "block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up",
          className
        )}
      >
        {/* メイン写真（モバイル4:3 / PC3:2） */}
        <div className="relative aspect-[4/3] md:aspect-[3/2] w-full overflow-hidden">
          <Image
            src={mainImg}
            alt={`${clinic.name}の写真`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
          {/* 評価バッジ（右上） */}
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-xs font-number font-semibold px-2 py-1 rounded-full">
            <Star size={11} className="fill-accent text-accent" />
            {clinic.reviewAverage.toFixed(1)}
          </div>
          {/* 営業ステータス（左上） */}
          <div className={cn(
            "absolute top-3 left-3 text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm",
            status === "open"
              ? "bg-status-open/90 text-white"
              : "bg-black/50 text-white/70"
          )}>
            {status === "open" ? "● 営業中" : "● 休診"}
          </div>
          {/* キニナル！（右下） */}
          <div className="absolute bottom-3 right-3">
            <KininarouButton count={clinic.kininarouCount} compact />
          </div>
          {/* 下部グラデーション */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* フッター（最小限） */}
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="min-w-0">
            <h3 className="font-heading font-bold text-ha-text text-base leading-tight truncate">
              {clinic.name}
            </h3>
            <p className="flex items-center gap-1 text-xs text-text-muted mt-0.5">
              <MapPin size={10} />
              {clinic.city}
              {clinic.specialties[0] && (
                <span className="ml-1 px-1.5 py-0.5 bg-ha-bg-subtle rounded text-primary text-[10px]">
                  {clinic.specialties[0]}
                </span>
              )}
            </p>
          </div>
          <ChevronRight size={16} className="text-text-muted shrink-0 ml-2" />
        </div>
      </Link>
    );
  }

  // variant === "grid"
  return (
    <Link
      href={`/clinics/${clinic.slug}`}
      className={cn(
        "block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up",
        className
      )}
    >
      {/* 写真（モバイルh-56 / PCはグリッド幅に応じて拡大） */}
      <div className="relative h-56 md:h-64 overflow-hidden">
        <Image
          src={mainImg}
          alt={`${clinic.name}の写真`}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />

        {/* 下部グラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* 評価（右上） */}
        <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-black/50 backdrop-blur-sm text-white text-xs font-number font-semibold px-1.5 py-0.5 rounded-full">
          <Star size={10} className="fill-accent text-accent" />
          {clinic.reviewAverage.toFixed(1)}
        </div>

        {/* キニナル！（右下、オーバーレイ上） */}
        <div className="absolute bottom-10 right-2">
          <KininarouButton count={clinic.kininarouCount} compact />
        </div>

        {/* テキストオーバーレイ（下部） */}
        <div className="absolute bottom-0 left-0 right-0 p-3 pr-14">
          <h3 className="font-heading font-bold text-white text-sm leading-tight line-clamp-1">
            {clinic.name}
          </h3>
          <div className="flex items-center gap-1 mt-0.5">
            <MapPin size={10} className="text-white/70" />
            <span className="text-white/70 text-xs">{clinic.city}</span>
            <span
              className={cn(
                "ml-1 flex items-center gap-0.5 text-[10px] font-medium",
                status === "open" ? "text-status-open" : "text-white/50"
              )}
            >
              <Clock size={9} />
              {status === "open" ? "営業中" : "休診"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

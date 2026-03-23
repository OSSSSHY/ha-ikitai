"use client";

import Link from "next/link";
import Image from "next/image";
import type { Clinic } from "@/src/types/clinic";
import { getOpenStatus } from "@/src/lib/clinics";
import { cn } from "@/lib/utils";

interface ClinicCardProps {
  clinic: Clinic;
  className?: string;
  sponsored?: boolean;
}

export function ClinicCard({ clinic, className, sponsored = false }: ClinicCardProps) {
  const status = getOpenStatus(clinic);

  // Instagram投稿から最大3枚取得、足りない場合はheroImageで埋める
  const photos: string[] = [];
  for (const post of clinic.instagramPosts) {
    if (photos.length >= 3) break;
    photos.push(post.mediaUrl);
  }
  while (photos.length < 3) {
    photos.push(clinic.heroImageUrl);
  }

  return (
    <Link
      href={`/clinics/${clinic.slug}`}
      className={cn(
        "block bg-white rounded-lg overflow-hidden border border-ha-border hover:border-ha-text/20 hover:shadow-lg transition-all duration-200 animate-fade-in-up",
        className
      )}
    >
      {/* 写真グリッド: 3列 正方形 */}
      <div className="relative grid grid-cols-3 gap-px bg-ha-border">
        {photos.map((url, i) => (
          <div key={i} className="relative aspect-square overflow-hidden bg-ha-bg-subtle">
            <Image
              src={url}
              alt={`${clinic.name}の写真 ${i + 1}`}
              fill
              sizes="(max-width: 768px) 33vw, 12vw"
              className="object-cover"
            />
          </div>
        ))}

        {/* PRバッジ */}
        {sponsored && (
          <div className="absolute top-1.5 left-1.5 bg-ha-text text-white text-[10px] font-bold px-1.5 py-0.5 rounded z-10">
            PR
          </div>
        )}
      </div>

      {/* 医院情報 */}
      <div className="px-3 py-2.5">
        <h3 className="font-bold text-ha-text text-sm leading-tight truncate">
          {clinic.name}
        </h3>
        <div className="flex items-center gap-1.5 mt-1 text-xs text-text-muted">
          <span>{clinic.city}</span>
          {clinic.specialties[0] && (
            <>
              <span className="text-ha-border">|</span>
              <span>{clinic.specialties[0]}</span>
            </>
          )}
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-ha-text">{clinic.reviewAverage.toFixed(1)}</span>
            <span className="text-text-muted">({clinic.reviewCount}件)</span>
          </div>
          <span
            className={cn(
              "text-[11px] font-medium",
              status === "open" ? "text-status-open" : "text-text-muted"
            )}
          >
            {status === "open" ? "営業中" : "休診"}
          </span>
        </div>
      </div>
    </Link>
  );
}

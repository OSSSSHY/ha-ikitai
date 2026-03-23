"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, Clock } from "lucide-react";
import type { Clinic } from "@/src/types/clinic";
import { getOpenStatus } from "@/src/lib/clinics";
import { KininarouButton } from "./kininarou-button";
import { cn } from "@/lib/utils";

interface ClinicCardProps {
  clinic: Clinic;
  className?: string;
}

export function ClinicCard({ clinic, className }: ClinicCardProps) {
  const status = getOpenStatus(clinic);
  const posts = clinic.instagramPosts.slice(0, 3);

  // 画像URLがplaceholderの場合は代替を使う
  const mainImg = posts[0]?.mediaUrl ?? clinic.heroImageUrl;
  const subImg1 = posts[1]?.mediaUrl ?? clinic.thumbnailUrl;
  const subImg2 = posts[2]?.mediaUrl ?? clinic.thumbnailUrl;

  return (
    <Link
      href={`/clinics/${clinic.slug}`}
      className={cn(
        "block bg-white rounded-2xl border border-ha-border overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200",
        className
      )}
    >
      {/* Instagram写真グリッド */}
      <div className="grid grid-cols-3 h-36 bg-ha-bg-subtle">
        <div className="col-span-2 relative border-r border-white/50">
          <Image
            src={mainImg}
            alt={`${clinic.name}の写真`}
            fill
            sizes="(max-width: 768px) 66vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <div className="relative flex-1 border-b border-white/50">
            <Image
              src={subImg1}
              alt=""
              fill
              sizes="(max-width: 768px) 33vw, 16vw"
              className="object-cover"
            />
          </div>
          <div className="relative flex-1">
            <Image
              src={subImg2}
              alt=""
              fill
              sizes="(max-width: 768px) 33vw, 16vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* 医院情報 */}
      <div className="p-3">
        <h3 className="font-heading font-bold text-ha-text text-sm leading-tight mb-1">
          🦷 {clinic.name}
        </h3>

        <div className="flex items-center gap-1 text-xs text-text-muted mb-2">
          <MapPin size={11} />
          <span>{clinic.city}</span>
          {clinic.specialties.slice(0, 2).map((s) => (
            <span key={s} className="ml-1 px-1.5 py-0.5 bg-ha-bg-subtle rounded text-primary text-[10px]">
              {s}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-0.5 text-accent">
              <Star size={11} className="fill-accent" />
              <span className="font-number font-semibold text-ha-text">
                {clinic.reviewAverage.toFixed(1)}
              </span>
              <span className="text-text-muted">({clinic.reviewCount}件)</span>
            </span>
            <span
              className={cn(
                "flex items-center gap-0.5 font-medium",
                status === "open" ? "text-status-open" : "text-status-closed"
              )}
            >
              <Clock size={10} />
              {status === "open" ? "営業中" : "休診"}
            </span>
          </div>
          <KininarouButton count={clinic.kininarouCount} />
        </div>
      </div>
    </Link>
  );
}

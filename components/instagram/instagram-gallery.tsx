"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, X, ChevronLeft, ChevronRight, Instagram } from "lucide-react";
import type { InstagramPost } from "@/src/types/clinic";
import { cn } from "@/lib/utils";

interface InstagramGalleryProps {
  posts: InstagramPost[];
  instagramAccount?: string;
  instagramConnected: boolean;
}

export function InstagramGallery({
  posts,
  instagramAccount,
  instagramConnected,
}: InstagramGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? posts : posts.slice(0, 9);

  if (!instagramConnected || posts.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-ha-border bg-ha-bg-subtle p-8 text-center">
        <Instagram size={36} className="text-text-muted mx-auto mb-3" />
        <p className="text-sm text-text-muted">Instagram投稿がここに表示されます</p>
        {instagramAccount && (
          <a
            href={`https://instagram.com/${instagramAccount.replace("@", "")}`}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <ExternalLink size={13} />
            {instagramAccount} をInstagramで見る
          </a>
        )}
      </div>
    );
  }

  return (
    <div>
      {/* 3列グリッド */}
      <div className="grid grid-cols-3 gap-1">
        {displayed.map((post, i) => (
          <button
            key={post.id}
            onClick={() => setLightboxIndex(i)}
            className="relative aspect-square overflow-hidden rounded-sm group"
          >
            <Image
              src={post.mediaUrl}
              alt={post.caption ?? "Instagram投稿"}
              fill
              sizes="(max-width: 768px) 33vw, 200px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </button>
        ))}
      </div>

      {/* もっと見る */}
      {posts.length > 9 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-3 w-full text-sm text-primary hover:underline"
        >
          {showAll ? "折りたたむ" : `さらに ${posts.length - 9} 件を表示`}
        </button>
      )}

      {/* Instagramリンク */}
      {instagramAccount && (
        <a
          href={`https://instagram.com/${instagramAccount.replace("@", "")}`}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-primary transition-colors"
        >
          <ExternalLink size={13} />
          Instagramで見る
        </a>
      )}

      {/* ライトボックス */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setLightboxIndex(null)}
          >
            <X size={28} />
          </button>

          {lightboxIndex > 0 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) => (i ?? 1) - 1);
              }}
            >
              <ChevronLeft size={36} />
            </button>
          )}

          <div
            className="relative w-full max-w-md aspect-square"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={displayed[lightboxIndex]?.mediaUrl ?? ""}
              alt={displayed[lightboxIndex]?.caption ?? ""}
              fill
              className="object-contain"
            />
          </div>

          {lightboxIndex < displayed.length - 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) => (i ?? 0) + 1);
              }}
            >
              <ChevronRight size={36} />
            </button>
          )}

          {displayed[lightboxIndex]?.caption && (
            <p className="absolute bottom-4 left-0 right-0 text-center text-white text-sm px-8">
              {displayed[lightboxIndex].caption}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

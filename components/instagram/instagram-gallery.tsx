"use client";

import { useState } from "react";
import Image from "next/image";
import type { InstagramPost } from "@/src/types/clinic";

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
      <div className="rounded-lg border-2 border-dashed border-ha-border bg-ha-bg-subtle p-8 text-center">
        <p className="text-sm text-text-muted">Instagram投稿がここに表示されます</p>
        {instagramAccount && (
          <a
            href={`https://instagram.com/${instagramAccount.replace("@", "")}`}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-sm text-primary hover:underline"
          >
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
          className="mt-3 w-full text-sm text-text-muted hover:text-ha-text transition-colors"
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
          className="mt-3 inline-block text-sm text-text-muted hover:text-primary transition-colors"
        >
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
            className="absolute top-4 right-4 text-white/70 hover:text-white text-sm font-medium"
            onClick={() => setLightboxIndex(null)}
          >
            閉じる
          </button>

          {lightboxIndex > 0 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-2xl font-light"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) => (i ?? 1) - 1);
              }}
            >
              ‹
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
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-2xl font-light"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) => (i ?? 0) + 1);
              }}
            >
              ›
            </button>
          )}

          {displayed[lightboxIndex]?.caption && (
            <p className="absolute bottom-4 left-0 right-0 text-center text-white/80 text-sm px-8">
              {displayed[lightboxIndex].caption}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

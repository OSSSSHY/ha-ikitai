"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "ホーム" },
  { href: "/search", label: "さがす" },
  { href: "/map", label: "マップ" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-ha-border">
      <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-between">
        {/* ロゴ */}
        <Link
          href="/"
          className="font-black text-lg tracking-tight text-ha-text"
        >
          ハイキタイ
        </Link>

        {/* デスクトップナビ */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm px-3 py-1.5 rounded-md transition-colors",
                pathname === link.href
                  ? "text-ha-text font-medium bg-ha-bg-subtle"
                  : "text-text-muted hover:text-ha-text"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/search"
            className="ml-3 bg-ha-text text-white text-sm font-medium px-4 py-1.5 rounded-md hover:bg-ha-text/85 transition-colors"
          >
            歯医者を探す
          </Link>
        </nav>

        {/* モバイルメニュー */}
        <button
          className="md:hidden text-sm text-text-muted font-medium"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
        >
          {menuOpen ? "閉じる" : "メニュー"}
        </button>
      </div>

      {/* モバイルドロワー */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-ha-border px-4 py-3 flex flex-col gap-1 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "text-sm font-medium py-2.5 px-2 rounded-md transition-colors",
                pathname === link.href
                  ? "text-ha-text bg-ha-bg-subtle"
                  : "text-text-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

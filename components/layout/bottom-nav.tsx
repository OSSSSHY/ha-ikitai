"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "ホーム" },
  { href: "/search", label: "さがす" },
  { href: "/map", label: "マップ" },
  { href: "/mypage", label: "マイページ" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-ha-border shadow-lg">
      <div className="grid grid-cols-4 h-14 pb-safe">
        {tabs.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative flex items-center justify-center text-xs font-medium transition-colors",
                active ? "text-primary font-bold" : "text-text-muted"
              )}
            >
              {active && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary rounded-full" />
              )}
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

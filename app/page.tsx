import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BottomNav } from "@/components/layout/bottom-nav";
import { ClinicCard } from "@/components/clinic/clinic-card";
import { SearchBar } from "@/components/search/search-bar";
import { getAllClinics, getPopularClinics } from "@/src/lib/clinics";
import { Suspense } from "react";

const SPECIALTIES = [
  { label: "一般歯科", icon: "🦷", query: "一般歯科" },
  { label: "矯正歯科", icon: "✨", query: "矯正歯科" },
  { label: "審美歯科", icon: "💎", query: "審美歯科" },
  { label: "小児歯科", icon: "👶", query: "小児歯科" },
  { label: "インプラント", icon: "⚙️", query: "インプラント" },
  { label: "口腔外科", icon: "🏥", query: "口腔外科" },
];

const AREAS = [
  { label: "奈良県", prefCode: "奈良県" },
  { label: "大阪府", prefCode: "大阪府" },
  { label: "京都府", prefCode: "京都府" },
  { label: "兵庫県", prefCode: "兵庫県" },
  { label: "滋賀県", prefCode: "滋賀県" },
  { label: "和歌山県", prefCode: "和歌山県" },
];

export default function HomePage() {
  const popularClinics = getPopularClinics(6);
  const topClinic = popularClinics[0];
  const allClinics = getAllClinics();

  // Instagram投稿を全医院からflatMapで収集（最大30件）
  const recentPosts = allClinics
    .flatMap((c) =>
      c.instagramPosts.map((p) => ({ ...p, clinicSlug: c.slug, clinicName: c.name }))
    )
    .slice(0, 30);

  return (
    <>
      <Header />

      <main className="pb-20 md:pb-0">
        {/* ===== ヒーローセクション（写真背景） ===== */}
        <section className="relative h-[65vh] min-h-[480px] overflow-hidden">
          {/* 背景写真 */}
          <Image
            src={topClinic.heroImageUrl}
            alt="歯科医院の雰囲気"
            fill
            priority
            sizes="100vw"
            className="object-cover scale-105"
          />
          {/* グラデーションオーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />

          {/* コンテンツ（下部寄せ） */}
          <div className="relative z-10 h-full flex flex-col justify-end px-4 pb-10 max-w-2xl mx-auto w-full">
            <p className="text-primary-light text-xs font-medium mb-2 tracking-wide uppercase opacity-90">
              Instagram × 歯科医院検索
            </p>
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-white leading-tight mb-3 drop-shadow-lg">
              写真で選ぶ、<br />わたしの歯医者さん
            </h1>
            <p className="text-white/75 text-sm md:text-base mb-6 leading-relaxed">
              Instagramの投稿から医院の雰囲気がわかる、新しい歯科医院検索。
            </p>
            <Suspense>
              <SearchBar className="max-w-xl shadow-2xl" />
            </Suspense>
          </div>
        </section>

        {/* ===== 人気の歯医者さん（交互グリッド） ===== */}
        <section className="max-w-5xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading font-bold text-xl text-ha-text">
              🔥 人気の歯医者さん
            </h2>
            <Link
              href="/search"
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              もっと見る <ArrowRight size={14} />
            </Link>
          </div>

          <Suspense
            fallback={
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="rounded-2xl bg-ha-bg-subtle animate-pulse h-64" />
                ))}
              </div>
            }
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
              {/* PRカード（最大3医院・横並び） */}
              {popularClinics.slice(0, 3).map((clinic) => (
                <ClinicCard key={`pr-${clinic.id}`} clinic={clinic} variant="grid" sponsored />
              ))}
              {/* 1枚目: モバイル全幅 / PC 1列目 */}
              <div className="col-span-2 md:col-span-1">
                <ClinicCard clinic={popularClinics[0]} variant="feed" className="h-full" />
              </div>
              {/* 2〜3枚目 */}
              {popularClinics[1] && <ClinicCard clinic={popularClinics[1]} variant="grid" />}
              {popularClinics[2] && <ClinicCard clinic={popularClinics[2]} variant="grid" />}
              {/* 4枚目: モバイル全幅 / PC 1列目 */}
              {popularClinics[3] && (
                <div className="col-span-2 md:col-span-1">
                  <ClinicCard clinic={popularClinics[3]} variant="feed" className="h-full" />
                </div>
              )}
              {/* 5〜6枚目 */}
              {popularClinics[4] && <ClinicCard clinic={popularClinics[4]} variant="grid" />}
              {popularClinics[5] && <ClinicCard clinic={popularClinics[5]} variant="grid" />}
            </div>
          </Suspense>
        </section>

        {/* ===== 最近の投稿（横スクロールフィード） ===== */}
        <section className="py-8 bg-ha-bg-subtle">
          <div className="flex items-center justify-between px-4 mb-4">
            <h2 className="font-heading font-bold text-xl text-ha-text">
              📸 最近の投稿
            </h2>
            <Link href="/search" className="text-sm text-primary hover:underline flex items-center gap-1">
              全て見る <ArrowRight size={14} />
            </Link>
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 pb-2">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/clinics/${post.clinicSlug}`}
                className="shrink-0 relative w-40 h-40 md:w-52 md:h-52 rounded-2xl overflow-hidden group shadow-sm"
              >
                <Image
                  src={post.mediaUrl}
                  alt={post.caption ?? post.clinicName}
                  fill
                  sizes="160px"
                  className="object-cover group-hover:scale-110 transition-transform duration-400"
                />
                {/* 医院名オーバーレイ */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <p className="text-white text-[10px] font-medium leading-tight truncate">
                    {post.clinicName}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ===== エリアから探す ===== */}
        <section className="max-w-5xl mx-auto px-4 py-10">
          <h2 className="font-heading font-bold text-xl text-ha-text mb-5">
            📍 エリアから探す
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {AREAS.map(({ label, prefCode }) => (
              <Link
                key={prefCode}
                href={`/search?prefecture=${encodeURIComponent(prefCode)}`}
                className="flex items-center justify-center gap-1 bg-white border border-ha-border rounded-xl py-3 text-sm font-medium text-ha-text hover:border-primary hover:text-primary hover:bg-ha-bg-subtle transition-colors shadow-sm"
              >
                <MapPin size={12} />
                {label}
              </Link>
            ))}
          </div>
        </section>

        {/* ===== 診療科目から探す ===== */}
        <section className="bg-ha-bg-subtle py-10">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="font-heading font-bold text-xl text-ha-text mb-5">
              🔍 診療科目から探す
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {SPECIALTIES.map(({ label, icon, query }) => (
                <Link
                  key={query}
                  href={`/search?specialty=${encodeURIComponent(query)}`}
                  className="flex flex-col items-center gap-2 bg-white border border-ha-border rounded-2xl py-5 hover:border-primary hover:shadow-md transition-all"
                >
                  <span className="text-2xl">{icon}</span>
                  <span className="text-xs font-medium text-ha-text">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BottomNav />
    </>
  );
}

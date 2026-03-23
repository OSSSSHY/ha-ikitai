import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BottomNav } from "@/components/layout/bottom-nav";
import { ClinicCard } from "@/components/clinic/clinic-card";
import { SearchBar } from "@/components/search/search-bar";
import { getAllClinics, getPopularClinics } from "@/src/lib/clinics";
import { Suspense } from "react";

const SPECIALTIES = [
  { label: "一般歯科", query: "一般歯科" },
  { label: "矯正歯科", query: "矯正歯科" },
  { label: "審美歯科", query: "審美歯科" },
  { label: "小児歯科", query: "小児歯科" },
  { label: "インプラント", query: "インプラント" },
  { label: "口腔外科", query: "口腔外科" },
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

  const totalKininarou = allClinics.reduce((sum, c) => sum + c.kininarouCount, 0);
  const totalReviews = allClinics.reduce((sum, c) => sum + c.reviewCount, 0);

  // Instagram投稿を全医院からflatMapで収集
  const recentPosts = allClinics
    .flatMap((c) =>
      c.instagramPosts.map((p) => ({ ...p, clinicSlug: c.slug, clinicName: c.name }))
    )
    .slice(0, 24);

  return (
    <>
      <Header />

      <main className="pb-16 md:pb-0">
        {/* ===== ヒーロー ===== */}
        <section className="relative h-[48vh] min-h-[380px] max-h-[520px] overflow-hidden">
          <Image
            src={topClinic.heroImageUrl}
            alt="歯科医院の雰囲気"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

          <div className="relative z-10 h-full flex flex-col justify-end px-4 pb-6 max-w-6xl mx-auto w-full">
            <p className="text-white/60 text-xs font-medium mb-1.5 tracking-widest uppercase">
              Dental Clinic Search
            </p>
            <h1 className="font-black text-2xl md:text-4xl text-white leading-tight mb-4">
              写真で選ぶ、わたしの歯医者さん
            </h1>
            <Suspense>
              <SearchBar className="max-w-2xl" />
            </Suspense>
          </div>
        </section>

        {/* ===== 統計バー + カテゴリ ===== */}
        <section className="bg-ha-bg-dark text-white">
          {/* 統計 */}
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-6 md:gap-10 border-b border-white/10">
            <div>
              <span className="text-xl md:text-2xl font-bold">{allClinics.length}</span>
              <span className="text-white/50 text-xs ml-1.5">医院</span>
            </div>
            <div>
              <span className="text-xl md:text-2xl font-bold">{totalKininarou.toLocaleString()}</span>
              <span className="text-white/50 text-xs ml-1.5">キニナル</span>
            </div>
            <div>
              <span className="text-xl md:text-2xl font-bold">{totalReviews.toLocaleString()}</span>
              <span className="text-white/50 text-xs ml-1.5">クチコミ</span>
            </div>
            <div className="ml-auto hidden md:block">
              <Link href="/search" className="text-sm text-white/50 hover:text-white transition-colors">
                すべての医院を見る →
              </Link>
            </div>
          </div>

          {/* カテゴリチップ */}
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <span className="text-xs text-white/40 shrink-0 mr-1">科目</span>
            {SPECIALTIES.map(({ label, query }) => (
              <Link
                key={query}
                href={`/search?specialty=${encodeURIComponent(query)}`}
                className="shrink-0 px-3 py-1.5 text-xs font-medium text-white/70 bg-white/8 border border-white/10 rounded-md hover:bg-white/15 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
            <span className="text-white/15 mx-1 shrink-0">|</span>
            <span className="text-xs text-white/40 shrink-0 mr-1">エリア</span>
            {AREAS.map(({ label, prefCode }) => (
              <Link
                key={prefCode}
                href={`/search?prefecture=${encodeURIComponent(prefCode)}`}
                className="shrink-0 px-3 py-1.5 text-xs font-medium text-white/70 bg-white/8 border border-white/10 rounded-md hover:bg-white/15 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </section>

        {/* ===== 人気の歯医者さん ===== */}
        <section className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex items-baseline justify-between mb-5">
            <div>
              <h2 className="font-bold text-lg text-ha-text">人気の歯医者さん</h2>
              <p className="text-xs text-text-muted mt-0.5">キニナル数の多い医院</p>
            </div>
            <Link href="/search" className="text-sm text-text-muted hover:text-ha-text transition-colors">
              もっと見る →
            </Link>
          </div>

          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-lg bg-ha-bg-subtle animate-pulse h-52" />
                ))}
              </div>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {popularClinics.map((clinic, i) => (
                <ClinicCard
                  key={clinic.id}
                  clinic={clinic}
                  sponsored={i < 3}
                />
              ))}
            </div>
          </Suspense>
        </section>

        {/* ===== 最近の投稿（ダーク背景で写真が映える） ===== */}
        <section className="bg-ha-bg-dark py-10">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-baseline justify-between mb-5">
              <div>
                <h2 className="font-bold text-lg text-white">最近の投稿</h2>
                <p className="text-xs text-white/40 mt-0.5">各医院のInstagram投稿</p>
              </div>
              <Link href="/search" className="text-sm text-white/40 hover:text-white transition-colors">
                全て見る →
              </Link>
            </div>
          </div>

          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide px-4 md:px-[max(1rem,calc((100vw-72rem)/2+1rem))] pb-2">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/clinics/${post.clinicSlug}`}
                className="shrink-0 relative w-36 h-36 md:w-44 md:h-44 rounded-md overflow-hidden group"
              >
                <Image
                  src={post.mediaUrl}
                  alt={post.caption ?? post.clinicName}
                  fill
                  sizes="176px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                  <p className="text-white text-[10px] font-medium leading-tight truncate">
                    {post.clinicName}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ===== エリア + 診療科目（2カラム） ===== */}
        <section className="max-w-6xl mx-auto px-4 py-10">
          <div className="grid md:grid-cols-2 gap-8">
            {/* エリアから探す */}
            <div>
              <h2 className="font-bold text-lg text-ha-text mb-4">エリアから探す</h2>
              <div className="grid grid-cols-3 gap-2">
                {AREAS.map(({ label, prefCode }) => (
                  <Link
                    key={prefCode}
                    href={`/search?prefecture=${encodeURIComponent(prefCode)}`}
                    className="flex items-center justify-center bg-ha-bg-subtle rounded-md py-3 text-sm font-medium text-ha-text hover:bg-ha-text hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* 診療科目から探す */}
            <div>
              <h2 className="font-bold text-lg text-ha-text mb-4">診療科目から探す</h2>
              <div className="grid grid-cols-3 gap-2">
                {SPECIALTIES.map(({ label, query }) => (
                  <Link
                    key={query}
                    href={`/search?specialty=${encodeURIComponent(query)}`}
                    className="flex items-center justify-center bg-ha-bg-subtle rounded-md py-3 text-sm font-medium text-ha-text hover:bg-ha-text hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BottomNav />
    </>
  );
}

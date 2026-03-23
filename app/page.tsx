import Link from "next/link";
import { ArrowRight, MapPin, Smile, ShieldCheck, Star, Sparkles } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BottomNav } from "@/components/layout/bottom-nav";
import { ClinicCard } from "@/components/clinic/clinic-card";
import { SearchBar } from "@/components/search/search-bar";
import { getPopularClinics } from "@/src/lib/clinics";
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

  return (
    <>
      <Header />

      <main className="pb-20 md:pb-0">
        {/* ヒーローセクション */}
        <section className="relative bg-gradient-to-br from-primary-dark via-primary to-primary-light overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-8 left-8 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/20 blur-3xl" />
          </div>

          <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-24">
            <div className="max-w-2xl">
              <p className="text-primary-light text-sm font-medium mb-3 flex items-center gap-1.5">
                <Sparkles size={14} />
                Instagram × 歯科医院検索
              </p>
              <h1 className="font-heading font-bold text-3xl md:text-5xl text-white leading-tight mb-4">
                写真で選ぶ、<br />わたしの歯医者さん
              </h1>
              <p className="text-white/80 text-base md:text-lg mb-8 leading-relaxed">
                Instagramの投稿から、医院の雰囲気がわかる。<br className="hidden md:inline" />
                清潔感・スタッフ・設備を、写真から感じ取ろう。
              </p>

              <Suspense>
                <SearchBar className="max-w-xl" />
              </Suspense>

              <div className="mt-4 flex items-center gap-4 text-white/70 text-xs">
                <span className="flex items-center gap-1"><ShieldCheck size={12} />安心の医院情報</span>
                <span className="flex items-center gap-1"><Star size={12} />クチコミ付き</span>
                <span className="flex items-center gap-1"><MapPin size={12} />奈良県全域対応</span>
              </div>
            </div>
          </div>
        </section>

        {/* 人気の歯医者さん */}
        <section className="max-w-5xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
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

          <Suspense fallback={
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-ha-bg-subtle animate-pulse h-60" />
              ))}
            </div>
          }>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {popularClinics.map((clinic) => (
                <ClinicCard key={clinic.id} clinic={clinic} />
              ))}
            </div>
          </Suspense>
        </section>

        {/* エリアから探す */}
        <section className="bg-ha-bg-subtle py-12">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="font-heading font-bold text-xl text-ha-text mb-6">
              📍 エリアから探す
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {AREAS.map(({ label, prefCode }) => (
                <Link
                  key={prefCode}
                  href={`/search?prefecture=${encodeURIComponent(prefCode)}`}
                  className="flex items-center justify-center gap-1.5 bg-white border border-ha-border rounded-xl py-3 text-sm font-medium text-ha-text hover:border-primary hover:text-primary transition-colors shadow-sm"
                >
                  <MapPin size={13} />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 診療科目から探す */}
        <section className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="font-heading font-bold text-xl text-ha-text mb-6">
            🔍 診療科目から探す
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {SPECIALTIES.map(({ label, icon, query }) => (
              <Link
                key={query}
                href={`/search?specialty=${encodeURIComponent(query)}`}
                className="flex flex-col items-center gap-2 bg-white border border-ha-border rounded-2xl py-5 hover:border-primary hover:shadow-sm transition-all"
              >
                <span className="text-2xl">{icon}</span>
                <span className="text-xs font-medium text-ha-text">{label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* 特徴アピール */}
        <section className="bg-gradient-to-br from-ha-bg-subtle to-white py-12">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="font-heading font-bold text-xl text-ha-text mb-2">
              ハイキタイが選ばれる理由
            </h2>
            <p className="text-text-muted text-sm mb-8">サウナイキタイの「サ活」体験を、歯科に。</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  icon: "📸",
                  title: "ビジュアルファースト",
                  desc: "Instagram投稿から院内の雰囲気・スタッフ・設備を写真で確認できる",
                },
                {
                  icon: "💛",
                  title: "キニナル！",
                  desc: "気になった医院をキニナル！でブックマーク。後で比較検討できる",
                },
                {
                  icon: "🗺️",
                  title: "マップ検索",
                  desc: "現在地から近い歯医者を地図上でまとめて確認・比較できる",
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="bg-white rounded-2xl border border-ha-border p-6 text-left">
                  <div className="text-3xl mb-3">{icon}</div>
                  <h3 className="font-heading font-bold text-ha-text mb-2">{title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{desc}</p>
                </div>
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

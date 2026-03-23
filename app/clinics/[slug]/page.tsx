import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BottomNav } from "@/components/layout/bottom-nav";
import { KininarouButton } from "@/components/clinic/kininarou-button";
import { ClinicStatusBadge } from "@/components/clinic/clinic-status-badge";
import { FloatingKininarou } from "@/components/clinic/floating-kininarou";
import { ClinicHeroImage } from "@/components/clinic/clinic-hero-image";
import { ClinicHours } from "@/components/clinic/clinic-hours";
import { InstagramGallery } from "@/components/instagram/instagram-gallery";
import { ReviewCard } from "@/components/review/review-card";
import { ClinicCard } from "@/components/clinic/clinic-card";
import { getClinicBySlug, getAllClinics } from "@/src/lib/clinics";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const clinics = getAllClinics();
  return clinics.map((c) => ({ slug: c.slug }));
}

export default async function ClinicDetailPage({ params }: Props) {
  const { slug } = await params;
  const clinic = getClinicBySlug(slug);
  if (!clinic) notFound();

  const allClinics = getAllClinics();
  const nearby = allClinics
    .filter((c) => c.id !== clinic.id && c.prefecture === clinic.prefecture)
    .slice(0, 3);

  const heroImg = clinic.instagramPosts[0]?.mediaUrl ?? clinic.heroImageUrl;

  return (
    <>
      <Header />

      <main className="pb-24 md:pb-0">
        {/* ヒーロー写真 */}
        <div className="relative w-full h-[50vh] min-h-[280px] max-h-[500px] bg-ha-bg-subtle overflow-hidden">
          <ClinicHeroImage src={heroImg} alt={clinic.name} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        <div className="max-w-3xl mx-auto px-4">
          {/* 基本情報カード */}
          <div className="bg-white rounded-lg border border-ha-border -mt-10 relative z-10 p-5 mb-8">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h1 className="font-bold text-xl text-ha-text mb-1.5">
                  {clinic.name}
                </h1>
                <div className="flex items-center gap-3 flex-wrap text-sm">
                  <span className="font-bold text-ha-text">{clinic.reviewAverage.toFixed(1)}</span>
                  <span className="text-text-muted text-xs">({clinic.reviewCount}件)</span>
                  <Suspense fallback={<span className="text-xs text-text-muted">--</span>}>
                    <ClinicStatusBadge clinic={clinic} />
                  </Suspense>
                </div>
              </div>
              <KininarouButton count={clinic.kininarouCount} />
            </div>

            <p className="text-sm text-text-muted leading-relaxed mt-3">{clinic.description}</p>

            <div className="mt-4 pt-4 border-t border-ha-border space-y-1.5 text-sm text-ha-text">
              <p>〒{clinic.postalCode} {clinic.prefecture}{clinic.city}{clinic.address}{clinic.building && ` ${clinic.building}`}</p>
              <p>
                <a href={`tel:${clinic.phone}`} className="hover:underline">{clinic.phone}</a>
              </p>
              {clinic.websiteUrl && (
                <p>
                  <a
                    href={clinic.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline"
                  >
                    公式サイト
                  </a>
                </p>
              )}
            </div>
          </div>

          {/* Instagram投稿ギャラリー */}
          <section className="mb-10">
            <h2 className="font-bold text-sm text-text-muted uppercase tracking-wider mb-3">
              Instagram投稿
            </h2>
            <InstagramGallery
              posts={clinic.instagramPosts}
              instagramAccount={clinic.instagramAccount}
              instagramConnected={clinic.instagramConnected}
            />
          </section>

          {/* 診療科目 & 特徴 */}
          <section className="mb-10">
            <h2 className="font-bold text-sm text-text-muted uppercase tracking-wider mb-3">
              診療科目・特徴
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {clinic.specialties.map((s) => (
                <Link
                  key={s}
                  href={`/search?specialty=${encodeURIComponent(s)}`}
                  className="px-3 py-1.5 bg-ha-bg-subtle text-ha-text text-xs font-medium rounded-md hover:bg-ha-text hover:text-white transition-colors"
                >
                  {s}
                </Link>
              ))}
              {clinic.features.map((f) => (
                <span
                  key={f}
                  className="px-3 py-1.5 bg-white border border-ha-border text-text-muted text-xs rounded-md"
                >
                  {f}
                </span>
              ))}
            </div>
          </section>

          {/* 診療時間 */}
          <section className="mb-10">
            <h2 className="font-bold text-sm text-text-muted uppercase tracking-wider mb-3">
              診療時間
            </h2>
            <Suspense fallback={<div className="h-48 bg-ha-bg-subtle rounded-lg animate-pulse" />}>
              <ClinicHours clinic={clinic} />
            </Suspense>
          </section>

          {/* アクセス */}
          <section className="mb-10">
            <h2 className="font-bold text-sm text-text-muted uppercase tracking-wider mb-3">
              アクセス
            </h2>
            <div className="rounded-lg overflow-hidden border border-ha-border bg-ha-bg-subtle h-48 flex items-center justify-center">
              {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
                <iframe
                  src={`https://maps.google.com/maps?q=${clinic.latitude},${clinic.longitude}&z=15&output=embed&hl=ja`}
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              ) : (
                <div className="text-center">
                  <p className="text-sm text-ha-text">{clinic.prefecture}{clinic.city}{clinic.address}</p>
                  {clinic.googleMapsUrl && (
                    <a
                      href={clinic.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-block text-xs text-primary hover:underline"
                    >
                      Google Mapsで開く
                    </a>
                  )}
                </div>
              )}
            </div>
            {clinic.googleMapsUrl && (
              <a
                href={clinic.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-sm text-text-muted hover:text-ha-text transition-colors"
              >
                Google Mapsで開く →
              </a>
            )}
          </section>

          {/* クチコミ */}
          {clinic.reviews.length > 0 && (
            <section className="mb-10">
              <h2 className="font-bold text-sm text-text-muted uppercase tracking-wider mb-3">
                クチコミ ({clinic.reviewCount}件)
              </h2>
              <div className="space-y-2">
                {clinic.reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </section>
          )}

          {/* 近くの医院 */}
          {nearby.length > 0 && (
            <section className="mb-10">
              <h2 className="font-bold text-sm text-text-muted uppercase tracking-wider mb-3">
                近くの歯医者さん
              </h2>
              <Suspense fallback={<div className="h-48 bg-ha-bg-subtle rounded-lg animate-pulse" />}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {nearby.map((c) => (
                    <ClinicCard key={c.id} clinic={c} />
                  ))}
                </div>
              </Suspense>
            </section>
          )}
        </div>
      </main>

      <FloatingKininarou count={clinic.kininarouCount} />
      <Footer />
      <BottomNav />
    </>
  );
}

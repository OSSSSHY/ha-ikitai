import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { MapPin, Phone, Globe, Star, ExternalLink } from "lucide-react";
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
        {/* ヒーロー写真（55vh） */}
        <div className="relative w-full h-[55vh] min-h-[300px] max-h-[600px] bg-ha-bg-subtle overflow-hidden">
          <ClinicHeroImage src={heroImg} alt={clinic.name} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        <div className="max-w-3xl mx-auto px-4">
          {/* 基本情報カード */}
          <div className="bg-white rounded-2xl border border-ha-border shadow-sm -mt-8 relative z-10 p-5 mb-6">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h1 className="font-heading font-bold text-xl text-ha-text mb-1">
                  {clinic.name}
                </h1>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="flex items-center gap-1 text-accent text-sm">
                    <Star size={14} className="fill-accent" />
                    <span className="font-number font-bold">{clinic.reviewAverage.toFixed(1)}</span>
                    <span className="text-text-muted text-xs">({clinic.reviewCount}件)</span>
                  </span>
                  <Suspense fallback={<span className="text-xs text-text-muted">--</span>}>
                    <ClinicStatusBadge clinic={clinic} />
                  </Suspense>
                </div>
              </div>
              <KininarouButton count={clinic.kininarouCount} />
            </div>

            <p className="text-sm text-text-muted leading-relaxed mt-3">{clinic.description}</p>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-start gap-2 text-ha-text">
                <MapPin size={15} className="text-primary mt-0.5 shrink-0" />
                <span>〒{clinic.postalCode} {clinic.prefecture}{clinic.city}{clinic.address}{clinic.building && ` ${clinic.building}`}</span>
              </div>
              <div className="flex items-center gap-2 text-ha-text">
                <Phone size={15} className="text-primary shrink-0" />
                <a href={`tel:${clinic.phone}`} className="hover:underline">{clinic.phone}</a>
              </div>
              {clinic.websiteUrl && (
                <div className="flex items-center gap-2">
                  <Globe size={15} className="text-primary shrink-0" />
                  <a
                    href={clinic.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    公式サイト <ExternalLink size={11} />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Instagram投稿ギャラリー */}
          <section className="mb-8">
            <h2 className="font-heading font-bold text-base text-ha-text mb-3">
              📸 Instagram投稿
            </h2>
            <InstagramGallery
              posts={clinic.instagramPosts}
              instagramAccount={clinic.instagramAccount}
              instagramConnected={clinic.instagramConnected}
            />
          </section>

          {/* 診療科目 & 特徴 */}
          <section className="mb-8">
            <h2 className="font-heading font-bold text-base text-ha-text mb-3">
              🏷️ 診療科目・特徴
            </h2>
            <div className="flex flex-wrap gap-2">
              {clinic.specialties.map((s) => (
                <Link
                  key={s}
                  href={`/search?specialty=${encodeURIComponent(s)}`}
                  className="px-3 py-1.5 bg-ha-bg-subtle border border-primary/20 text-primary text-xs font-medium rounded-full hover:bg-primary hover:text-white transition-colors"
                >
                  {s}
                </Link>
              ))}
              {clinic.features.map((f) => (
                <span
                  key={f}
                  className="px-3 py-1.5 bg-white border border-ha-border text-ha-text text-xs rounded-full"
                >
                  {f}
                </span>
              ))}
            </div>
          </section>

          {/* 診療時間 */}
          <section className="mb-8">
            <h2 className="font-heading font-bold text-base text-ha-text mb-3">
              🕐 診療時間
            </h2>
            <Suspense fallback={<div className="h-48 bg-ha-bg-subtle rounded-lg animate-pulse" />}>
              <ClinicHours clinic={clinic} />
            </Suspense>
          </section>

          {/* アクセス */}
          <section className="mb-8">
            <h2 className="font-heading font-bold text-base text-ha-text mb-3">
              🗺️ アクセス
            </h2>
            <div className="rounded-2xl overflow-hidden border border-ha-border bg-ha-bg-subtle h-48 flex items-center justify-center">
              {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
                <iframe
                  src={`https://maps.google.com/maps?q=${clinic.latitude},${clinic.longitude}&z=15&output=embed&hl=ja`}
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              ) : (
                <div className="text-center">
                  <MapPin size={24} className="text-primary mx-auto mb-2" />
                  <p className="text-sm text-ha-text">{clinic.prefecture}{clinic.city}{clinic.address}</p>
                  {clinic.googleMapsUrl && (
                    <a
                      href={clinic.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      Google Mapsで開く <ExternalLink size={11} />
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
                className="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                <ExternalLink size={13} />
                Google Mapsで開く
              </a>
            )}
          </section>

          {/* クチコミ */}
          {clinic.reviews.length > 0 && (
            <section className="mb-8">
              <h2 className="font-heading font-bold text-base text-ha-text mb-3">
                💬 クチコミ ({clinic.reviewCount}件)
              </h2>
              <div className="space-y-3">
                {clinic.reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </section>
          )}

          {/* 近くの医院 */}
          {nearby.length > 0 && (
            <section className="mb-8">
              <h2 className="font-heading font-bold text-base text-ha-text mb-3">
                📍 近くの歯医者さん
              </h2>
              <Suspense fallback={<div className="h-48 bg-ha-bg-subtle rounded-lg animate-pulse" />}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {nearby.map((c) => (
                    <ClinicCard key={c.id} clinic={c} variant="grid" />
                  ))}
                </div>
              </Suspense>
            </section>
          )}
        </div>
      </main>

      {/* フローティングキニナル！ボタン */}
      <FloatingKininarou count={clinic.kininarouCount} />

      <Footer />
      <BottomNav />
    </>
  );
}

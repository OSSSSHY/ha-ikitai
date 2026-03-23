import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BottomNav } from "@/components/layout/bottom-nav";
import { ClinicCard } from "@/components/clinic/clinic-card";
import { SearchBar } from "@/components/search/search-bar";
import { FilterPanel } from "@/components/search/filter-panel";
import { searchClinics } from "@/src/lib/clinics";

interface SearchPageProps {
  searchParams: Promise<{
    query?: string;
    prefecture?: string;
    specialty?: string | string[];
    feature?: string | string[];
    sort?: string;
  }>;
}

function toArray(val: string | string[] | undefined): string[] {
  if (!val) return [];
  return Array.isArray(val) ? val : [val];
}

async function SearchResults({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const clinics = searchClinics({
    query: params.query,
    prefecture: params.prefecture,
    specialties: toArray(params.specialty),
    features: toArray(params.feature),
    sortBy: (params.sort as "kininarou" | "review") ?? "kininarou",
  });

  const hasFilters =
    params.query ||
    params.prefecture ||
    toArray(params.specialty).length > 0 ||
    toArray(params.feature).length > 0;

  return (
    <>
      <p className="text-sm text-text-muted mb-4">
        {hasFilters ? (
          <>
            <span className="font-medium text-ha-text">{clinics.length}</span> 件の歯科医院が見つかりました
          </>
        ) : (
          <>全 <span className="font-medium text-ha-text">{clinics.length}</span> 件の歯科医院</>
        )}
      </p>

      {clinics.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-4">🔍</p>
          <p className="font-heading font-bold text-ha-text mb-2">条件に合う医院が見つかりません</p>
          <p className="text-text-muted text-sm">フィルター条件を変更してお試しください</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {clinics.map((clinic) => (
            <ClinicCard key={clinic.id} clinic={clinic} />
          ))}
        </div>
      )}
    </>
  );
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <>
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-6 pb-24 md:pb-6">
        {/* 検索バー */}
        <div className="mb-4">
          <Suspense>
            <SearchBar compact />
          </Suspense>
        </div>

        {/* フィルター */}
        <div className="mb-6">
          <Suspense>
            <FilterPanel />
          </Suspense>
        </div>

        {/* 結果 */}
        <Suspense
          fallback={
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-ha-bg-subtle animate-pulse h-60" />
              ))}
            </div>
          }
        >
          <SearchResults searchParams={searchParams} />
        </Suspense>
      </main>

      <Footer />
      <BottomNav />
    </>
  );
}

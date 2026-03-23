import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BottomNav } from "@/components/layout/bottom-nav";
import { SearchBar } from "@/components/search/search-bar";
import { FilterPanel } from "@/components/search/filter-panel";
import { SearchResultsView } from "@/components/search/search-results-view";
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

  return <SearchResultsView clinics={clinics} />;
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <>
      <Header />

      <main className="max-w-5xl mx-auto px-4 pb-24 md:pb-6">
        {/* 検索バー（上部固定） */}
        <div className="sticky top-14 z-30 bg-white/95 backdrop-blur-sm py-3 -mx-4 px-4 border-b border-ha-border">
          <Suspense>
            <SearchBar compact />
          </Suspense>
        </div>

        {/* フィルターバー（スクロール時に追従） */}
        <div className="sticky top-[calc(3.5rem+56px)] z-20 bg-white/95 backdrop-blur-sm py-2 -mx-4 px-4 border-b border-ha-border">
          <Suspense>
            <FilterPanel />
          </Suspense>
        </div>

        {/* 検索結果 */}
        <div className="pt-4">
          <Suspense
            fallback={
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-2xl bg-ha-bg-subtle animate-pulse h-72" />
                ))}
              </div>
            }
          >
            <SearchResults searchParams={searchParams} />
          </Suspense>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </>
  );
}

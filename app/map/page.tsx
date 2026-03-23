import { Header } from "@/components/layout/header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { ClinicMap } from "@/components/map/clinic-map";
import { SearchBar } from "@/components/search/search-bar";
import { getAllClinics } from "@/src/lib/clinics";
import { Suspense } from "react";

export default function MapPage() {
  const clinics = getAllClinics();

  return (
    <>
      {/* コンパクトなヘッダー */}
      <Header />

      <div className="relative h-[calc(100dvh-56px)] flex flex-col">
        {/* 検索バー（マップ上部フローティング） */}
        <div className="absolute top-3 left-3 right-3 z-20">
          <Suspense>
            <SearchBar compact className="shadow-lg" />
          </Suspense>
        </div>

        {/* フルスクリーンマップ */}
        <ClinicMap clinics={clinics} className="flex-1 h-full" />

        {/* モバイル下部ナビ用パディング */}
        <div className="h-16 md:hidden" />
      </div>

      <BottomNav />
    </>
  );
}

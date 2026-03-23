import type { Clinic, ClinicSearchParams, DayKey } from "../types/clinic";
import clinicsData from "../data/clinics.json";

const clinics = clinicsData as Clinic[];

/** 全医院を取得 */
export function getAllClinics(): Clinic[] {
  return clinics;
}

/** slug から医院を取得 */
export function getClinicBySlug(slug: string): Clinic | undefined {
  return clinics.find((c) => c.slug === slug);
}

/** ID から医院を取得 */
export function getClinicById(id: string): Clinic | undefined {
  return clinics.find((c) => c.id === id);
}

/** キニナル数が多い順に上位 N 件を取得 */
export function getPopularClinics(limit = 6): Clinic[] {
  return [...clinics]
    .sort((a, b) => b.kininarouCount - a.kininarouCount)
    .slice(0, limit);
}

/** 検索・フィルター */
export function searchClinics(params: ClinicSearchParams): Clinic[] {
  let results = [...clinics];

  if (params.prefecture) {
    results = results.filter((c) => c.prefecture === params.prefecture);
  }

  if (params.city) {
    results = results.filter((c) => c.city === params.city);
  }

  if (params.query) {
    const q = params.query.toLowerCase();
    results = results.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.nameKana.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q)
    );
  }

  if (params.specialties && params.specialties.length > 0) {
    results = results.filter((c) =>
      params.specialties!.every((s) => c.specialties.includes(s))
    );
  }

  if (params.features && params.features.length > 0) {
    results = results.filter((c) =>
      params.features!.every((f) => c.features.includes(f))
    );
  }

  // ソート
  switch (params.sortBy) {
    case "review":
      results.sort((a, b) => b.reviewAverage - a.reviewAverage);
      break;
    case "distance":
      if (params.lat != null && params.lng != null) {
        results.sort(
          (a, b) =>
            calcDistance(params.lat!, params.lng!, a.latitude, a.longitude) -
            calcDistance(params.lat!, params.lng!, b.latitude, b.longitude)
        );
      }
      break;
    default:
      results.sort((a, b) => b.kininarouCount - a.kininarouCount);
  }

  return results;
}

/** 都道府県の一覧を取得 */
export function getPrefectures(): string[] {
  return [...new Set(clinics.map((c) => c.prefecture))].sort();
}

/** 都市の一覧を取得（都道府県でフィルター可能） */
export function getCities(prefecture?: string): string[] {
  const filtered = prefecture
    ? clinics.filter((c) => c.prefecture === prefecture)
    : clinics;
  return [...new Set(filtered.map((c) => c.city))].sort();
}

/** 現在の営業ステータスを判定 */
export function getOpenStatus(
  clinic: Clinic,
  now = new Date()
): "open" | "closed" | "unknown" {
  const days: DayKey[] = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const dayKey = days[now.getDay()];

  const todayHours = clinic.openingHours[dayKey];
  if (!todayHours) return "closed";

  const [openH, openM] = todayHours.open.split(":").map(Number);
  const [closeH, closeM] = todayHours.close.split(":").map(Number);
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
    return "open";
  }
  return "closed";
}

/** 2点間のおおよその距離 (km) をハバーサイン公式で計算 */
function calcDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

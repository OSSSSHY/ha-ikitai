export interface InstagramPost {
  id: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaUrl: string;
  caption?: string;
  permalink: string;
  timestamp: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  title: string;
  body: string;
  treatmentType: string;
  visitDate: string;
  createdAt: string;
}

export type DayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface OpeningHourSlot {
  open: string;
  close: string;
}

export interface Clinic {
  id: string;
  slug: string;
  name: string;
  nameKana: string;
  description: string;
  postalCode: string;
  prefecture: string;
  city: string;
  address: string;
  building?: string;
  latitude: number;
  longitude: number;
  phone: string;
  websiteUrl?: string;
  googleMapsUrl?: string;
  instagramAccount?: string;
  instagramConnected: boolean;
  instagramPosts: InstagramPost[];
  heroImageUrl: string;
  thumbnailUrl: string;
  specialties: string[];
  features: string[];
  openingHours: Partial<Record<DayKey, OpeningHourSlot | null>>;
  closedDays: string[];
  kininarouCount: number;
  reviewCount: number;
  reviewAverage: number;
  reviews: Review[];
}

/** 検索・フィルター用のクエリパラメータ */
export interface ClinicSearchParams {
  prefecture?: string;
  city?: string;
  query?: string;
  specialties?: string[];
  features?: string[];
  sortBy?: "kininarou" | "review" | "distance";
  lat?: number;
  lng?: number;
}

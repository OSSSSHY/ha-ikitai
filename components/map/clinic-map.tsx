"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Locate } from "lucide-react";
import type { Clinic } from "@/src/types/clinic";
import { ClinicCard } from "@/components/clinic/clinic-card";

interface ClinicMapProps {
  clinics: Clinic[];
  selectedSlug?: string;
  onSelectClinic?: (clinic: Clinic) => void;
  className?: string;
}

/// <reference types="@types/google.maps" />

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any;
    initMap: () => void;
  }
}

export function ClinicMap({ clinics, selectedSlug, onSelectClinic, className }: ClinicMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [selected, setSelected] = useState<Clinic | null>(
    clinics.find((c) => c.slug === selectedSlug) ?? null
  );
  const [apiLoaded, setApiLoaded] = useState(false);
  const [noApiKey, setNoApiKey] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const initMap = useCallback(() => {
    if (!mapRef.current || !window.google) return;

    const center = clinics[0]
      ? { lat: clinics[0].latitude, lng: clinics[0].longitude }
      : { lat: 34.685, lng: 135.805 }; // 奈良市

    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: 12,
      disableDefaultUI: true,
      zoomControl: true,
      styles: [
        { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
        { featureType: "transit", elementType: "labels", stylers: [{ visibility: "off" }] },
      ],
    });

    mapInstanceRef.current = map;

    // マーカー追加
    clinics.forEach((clinic) => {
      const marker = new window.google.maps.Marker({
        position: { lat: clinic.latitude, lng: clinic.longitude },
        map,
        title: clinic.name,
        label: {
          text: "🦷",
          fontSize: "18px",
        },
      });

      marker.addListener("click", () => {
        setSelected(clinic);
        onSelectClinic?.(clinic);
        map.panTo({ lat: clinic.latitude, lng: clinic.longitude });
      });

      markersRef.current.push(marker);
    });
  }, [clinics, onSelectClinic]);

  useEffect(() => {
    if (!apiKey) {
      setNoApiKey(true);
      return;
    }

    if (window.google?.maps) {
      setApiLoaded(true);
      return;
    }

    window.initMap = () => setApiLoaded(true);

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&language=ja`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey]);

  useEffect(() => {
    if (apiLoaded) initMap();
  }, [apiLoaded, initMap]);

  function handleLocate() {
    navigator.geolocation?.getCurrentPosition((pos) => {
      mapInstanceRef.current?.panTo({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
      mapInstanceRef.current?.setZoom(14);
    });
  }

  if (noApiKey) {
    return (
      <div className={`relative bg-ha-bg-subtle rounded-2xl overflow-hidden ${className}`}>
        {/* フォールバック: 静的な医院リスト */}
        <div className="p-4">
          <p className="text-xs text-text-muted mb-3">
            ※ Google Maps API キー未設定のため、リスト表示中
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {clinics.slice(0, 6).map((c) => (
              <ClinicCard key={c.id} clinic={c} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={mapRef} className="w-full h-full rounded-2xl overflow-hidden" />

      {/* 現在地ボタン */}
      <button
        onClick={handleLocate}
        className="absolute bottom-4 right-4 bg-white rounded-full p-3 shadow-md hover:shadow-lg transition-shadow"
        aria-label="現在地"
      >
        <Locate size={18} className="text-primary" />
      </button>

      {/* 選択済み医院のミニカード */}
      {selected && (
        <div className="absolute bottom-4 left-4 right-16 animate-[slideUp_0.2s_ease-out]">
          <ClinicCard clinic={selected} />
        </div>
      )}
    </div>
  );
}

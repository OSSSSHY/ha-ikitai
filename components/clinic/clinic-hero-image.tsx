"use client";

import Image from "next/image";

interface ClinicHeroImageProps {
  src: string;
  alt: string;
}

export function ClinicHeroImage({ src, alt }: ClinicHeroImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority
      className="object-cover"
      sizes="100vw"
    />
  );
}

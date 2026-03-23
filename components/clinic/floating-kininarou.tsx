"use client";

import { KininarouButton } from "./kininarou-button";

interface FloatingKininarouProps {
  count: number;
}

export function FloatingKininarou({ count }: FloatingKininarouProps) {
  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-40 animate-fade-in">
      <KininarouButton count={count} />
    </div>
  );
}

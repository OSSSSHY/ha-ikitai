import { Star } from "lucide-react";
import type { Review } from "@/src/types/clinic";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-xl border border-ha-border p-4">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <p className="font-medium text-sm text-ha-text">{review.userName}</p>
          <p className="text-xs text-text-muted">{review.treatmentType} ・ {review.visitDate}</p>
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={13}
              className={
                i < review.rating
                  ? "fill-accent text-accent"
                  : "fill-none text-ha-border"
              }
            />
          ))}
        </div>
      </div>

      {review.title && (
        <p className="font-semibold text-sm text-ha-text mb-1">{review.title}</p>
      )}
      <p className="text-sm text-ha-text leading-relaxed">{review.body}</p>
    </div>
  );
}

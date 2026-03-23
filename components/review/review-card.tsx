import type { Review } from "@/src/types/clinic";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-lg border border-ha-border p-4">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <p className="font-medium text-sm text-ha-text">{review.userName}</p>
          <p className="text-xs text-text-muted">{review.treatmentType} / {review.visitDate}</p>
        </div>
        <span className="text-sm font-bold text-ha-text tabular-nums shrink-0">
          {review.rating.toFixed(1)}
        </span>
      </div>

      {review.title && (
        <p className="font-medium text-sm text-ha-text mb-1">{review.title}</p>
      )}
      <p className="text-sm text-text-muted leading-relaxed">{review.body}</p>
    </div>
  );
}

import React from "react";

const HomeTestimonialSkeleton = ({ count = 4 }) => {
  return (
    <section className="py-20 bg-secondary/5 overflow-hidden">
      {/* Title Skeleton */}
      <div className="flex justify-center mb-12">
        <div className="h-8 w-56 bg-muted rounded-md animate-pulse" />
      </div>

      {/* Cards Skeleton */}
      <div className="max-w-425 mx-auto grid grid-cols-1 gap-8 px-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col rounded-3xl border border-gray-100 bg-white p-8 shadow-sm animate-pulse"
          >
            {/* Header (Avatar + Name) */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-muted" />

              <div className="space-y-2">
                <div className="h-4 w-28 bg-muted rounded" />
                <div className="h-3 w-20 bg-muted rounded" />
              </div>
            </div>

            {/* Quote Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-muted/60" />
            </div>

            {/* Testimonial Text */}
            <div className="flex-1 mb-6 space-y-3">
              <div className="h-3 w-full bg-muted rounded" />
              <div className="h-3 w-5/6 bg-muted rounded mx-auto" />
              <div className="h-3 w-4/6 bg-muted rounded mx-auto" />
            </div>

            {/* Stars */}
            <div className="flex justify-center gap-2 pt-4 border-t border-gray-100">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-4 rounded-sm bg-muted" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeTestimonialSkeleton;

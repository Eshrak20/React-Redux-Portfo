import React from "react";

const HomeProjectsSkeleton = ({ count = 8 }) => {
  return (
    <section className="py-10 px-5 max-w-425 mx-auto">
      {/* Title Skeleton */}
      <div className="flex justify-center mb-10">
        <div className="h-8 w-48 bg-muted rounded-md animate-pulse" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="bg-card rounded-xl border border-border shadow-lg overflow-hidden animate-pulse"
          >
            {/* Image Skeleton */}
            <div className="h-48 w-full bg-muted relative">
              {/* Status badge */}
              <div className="absolute top-4 right-4 h-6 w-20 rounded-full bg-muted-foreground/20" />
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Project title */}
              <div className="h-5 w-3/4 bg-muted rounded" />

              {/* Tech badges */}
              <div className="flex gap-2 flex-wrap">
                <div className="h-4 w-16 rounded-md bg-muted" />
                <div className="h-4 w-14 rounded-md bg-muted" />
                <div className="h-4 w-20 rounded-md bg-muted" />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="h-3 w-full bg-muted rounded" />
                <div className="h-3 w-5/6 bg-muted rounded" />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-2">
                <div className="h-10 flex-1 rounded-lg bg-muted" />
                <div className="h-10 flex-1 rounded-lg bg-muted" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeProjectsSkeleton;

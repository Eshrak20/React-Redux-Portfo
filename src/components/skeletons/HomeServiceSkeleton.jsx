import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const HomeServiceSkeleton = () => {
    
  return (
    <section
      className="py-24"
      style={{
        "--skeleton": "oklch(91.424% 0.01108 235.152)", // light gray
      }}
    >
      <div className="max-w-425 mx-auto px-6">
        {/* Section Title Skeleton */}
        <div className="text-center mb-16 space-y-6">
          <Skeleton className="h-10 w-72 mx-auto bg-muted" />
          <Skeleton className="h-1.5 w-24 mx-auto rounded-full bg-muted" />
        </div>

        {/* Cards Skeleton Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center p-10 bg-gray-50 border border-gray-200 md:rounded-2xl rounded-md"
            >
              {/* Icon Skeleton */}
              <div className="mb-6">
                <Skeleton className="w-20 h-20 md:rounded-2xl rounded-md bg-muted" />
              </div>

              {/* Title Skeleton */}
              <Skeleton className="h-6 w-40 bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeServiceSkeleton;

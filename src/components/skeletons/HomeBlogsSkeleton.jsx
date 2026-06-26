import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const HomeBlogsSkeleton = () => {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <Skeleton className="h-8 w-48 bg-gray-200" />
        <Skeleton className="h-5 w-32 mt-4 md:mt-0 bg-gray-100" />
      </div>

      {/* Blog Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-white md:rounded-2xl rounded-md shadow-lg border border-gray-100 overflow-hidden"
          >
            {/* Image Skeleton */}
            <div className="relative aspect-video">
              <Skeleton className="w-full h-full bg-gray-200" />
              
              {/* Date Badge */}
              <div className="absolute top-4 left-4">
                <Skeleton className="h-7 w-28 rounded-full bg-white" />
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              
              {/* Category Badge */}
              <Skeleton className="h-6 w-24 rounded-full bg-gray-200" />

              {/* Title */}
              <Skeleton className="h-6 w-full bg-gray-200" />
              <Skeleton className="h-6 w-4/5 bg-gray-200" />

              {/* Excerpt */}
              <Skeleton className="h-4 w-full bg-gray-100" />
              <Skeleton className="h-4 w-full bg-gray-100" />
              <Skeleton className="h-4 w-3/4 bg-gray-100" />

              {/* Footer */}
              <div className="flex items-center justify-between pt-4">
                <Skeleton className="h-5 w-28 bg-gray-200" />
                <Skeleton className="h-4 w-16 bg-gray-100" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeBlogsSkeleton;
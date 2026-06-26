import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const HomeTeamSkeleton = () => {
  return (
    <section className="py-16 md:py-20 px-4 md:px-6 max-w-7xl mx-auto">
      {/* Title Section */}
      <div className="mb-12 md:mb-16 text-center">
        <Skeleton className="h-8 w-56 mx-auto bg-gray-200" />
        <Skeleton className="h-4 w-96 mx-auto mt-4 bg-gray-100" />
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            {/* Image Skeleton */}
            <Skeleton className="h-64 md:h-72 w-full bg-gray-200" />

            {/* Content Skeleton */}
            <div className="p-5 md:p-6 space-y-4">
              {/* Department badge */}
              <Skeleton className="h-6 w-24 rounded-full bg-gray-200" />

              {/* Designation */}
              <Skeleton className="h-3 w-28 bg-gray-100" />

              {/* Name */}
              <Skeleton className="h-6 w-40 bg-gray-200" />

              {/* Skills */}
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-md bg-gray-100" />
                <Skeleton className="h-6 w-20 rounded-md bg-gray-100" />
              </div>

              {/* Bottom Info */}
              <div className="flex justify-between pt-4 border-t border-gray-100">
                <Skeleton className="h-4 w-20 bg-gray-100" />
                <Skeleton className="h-4 w-16 bg-gray-100" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeTeamSkeleton;
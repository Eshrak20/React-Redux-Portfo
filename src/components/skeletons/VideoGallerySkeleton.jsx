import React from "react";

const SkeletonCard = () => {
  return (
    <div className="relative aspect-video rounded-xl overflow-hidden bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
      
      {/* Shimmer */}
      <div className="absolute inset-0 animate-skeleton">
        <div className="absolute -inset-[150%] bg-linear-to-r from-transparent via-white/10 to-transparent rotate-12" />
      </div>

      {/* Fake play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
          <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1" />
        </div>
      </div>

      {/* Fake title */}
      <div className="absolute bottom-3 left-3 right-3">
        <div className="w-3/4 h-3 bg-gray-600 rounded mb-1" />
        <div className="w-1/2 h-2 bg-gray-700 rounded" />
      </div>
    </div>
  );
};

const VideoGallerySkeleton = () => {
  return (
    <section className="px-6 md:px-12 py-24 bg-[#FAFAFA]">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Header Skeleton */}
        <div className="mb-20 text-center">
          <div className="w-40 h-3 bg-gray-300 mx-auto mb-6 rounded" />
          <div className="w-3/4 md:w-1/2 h-10 bg-gray-200 mx-auto mb-6 rounded" />
          <div className="h-1 w-20 bg-gray-300 mx-auto rounded-full" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>

      {/* Skeleton Animation */}
      <style>
        {`
          @keyframes skeleton {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }

          .animate-skeleton {
            animation: skeleton 1.6s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default VideoGallerySkeleton;

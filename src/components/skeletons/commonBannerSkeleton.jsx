import React from "react";

const CommonBannerSkeleton = ({ height = "80vh" }) => {
  return (
    <div
      className="relative w-full overflow-hidden bg-gray-900 animate-pulse"
      style={{ height }}
    >
      {/* Background skeleton */}
      <div className="absolute inset-0 bg-linear-to-b from-gray-800 via-gray-700 to-gray-900" />

      {/* Text skeleton */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
        {/* Subtitle */}
        <div className="h-4 w-40 bg-gray-600 rounded mb-6" />

        {/* Title */}
        <div className="h-12 md:h-20 w-3/4 bg-gray-500 rounded mb-4" />

        {/* Highlight line */}
        <div className="h-10 md:h-16 w-1/2 bg-gray-600 rounded" />
      </div>
    </div>
  );
};

export default CommonBannerSkeleton;

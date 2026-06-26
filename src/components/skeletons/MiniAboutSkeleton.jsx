import React from "react";

const MiniAboutSkeleton = () => {
  return (
    <section className="relative overflow-hidden py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* IMAGE SKELETON */}
          <div className="relative animate-pulse">
            <div className="w-full h-137.5 rounded-[2.5rem] bg-gray-300 dark:bg-gray-700 md:shadow-2xl border border-gray-200 dark:border-gray-600" />
            {/* Badge Placeholder */}
            <div className="absolute bottom-8 left-8 right-8 p-6 md:rounded-2xl rounded-md bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-400 dark:bg-gray-600 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-gray-400 dark:bg-gray-600 rounded" />
                  <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-500 rounded" />
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT SKELETON */}
          <div className="flex flex-col space-y-8">
            <div className="space-y-4 animate-pulse">
              {/* Small Header */}
              <div className="h-3 w-1/4 bg-gray-300 dark:bg-gray-600 rounded" />
              {/* Main Title */}
              <div className="h-8 md:h-12 w-full bg-gray-300 dark:bg-gray-600 rounded" />
              <div className="h-8 md:h-12 w-5/6 bg-gray-300 dark:bg-gray-600 rounded" />
            </div>

            {/* Paragraph */}
            <div className="space-y-2 animate-pulse">
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>

            {/* METRICS GRID */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-6 md:rounded-2xl rounded-md animate-pulse"
                >
                  <div className="h-8 w-12 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
                  <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-600 rounded" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MiniAboutSkeleton;

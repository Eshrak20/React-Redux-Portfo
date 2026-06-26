import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const HomeAboutSkeleton = () => {
  return (
    <section
      className="relative min-h-screen py-20 lg:py-32 bg-background"
      style={{
        "--skeleton": "oklch(91.424% 0.01108 235.152)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="mb-16 lg:mb-24 text-center space-y-4">
          <Skeleton className="h-8 w-40 mx-auto rounded-full bg-muted" />
          <Skeleton className="h-12 w-72 mx-auto bg-muted" />
          <Skeleton className="h-5 w-[420px] mx-auto bg-muted" />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <div className="relative pt-16 lg:pt-20">
            {/* Image Skeleton */}
            <Skeleton className="h-[450px] md:h-[550px] w-full rounded-3xl bg-muted" />

            {/* Floating Badge */}
            <div className="absolute top-0 right-0 lg:-right-6">
              <Skeleton className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-muted" />
            </div>

            {/* Stats Overlay */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[95%] lg:w-full">
              <div className="bg-background/80 backdrop-blur-xl p-6 md:px-10 md:py-8 md:rounded-2xl rounded-md border">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-20 bg-muted" />
                      <Skeleton className="h-8 w-16 bg-muted" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col space-y-8 lg:pt-8">
            {/* Heading + Paragraph */}
            <div className="space-y-4">
              <Skeleton className="h-8 w-full bg-muted" />
              <Skeleton className="h-8 w-5/6 bg-muted" />
              <Skeleton className="h-5 w-full bg-muted" />
              <Skeleton className="h-5 w-11/12 bg-muted" />
              <Skeleton className="h-5 w-4/5 bg-muted" />
            </div>

            {/* Feature Cards */}
            <div className="grid gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 p-5 md:rounded-2xl rounded-md border bg-background"
                >
                  <Skeleton className="h-12 w-12 rounded-xl bg-muted" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-40 bg-muted" />
                    <Skeleton className="h-4 w-full bg-muted" />
                    <Skeleton className="h-4 w-5/6 bg-muted" />
                  </div>
                  <Skeleton className="h-5 w-5 rounded-full bg-muted" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAboutSkeleton;

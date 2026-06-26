import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProjectSkeletons = () => {
  return (
    <div className="bg-white">
      {/* ================= Banner Skeleton ================= */}
      <div className="relative h-[80vh] w-full overflow-hidden bg-black">
        <Skeleton className="absolute inset-0 rounded-none bg-slate-900" />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/60 to-black/90" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center space-y-6">
          <Skeleton className="h-4 w-40 bg-slate-600" />
          <Skeleton className="h-14 w-[280px] md:w-[520px] bg-slate-500" />
          <Skeleton className="h-14 w-[220px] md:w-[420px] bg-slate-500" />
        </div>
      </div>

      {/* ================= Filter Section Skeleton ================= */}
      <div className="relative z-30 -mt-24 px-6">
        <div className="max-w-4xl mx-auto bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className="h-3 w-24 bg-slate-300" />
                <Skeleton className="h-[52px] w-full rounded-none bg-slate-200" />
              </div>
            ))}

            {/* Reset Button */}
            <Skeleton className="h-[52px] w-full rounded-none bg-slate-800" />
          </div>
        </div>
      </div>

      {/* ================= Project Cards Skeleton ================= */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`rounded-3xl overflow-hidden bg-white
                ${i % 2 === 0 ? "md:translate-y-24" : ""}`}
            >
              {/* Image Skeleton */}
              <Skeleton className="h-100 lg:h-125 w-full rounded-none bg-slate-300" />

              {/* Content Skeleton */}
              <div className="p-8 lg:p-10 space-y-4">
                <Skeleton className="h-8 w-3/4 bg-slate-800" />
                <Skeleton className="h-5 w-full bg-slate-400" />
                <Skeleton className="h-5 w-5/6 bg-slate-400" />

                <div className="pt-4 flex justify-between">
                  <Skeleton className="h-4 w-24 bg-slate-500" />
                  <Skeleton className="h-4 w-20 bg-slate-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectSkeletons;

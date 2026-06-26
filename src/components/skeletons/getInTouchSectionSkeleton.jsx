import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const GetInTouchSectionSkeleton = () => {
  return (
    <section className="relative py-24 bg-[#faf9f6] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-[40px] md:shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-200">

          {/* LEFT — FORM SKELETON */}
          <div className="lg:w-3/5 p-8 md:p-16 lg:p-20">
            
            {/* Header */}
            <div className="mb-12 space-y-4">
              <Skeleton className="h-3 w-32 bg-gray-200" />
              <Skeleton className="h-12 w-3/4 bg-gray-300" />
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">

              {/* Input Skeleton */}
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-3 w-24 bg-gray-200" />
                  <Skeleton className="h-10 w-full bg-gray-300 rounded-md" />
                </div>
              ))}

              {/* Message Skeleton */}
              <div className="md:col-span-2 space-y-3">
                <Skeleton className="h-3 w-32 bg-gray-200" />
                <Skeleton className="h-20 w-full bg-gray-300 rounded-md" />
              </div>

              {/* Button Skeleton */}
              <div className="md:col-span-2 pt-4">
                <Skeleton className="h-14 w-56 rounded-full bg-black/80" />
              </div>

            </div>
          </div>

          {/* RIGHT — CONTACT INFO SKELETON */}
          <div className="lg:w-2/5 bg-black p-8 md:p-16 lg:p-20 text-white flex flex-col justify-between">

            {/* Title */}
            <div className="mb-12">
              <Skeleton className="h-10 w-48 bg-gray-700" />
            </div>

            {/* Contact Cards */}
            <div className="space-y-10">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-6 items-center">
                  <Skeleton className="h-14 w-14 md:rounded-2xl rounded-md bg-gray-700" />
                  <div className="space-y-3">
                    <Skeleton className="h-3 w-24 bg-gray-600" />
                    <Skeleton className="h-5 w-40 bg-gray-500" />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Quote */}
            <div className="mt-16 pt-10 border-t border-white/10 space-y-4">
              <Skeleton className="h-4 w-full bg-gray-700" />
              <Skeleton className="h-4 w-3/4 bg-gray-700" />
              <Skeleton className="h-4 w-32 bg-gray-600" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouchSectionSkeleton;

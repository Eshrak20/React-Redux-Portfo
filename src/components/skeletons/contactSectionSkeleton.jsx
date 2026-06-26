import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ContactSectionSkeleton = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-24 bg-[#fafafa]">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT SIDE — CONTENT SKELETON */}
          <div>
            {/* Section Label */}
            <div className="flex items-center gap-3 mb-6">
              <Skeleton className="h-[1px] w-10 bg-gray-300" />
              <Skeleton className="h-3 w-24 bg-gray-300" />
            </div>

            {/* Heading */}
            <div className="space-y-4 mb-12">
              <Skeleton className="h-14 w-3/4 bg-gray-300" />
              <Skeleton className="h-14 w-2/3 bg-gray-200" />
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4 mb-12">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-5 md:rounded-2xl rounded-md border border-gray-200 bg-white"
                >
                  <Skeleton className="h-10 w-10 rounded-full bg-gray-300" />
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-16 bg-gray-300" />
                    <Skeleton className="h-5 w-48 bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-6 pt-6 border-t border-gray-200">
              <Skeleton className="h-3 w-16 bg-gray-300" />
              <div className="flex gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton
                    key={i}
                    className="h-11 w-11 rounded-full bg-gray-300"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — IMAGE SKELETON */}
          <div className="relative">
            <div className="relative rounded-[2rem] overflow-hidden aspect-square">
              <Skeleton className="absolute inset-0 bg-gray-300" />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-white p-8 md:rounded-2xl rounded-md shadow-xl hidden md:block space-y-2">
              <Skeleton className="h-6 w-24 bg-gray-300" />
              <Skeleton className="h-3 w-32 bg-gray-200" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSectionSkeleton;

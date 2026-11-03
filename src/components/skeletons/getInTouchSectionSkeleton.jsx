import { Skeleton } from "@/components/ui/skeleton";

const GetInTouchSectionSkeleton = () => (
  <section className="bg-background px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 space-y-4 sm:mb-10">
        <Skeleton className="h-4 w-28 rounded-none" />
        <Skeleton className="h-10 w-full max-w-xl rounded-none sm:h-12" />
        <Skeleton className="h-4 w-full max-w-2xl rounded-none" />
      </div>
      <div className="grid gap-8 border-y border-border py-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.8fr)] lg:gap-12 lg:py-10">
        <div className="space-y-7">
          <Skeleton className="h-7 w-48 rounded-none" />
          <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="space-y-3">
                <Skeleton className="h-4 w-32 rounded-none" />
                <Skeleton className="h-12 w-full rounded-none" />
              </div>
            ))}
            <div className="space-y-3 sm:col-span-2">
              <Skeleton className="h-4 w-36 rounded-none" />
              <Skeleton className="h-32 w-full rounded-none" />
            </div>
          </div>
          <Skeleton className="h-12 w-44 rounded-none" />
        </div>
        <div className="space-y-6 border-t border-border pt-7 sm:pt-8 lg:border-s lg:border-t-0 lg:ps-8 lg:pt-0">
          <Skeleton className="h-4 w-32 rounded-none" />
          <Skeleton className="h-8 w-56 rounded-none" />
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex gap-4 border-b border-border py-5">
              <Skeleton className="h-6 w-6 rounded-none" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-3 w-20 rounded-none" />
                <Skeleton className="h-5 w-40 max-w-full rounded-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default GetInTouchSectionSkeleton;

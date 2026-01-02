import { DestinationCardSkeleton, GridSkeleton } from "@/components/ui/skeleton";

export default function DestinationsLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section Skeleton */}
      <section className="pt-32 pb-16 px-6 text-center bg-gradient-to-br from-primary/5 via-white to-secondary/5">
        <div className="max-w-4xl mx-auto">
          <div className="h-16 w-3/4 mx-auto bg-muted animate-pulse rounded-lg mb-6" />
          <div className="h-6 w-2/3 mx-auto bg-muted animate-pulse rounded-lg mb-2" />
          <div className="h-6 w-1/2 mx-auto bg-muted animate-pulse rounded-lg" />
        </div>
      </section>

      {/* Destination Filter Skeleton */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 w-28 bg-muted animate-pulse rounded-full" />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destination Skeleton */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="aspect-[4/3] bg-muted animate-pulse rounded-3xl" />
            <div>
              <div className="h-10 w-3/4 bg-muted animate-pulse rounded-lg mb-4" />
              <div className="h-4 w-full bg-muted animate-pulse rounded-lg mb-2" />
              <div className="h-4 w-full bg-muted animate-pulse rounded-lg mb-2" />
              <div className="h-4 w-5/6 bg-muted animate-pulse rounded-lg mb-6" />
              <div className="flex gap-4">
                <div className="h-12 w-32 bg-muted animate-pulse rounded-full" />
                <div className="h-12 w-32 bg-muted animate-pulse rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid Skeleton */}
      <section className="py-16 bg-accent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-10 w-1/3 mx-auto bg-muted animate-pulse rounded-lg mb-12" />
          <GridSkeleton count={6} columns={3}>
            <DestinationCardSkeleton />
          </GridSkeleton>
        </div>
      </section>
    </div>
  );
}

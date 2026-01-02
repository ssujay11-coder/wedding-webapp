import { ServiceCardSkeleton, GridSkeleton } from "@/components/ui/skeleton";

export default function ServicesLoading() {
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

      {/* Services Grid Skeleton */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <GridSkeleton count={6} columns={3}>
            <ServiceCardSkeleton />
          </GridSkeleton>
        </div>
      </section>

      {/* Process Section Skeleton */}
      <section className="py-20 bg-accent">
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-12 w-1/3 mx-auto bg-muted animate-pulse rounded-lg mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 mx-auto bg-muted animate-pulse rounded-full mb-4" />
                <div className="h-6 w-3/4 mx-auto bg-muted animate-pulse rounded-lg mb-2" />
                <div className="h-4 w-full bg-muted animate-pulse rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

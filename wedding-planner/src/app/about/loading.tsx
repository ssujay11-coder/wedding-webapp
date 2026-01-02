import { StatsBarSkeleton, TestimonialSkeleton } from "@/components/ui/skeleton";

export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section Skeleton */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-primary/5 via-white to-secondary/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="h-4 w-32 bg-muted animate-pulse rounded mb-4" />
              <div className="h-14 w-full bg-muted animate-pulse rounded-lg mb-4" />
              <div className="h-14 w-3/4 bg-muted animate-pulse rounded-lg mb-6" />
              <div className="h-5 w-full bg-muted animate-pulse rounded-lg mb-2" />
              <div className="h-5 w-full bg-muted animate-pulse rounded-lg mb-2" />
              <div className="h-5 w-5/6 bg-muted animate-pulse rounded-lg" />
            </div>
            <div className="aspect-[4/5] bg-muted animate-pulse rounded-3xl" />
          </div>
        </div>
      </section>

      {/* Stats Bar Skeleton */}
      <StatsBarSkeleton />

      {/* Story Section Skeleton */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="aspect-square bg-muted animate-pulse rounded-3xl" />
            <div>
              <div className="h-10 w-1/2 bg-muted animate-pulse rounded-lg mb-6" />
              <div className="h-4 w-full bg-muted animate-pulse rounded-lg mb-2" />
              <div className="h-4 w-full bg-muted animate-pulse rounded-lg mb-2" />
              <div className="h-4 w-full bg-muted animate-pulse rounded-lg mb-2" />
              <div className="h-4 w-5/6 bg-muted animate-pulse rounded-lg mb-6" />
              <div className="h-4 w-full bg-muted animate-pulse rounded-lg mb-2" />
              <div className="h-4 w-full bg-muted animate-pulse rounded-lg mb-2" />
              <div className="h-4 w-3/4 bg-muted animate-pulse rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section Skeleton */}
      <section className="py-20 bg-accent">
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-10 w-1/3 mx-auto bg-muted animate-pulse rounded-lg mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl">
                <div className="w-16 h-16 bg-muted animate-pulse rounded-full mb-4" />
                <div className="h-6 w-1/2 bg-muted animate-pulse rounded-lg mb-3" />
                <div className="h-4 w-full bg-muted animate-pulse rounded-lg mb-2" />
                <div className="h-4 w-full bg-muted animate-pulse rounded-lg mb-2" />
                <div className="h-4 w-3/4 bg-muted animate-pulse rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section Skeleton */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-10 w-1/4 mx-auto bg-muted animate-pulse rounded-lg mb-4" />
          <div className="h-5 w-1/2 mx-auto bg-muted animate-pulse rounded-lg mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center">
                <div className="aspect-square bg-muted animate-pulse rounded-2xl mb-4" />
                <div className="h-6 w-3/4 mx-auto bg-muted animate-pulse rounded-lg mb-2" />
                <div className="h-4 w-1/2 mx-auto bg-muted animate-pulse rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section Skeleton */}
      <section className="py-20 bg-accent">
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-10 w-1/3 mx-auto bg-muted animate-pulse rounded-lg mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <TestimonialSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import { CardSkeleton, GridSkeleton } from "@/components/ui/skeleton";

export default function PortfolioLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section Skeleton */}
      <section className="pt-32 pb-16 px-6 text-center bg-gradient-to-br from-primary/5 via-white to-secondary/5">
        <div className="max-w-4xl mx-auto">
          <div className="h-16 w-3/4 mx-auto bg-muted animate-pulse rounded-lg mb-6" />
          <div className="h-6 w-2/3 mx-auto bg-muted animate-pulse rounded-lg" />
        </div>
      </section>

      {/* Filter Tabs Skeleton */}
      <section className="py-8 bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 w-28 bg-muted animate-pulse rounded-full" />
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid Skeleton */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Masonry-style grid simulation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className={`bg-muted animate-pulse rounded-2xl ${
                  i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/3]"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section Skeleton */}
      <section className="py-16 bg-accent">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center">
                <div className="h-12 w-24 mx-auto bg-muted animate-pulse rounded-lg mb-2" />
                <div className="h-5 w-20 mx-auto bg-muted animate-pulse rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

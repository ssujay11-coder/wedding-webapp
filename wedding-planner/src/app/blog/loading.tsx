import { BlogPostSkeleton, GridSkeleton } from "@/components/ui/skeleton";

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Skeleton */}
      <section className="pt-32 pb-16 px-6 text-center bg-gradient-to-br from-primary/5 via-white to-secondary/5">
        <div className="max-w-4xl mx-auto">
          <div className="h-16 w-3/4 mx-auto bg-muted animate-pulse rounded-lg mb-6" />
          <div className="h-6 w-2/3 mx-auto bg-muted animate-pulse rounded-lg" />
        </div>
      </section>

      {/* Category Filter Skeleton */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 w-24 bg-muted animate-pulse rounded-full" />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid Skeleton */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <GridSkeleton count={6} columns={3}>
            <BlogPostSkeleton />
          </GridSkeleton>
        </div>
      </section>
    </div>
  );
}

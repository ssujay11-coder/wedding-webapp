export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section Skeleton */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-primary/5 via-white to-secondary/5">
        <div className="max-w-4xl mx-auto">
          {/* Category & Read Time */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-6 w-32 bg-muted animate-pulse rounded-full" />
            <div className="h-6 w-24 bg-muted animate-pulse rounded-lg" />
          </div>

          {/* Title */}
          <div className="h-14 w-full bg-muted animate-pulse rounded-lg mb-4" />
          <div className="h-14 w-3/4 mx-auto bg-muted animate-pulse rounded-lg mb-6" />

          {/* Excerpt */}
          <div className="h-6 w-full bg-muted animate-pulse rounded-lg mb-2" />
          <div className="h-6 w-2/3 mx-auto bg-muted animate-pulse rounded-lg mb-8" />

          {/* Author & Date */}
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-muted animate-pulse rounded-full" />
              <div className="h-5 w-32 bg-muted animate-pulse rounded-lg" />
            </div>
            <div className="h-5 w-28 bg-muted animate-pulse rounded-lg" />
          </div>
        </div>
      </section>

      {/* Featured Image Skeleton */}
      <div className="max-w-5xl mx-auto px-6 -mt-8 mb-12">
        <div className="aspect-video bg-muted animate-pulse rounded-3xl" />
      </div>

      {/* Content Skeleton */}
      <article className="max-w-4xl mx-auto px-6 pb-16">
        <div className="prose prose-lg max-w-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="mb-6">
              <div className="h-8 w-1/3 bg-muted animate-pulse rounded-lg mb-4" />
              <div className="h-4 w-full bg-muted animate-pulse rounded-lg mb-2" />
              <div className="h-4 w-full bg-muted animate-pulse rounded-lg mb-2" />
              <div className="h-4 w-5/6 bg-muted animate-pulse rounded-lg mb-2" />
              <div className="h-4 w-3/4 bg-muted animate-pulse rounded-lg" />
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}

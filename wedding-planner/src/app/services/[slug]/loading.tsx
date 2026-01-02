export default function ServiceDetailLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section Skeleton */}
      <section className="relative h-[60vh] min-h-[500px] bg-muted animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-4xl">
            <div className="h-6 w-32 bg-white/20 animate-pulse rounded-full mb-4" />
            <div className="h-14 w-3/4 bg-white/20 animate-pulse rounded-lg mb-4" />
            <div className="h-6 w-full max-w-2xl bg-white/20 animate-pulse rounded-lg mb-2" />
            <div className="h-6 w-2/3 bg-white/20 animate-pulse rounded-lg" />
          </div>
        </div>
      </section>

      {/* Content Section Skeleton */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="h-10 w-1/3 bg-muted animate-pulse rounded-lg mb-8" />

              {/* Paragraphs */}
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="mb-6">
                  <div className="h-4 w-full bg-muted animate-pulse rounded-lg mb-2" />
                  <div className="h-4 w-full bg-muted animate-pulse rounded-lg mb-2" />
                  <div className="h-4 w-5/6 bg-muted animate-pulse rounded-lg mb-2" />
                  <div className="h-4 w-3/4 bg-muted animate-pulse rounded-lg" />
                </div>
              ))}

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 mt-12">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-accent rounded-xl">
                    <div className="w-6 h-6 bg-muted animate-pulse rounded-full flex-shrink-0" />
                    <div className="flex-1">
                      <div className="h-5 w-3/4 bg-muted animate-pulse rounded-lg mb-2" />
                      <div className="h-4 w-full bg-muted animate-pulse rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* CTA Card */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 rounded-3xl sticky top-24">
                <div className="h-8 w-3/4 bg-muted animate-pulse rounded-lg mb-4" />
                <div className="h-4 w-full bg-muted animate-pulse rounded-lg mb-2" />
                <div className="h-4 w-5/6 bg-muted animate-pulse rounded-lg mb-6" />
                <div className="h-14 w-full bg-muted animate-pulse rounded-full mb-4" />
                <div className="h-14 w-full bg-muted animate-pulse rounded-full" />

                {/* Features List */}
                <div className="mt-8 pt-8 border-t border-primary/10">
                  <div className="h-5 w-1/2 bg-muted animate-pulse rounded-lg mb-4" />
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-5 bg-muted animate-pulse rounded-full" />
                      <div className="h-4 w-3/4 bg-muted animate-pulse rounded-lg" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services Skeleton */}
      <section className="py-16 bg-accent">
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-10 w-1/3 mx-auto bg-muted animate-pulse rounded-lg mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden">
                <div className="aspect-[4/3] bg-muted animate-pulse" />
                <div className="p-6">
                  <div className="h-6 w-3/4 bg-muted animate-pulse rounded-lg mb-3" />
                  <div className="h-4 w-full bg-muted animate-pulse rounded-lg mb-2" />
                  <div className="h-4 w-2/3 bg-muted animate-pulse rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

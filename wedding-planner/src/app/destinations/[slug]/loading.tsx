export default function DestinationDetailLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section Skeleton */}
      <section className="relative h-[70vh] min-h-[600px] bg-muted animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-6 w-24 bg-white/20 animate-pulse rounded-full" />
              <div className="h-6 w-32 bg-white/20 animate-pulse rounded-full" />
            </div>
            <div className="h-16 w-3/4 bg-white/20 animate-pulse rounded-lg mb-4" />
            <div className="h-6 w-full max-w-2xl bg-white/20 animate-pulse rounded-lg mb-2" />
            <div className="h-6 w-2/3 bg-white/20 animate-pulse rounded-lg mb-8" />
            <div className="flex gap-4">
              <div className="h-14 w-40 bg-white/20 animate-pulse rounded-full" />
              <div className="h-14 w-40 bg-white/20 animate-pulse rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar Skeleton */}
      <section className="py-8 bg-accent border-b">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center">
                <div className="h-8 w-24 mx-auto bg-muted animate-pulse rounded-lg mb-2" />
                <div className="h-4 w-20 mx-auto bg-muted animate-pulse rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview Section Skeleton */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="h-10 w-2/3 bg-muted animate-pulse rounded-lg mb-6" />
              <div className="h-4 w-full bg-muted animate-pulse rounded-lg mb-2" />
              <div className="h-4 w-full bg-muted animate-pulse rounded-lg mb-2" />
              <div className="h-4 w-full bg-muted animate-pulse rounded-lg mb-2" />
              <div className="h-4 w-5/6 bg-muted animate-pulse rounded-lg mb-6" />
              <div className="h-4 w-full bg-muted animate-pulse rounded-lg mb-2" />
              <div className="h-4 w-full bg-muted animate-pulse rounded-lg mb-2" />
              <div className="h-4 w-3/4 bg-muted animate-pulse rounded-lg" />
            </div>
            <div className="aspect-[4/3] bg-muted animate-pulse rounded-3xl" />
          </div>
        </div>
      </section>

      {/* Venues Section Skeleton */}
      <section className="py-16 bg-accent">
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-10 w-1/3 mx-auto bg-muted animate-pulse rounded-lg mb-4" />
          <div className="h-5 w-1/2 mx-auto bg-muted animate-pulse rounded-lg mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden">
                <div className="aspect-[4/3] bg-muted animate-pulse" />
                <div className="p-6">
                  <div className="h-6 w-3/4 bg-muted animate-pulse rounded-lg mb-3" />
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-4 h-4 bg-muted animate-pulse rounded" />
                    <div className="h-4 w-1/2 bg-muted animate-pulse rounded-lg" />
                  </div>
                  <div className="h-4 w-full bg-muted animate-pulse rounded-lg mb-2" />
                  <div className="h-4 w-2/3 bg-muted animate-pulse rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section Skeleton */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-10 w-1/2 mx-auto bg-muted animate-pulse rounded-lg mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-6 bg-accent rounded-2xl">
                <div className="w-14 h-14 bg-muted animate-pulse rounded-full mb-4" />
                <div className="h-6 w-3/4 bg-muted animate-pulse rounded-lg mb-3" />
                <div className="h-4 w-full bg-muted animate-pulse rounded-lg mb-2" />
                <div className="h-4 w-full bg-muted animate-pulse rounded-lg mb-2" />
                <div className="h-4 w-2/3 bg-muted animate-pulse rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section Skeleton */}
      <section className="py-16 bg-accent">
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-10 w-1/4 mx-auto bg-muted animate-pulse rounded-lg mb-12" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`bg-muted animate-pulse rounded-xl ${
                  i === 0 || i === 5 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-white to-secondary/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="h-12 w-3/4 mx-auto bg-muted animate-pulse rounded-lg mb-6" />
          <div className="h-5 w-2/3 mx-auto bg-muted animate-pulse rounded-lg mb-8" />
          <div className="h-14 w-48 mx-auto bg-muted animate-pulse rounded-full" />
        </div>
      </section>
    </div>
  );
}

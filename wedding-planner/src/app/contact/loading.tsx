export default function ContactLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section Skeleton */}
      <section className="pt-32 pb-16 px-6 text-center bg-gradient-to-br from-primary/5 via-white to-secondary/5">
        <div className="max-w-4xl mx-auto">
          <div className="h-16 w-3/4 mx-auto bg-muted animate-pulse rounded-lg mb-6" />
          <div className="h-6 w-2/3 mx-auto bg-muted animate-pulse rounded-lg mb-8" />

          {/* Quick Stats Skeleton */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-muted animate-pulse rounded-full mx-auto mb-2" />
                <div className="h-8 w-16 mx-auto bg-muted animate-pulse rounded-lg mb-1" />
                <div className="h-4 w-20 mx-auto bg-muted animate-pulse rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section Skeleton */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info Sidebar Skeleton */}
            <div className="lg:col-span-1 space-y-8">
              {/* Contact Details Card */}
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-3xl">
                <div className="h-8 w-1/2 bg-muted animate-pulse rounded-lg mb-6" />
                <div className="space-y-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-11 h-11 bg-muted animate-pulse rounded-xl flex-shrink-0" />
                      <div className="flex-1">
                        <div className="h-3 w-16 bg-muted animate-pulse rounded mb-2" />
                        <div className="h-5 w-full bg-muted animate-pulse rounded-lg" />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Social Media Skeleton */}
                <div className="mt-8 pt-8 border-t border-primary/10">
                  <div className="h-3 w-20 bg-muted animate-pulse rounded mb-4" />
                  <div className="flex gap-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="w-12 h-12 bg-muted animate-pulse rounded-xl" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Join Team Card Skeleton */}
              <div className="bg-muted p-8 rounded-3xl">
                <div className="h-8 w-2/3 bg-muted-foreground/20 animate-pulse rounded-lg mb-4" />
                <div className="h-4 w-full bg-muted-foreground/20 animate-pulse rounded-lg mb-2" />
                <div className="h-4 w-3/4 bg-muted-foreground/20 animate-pulse rounded-lg mb-6" />
                <div className="h-5 w-24 bg-muted-foreground/20 animate-pulse rounded-lg" />
              </div>

              {/* Office Hours Skeleton */}
              <div className="bg-white p-8 rounded-3xl border border-border">
                <div className="h-6 w-1/2 bg-muted animate-pulse rounded-lg mb-4" />
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex justify-between">
                      <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                      <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form Skeleton */}
            <div className="lg:col-span-2">
              {/* Form Type Toggle */}
              <div className="flex justify-center gap-4 mb-8">
                <div className="h-12 w-32 bg-muted animate-pulse rounded-full" />
                <div className="h-12 w-36 bg-muted animate-pulse rounded-full" />
              </div>

              {/* Form Skeleton */}
              <div className="bg-white p-8 rounded-3xl border border-border">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="h-4 w-20 bg-muted animate-pulse rounded mb-2" />
                      <div className="h-12 w-full bg-muted animate-pulse rounded-xl" />
                    </div>
                    <div>
                      <div className="h-4 w-20 bg-muted animate-pulse rounded mb-2" />
                      <div className="h-12 w-full bg-muted animate-pulse rounded-xl" />
                    </div>
                  </div>
                  <div>
                    <div className="h-4 w-16 bg-muted animate-pulse rounded mb-2" />
                    <div className="h-12 w-full bg-muted animate-pulse rounded-xl" />
                  </div>
                  <div>
                    <div className="h-4 w-16 bg-muted animate-pulse rounded mb-2" />
                    <div className="h-12 w-full bg-muted animate-pulse rounded-xl" />
                  </div>
                  <div>
                    <div className="h-4 w-20 bg-muted animate-pulse rounded mb-2" />
                    <div className="h-32 w-full bg-muted animate-pulse rounded-xl" />
                  </div>
                  <div className="h-14 w-full bg-muted animate-pulse rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

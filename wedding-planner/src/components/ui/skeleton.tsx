"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 bg-[length:200%_100%]",
        className
      )}
    />
  );
}

// Card skeleton for portfolio/blog items
export function CardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-sm border border-border">
      <Skeleton className="h-64 w-full rounded-none" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

// Hero skeleton
export function HeroSkeleton() {
  return (
    <div className="relative h-screen w-full bg-gradient-to-b from-primary/5 to-background">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-6 px-4 max-w-4xl">
          <Skeleton className="h-4 w-48 mx-auto" />
          <Skeleton className="h-16 w-full max-w-2xl mx-auto" />
          <Skeleton className="h-16 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-2/3 mx-auto" />
          <div className="flex justify-center gap-4 pt-4">
            <Skeleton className="h-14 w-40 rounded-full" />
            <Skeleton className="h-14 w-32 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Service card skeleton
export function ServiceCardSkeleton() {
  return (
    <div className="p-8 rounded-3xl bg-white border border-border">
      <Skeleton className="h-14 w-14 rounded-2xl mb-6" />
      <Skeleton className="h-8 w-3/4 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-6" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  );
}

// Destination card skeleton
export function DestinationCardSkeleton() {
  return (
    <div className="relative rounded-3xl overflow-hidden">
      <Skeleton className="h-80 w-full" />
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
        <Skeleton className="h-6 w-32 mb-2 bg-white/20" />
        <Skeleton className="h-4 w-48 bg-white/20" />
      </div>
    </div>
  );
}

// Blog post skeleton
export function BlogPostSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-32">
      <Skeleton className="h-[60vh] w-full rounded-2xl mb-8" />
      <div className="space-y-4">
        <div className="flex gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-3/4" />
        <div className="flex items-center gap-4 py-8">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div>
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <div className="space-y-4 pt-8">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    </div>
  );
}

// Testimonial skeleton
export function TestimonialSkeleton() {
  return (
    <div className="p-8 rounded-3xl bg-white border border-border">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-5 w-5" />
        ))}
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-6" />
      <div className="flex items-center gap-3">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div>
          <Skeleton className="h-5 w-32 mb-1" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}

// Grid skeleton for multiple cards
export function GridSkeleton({
  count = 6,
  columns = 3,
  children
}: {
  count?: number;
  columns?: number;
  children?: React.ReactNode;
}) {
  const colsClass = columns === 4
    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
    : columns === 2
    ? "grid-cols-1 md:grid-cols-2"
    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid ${colsClass} gap-8`}>
      {[...Array(count)].map((_, i) => (
        children ? <div key={i}>{children}</div> : <CardSkeleton key={i} />
      ))}
    </div>
  );
}

// Stats bar skeleton
export function StatsBarSkeleton() {
  return (
    <div className="w-full py-16 bg-gradient-to-r from-primary/5 via-white to-primary/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="text-center">
              <Skeleton className="h-12 w-20 mx-auto mb-2" />
              <Skeleton className="h-4 w-24 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

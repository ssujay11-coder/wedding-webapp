import { createClient } from "@/lib/supabase/client";

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Error types
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = "APIError";
  }
}

export class NetworkError extends Error {
  constructor(message: string = "Network error occurred") {
    super(message);
    this.name = "NetworkError";
  }
}

export class AuthError extends Error {
  constructor(message: string = "Authentication required") {
    super(message);
    this.name = "AuthError";
  }
}

// Retry configuration
interface RetryConfig {
  maxRetries?: number;
  retryDelay?: number;
  retryOn?: (error: Error) => boolean;
}

const defaultRetryConfig: RetryConfig = {
  maxRetries: 3,
  retryDelay: 1000,
  retryOn: (error) => error instanceof NetworkError,
};

// Sleep utility
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Retry wrapper
export async function withRetry<T>(
  fn: () => Promise<T>,
  config: RetryConfig = {}
): Promise<T> {
  const { maxRetries, retryDelay, retryOn } = { ...defaultRetryConfig, ...config };
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries!; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt < maxRetries! && retryOn!(lastError)) {
        console.log(`Retry attempt ${attempt + 1}/${maxRetries}`);
        await sleep(retryDelay! * Math.pow(2, attempt)); // Exponential backoff
      }
    }
  }

  throw lastError!;
}

// Cache wrapper
export async function withCache<T>(
  key: string,
  fn: () => Promise<T>,
  ttl: number = CACHE_TTL
): Promise<T> {
  const cached = cache.get(key);

  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data as T;
  }

  const data = await fn();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}

// Clear cache
export function clearCache(keyPattern?: string) {
  if (keyPattern) {
    for (const key of cache.keys()) {
      if (key.includes(keyPattern)) {
        cache.delete(key);
      }
    }
  } else {
    cache.clear();
  }
}

// Supabase query wrapper with error handling
export async function supabaseQuery<T>(
  queryFn: (supabase: ReturnType<typeof createClient>) => Promise<{ data: T | null; error: any }>
): Promise<T> {
  const supabase = createClient();

  try {
    const { data, error } = await queryFn(supabase);

    if (error) {
      if (error.code === "PGRST116") {
        throw new APIError("Resource not found", 404, error.code);
      }
      if (error.code === "23505") {
        throw new APIError("Resource already exists", 409, error.code);
      }
      if (error.message?.includes("JWT")) {
        throw new AuthError("Session expired. Please log in again.");
      }
      throw new APIError(error.message || "Database error", 500, error.code);
    }

    if (data === null) {
      throw new APIError("No data returned", 404);
    }

    return data;
  } catch (error) {
    if (error instanceof APIError || error instanceof AuthError) {
      throw error;
    }
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new NetworkError();
    }
    throw new APIError((error as Error).message || "Unknown error");
  }
}

// Fetch destinations with caching and retry
export async function fetchDestinations(options: { featured?: boolean } = {}) {
  const cacheKey = `destinations:${JSON.stringify(options)}`;

  return withCache(cacheKey, async () => {
    return withRetry(async () => {
      return supabaseQuery(async (supabase) => {
        let query = supabase
          .from("destinations")
          .select("*")
          .order("sort_order", { ascending: true });

        if (options.featured) {
          query = query.eq("is_featured", true);
        }

        return query;
      });
    });
  });
}

// Fetch venues with caching and retry
export async function fetchVenues(options: {
  destinationId?: string;
  category?: string;
  featured?: boolean;
  limit?: number;
} = {}) {
  const cacheKey = `venues:${JSON.stringify(options)}`;

  return withCache(cacheKey, async () => {
    return withRetry(async () => {
      return supabaseQuery(async (supabase) => {
        let query = supabase
          .from("venues")
          .select("*")
          .eq("is_active", true)
          .order("rating", { ascending: false });

        if (options.destinationId) {
          query = query.eq("destination_id", options.destinationId);
        }
        if (options.category) {
          query = query.eq("category", options.category);
        }
        if (options.featured) {
          query = query.eq("is_featured", true);
        }
        if (options.limit) {
          query = query.limit(options.limit);
        }

        return query;
      });
    });
  });
}

// Fetch single venue by slug
export async function fetchVenueBySlug(slug: string) {
  const cacheKey = `venue:${slug}`;

  return withCache(cacheKey, async () => {
    return withRetry(async () => {
      return supabaseQuery(async (supabase) => {
        return supabase
          .from("venues")
          .select("*, destinations(*)")
          .eq("slug", slug)
          .single();
      });
    });
  });
}

// User-specific queries (no caching for user data)
export async function fetchUserShortlist(userId: string) {
  return withRetry(async () => {
    return supabaseQuery(async (supabase) => {
      return supabase
        .from("venue_shortlist")
        .select("*, venues(*)")
        .eq("user_id", userId);
    });
  });
}

// Toggle shortlist
export async function toggleShortlist(userId: string, venueId: string) {
  const supabase = createClient();

  // Check if already shortlisted
  const { data: existing } = await supabase
    .from("venue_shortlist")
    .select("id")
    .eq("user_id", userId)
    .eq("venue_id", venueId)
    .single();

  if (existing) {
    // Remove from shortlist
    await supabase
      .from("venue_shortlist")
      .delete()
      .eq("user_id", userId)
      .eq("venue_id", venueId);
    return false;
  } else {
    // Add to shortlist
    await supabase
      .from("venue_shortlist")
      .insert({ user_id: userId, venue_id: venueId } as any);
    return true;
  }
}

// Submit inquiry
export async function submitInquiry(data: {
  venueId: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  guestCount: number;
  message: string;
}) {
  return withRetry(async () => {
    return supabaseQuery(async (supabase) => {
      return supabase.from("inquiries").insert([
        {
          venue_id: data.venueId,
          user_id: data.userId,
          name: data.name,
          email: data.email,
          phone: data.phone,
          event_date: data.eventDate,
          guest_count: data.guestCount,
          message: data.message,
          status: "new",
        },
      ] as any);
    });
  });
}

// Submit review
export async function submitReview(data: {
  venueId: string;
  userId: string;
  rating: number;
  title: string;
  content: string;
}) {
  return withRetry(async () => {
    return supabaseQuery(async (supabase) => {
      return supabase.from("reviews").insert([
        {
          venue_id: data.venueId,
          user_id: data.userId,
          rating: data.rating,
          title: data.title,
          content: data.content,
          status: "pending",
        },
      ] as any);
    });
  });
}

// Debounce utility for search
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// Format API error for display
export function formatAPIError(error: unknown): string {
  if (error instanceof AuthError) {
    return "Please log in to continue";
  }
  if (error instanceof NetworkError) {
    return "Connection issue. Please check your internet and try again.";
  }
  if (error instanceof APIError) {
    switch (error.statusCode) {
      case 404:
        return "The requested resource was not found";
      case 409:
        return "This resource already exists";
      case 401:
      case 403:
        return "You don't have permission to perform this action";
      default:
        return error.message || "Something went wrong";
    }
  }
  return "An unexpected error occurred";
}

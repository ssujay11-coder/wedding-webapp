import { createBrowserClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Browser client for client-side operations
export function createSupabaseBrowserClient() {
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
}

// Simple client for basic operations (backwards compatible)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Export for convenience
export { supabaseUrl, supabaseAnonKey }

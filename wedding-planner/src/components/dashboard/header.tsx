'use client'

import { useAuth } from '@/contexts/auth-context'
import { useWedding } from '@/contexts/wedding-context'
import { Bell, Search, ChevronRight, Home, Calendar, Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function DashboardHeader() {
  const { profile } = useAuth()
  const { currentWedding, weddingStats } = useWedding()
  const pathname = usePathname()

  // Generate breadcrumbs from pathname
  const breadcrumbs = pathname
    .split('/')
    .filter(Boolean)
    .map((segment) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      href: `/${segment}`,
    }))

  return (
    <header className="sticky top-0 z-40 flex h-20 shrink-0 items-center gap-x-6 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-md border-b border-border/40 transition-all duration-300">
      {/* Spacer for mobile menu button */}
      <div className="lg:hidden w-8" />

      {/* Breadcrumbs */}
      <div className="hidden md:flex items-center text-sm text-muted-foreground/80">
        <Link href="/dashboard" className="hover:text-primary transition-colors">
          <Home className="h-4 w-4" />
        </Link>
        {breadcrumbs.map((crumb, idx) => {
          // Reconstruct full path for the crumb
          const href = `/${breadcrumbs.slice(0, idx + 1).map(c => c.name.toLowerCase()).join('/')}`;
          const isLast = idx === breadcrumbs.length - 1;

          if (crumb.name === 'Dashboard') return null;

          return (
            <div key={crumb.name} className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/40" />
              {isLast ? (
                <span className="font-medium text-foreground bg-primary/5 px-2 py-1 rounded-md">
                  {crumb.name}
                </span>
              ) : (
                <Link href={href} className="hover:text-primary transition-colors">
                  {crumb.name}
                </Link>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end items-center">

        {/* Wedding countdown */}
        {currentWedding && weddingStats?.daysUntilWedding != null && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-rose-50 to-orange-50 rounded-full border border-rose-100 shadow-sm"
          >
            <Calendar className="h-4 w-4 text-rose-500" />
            <div className="flex items-baseline gap-1">
              <span className="text-rose-700 font-display font-semibold text-lg leading-none">
                {weddingStats.daysUntilWedding > 0 ? weddingStats.daysUntilWedding : '0'}
              </span>
              <span className="text-rose-600/80 text-xs uppercase tracking-wide font-medium">days to go</span>
            </div>
          </motion.div>
        )}

        <div className="flex items-center gap-x-4">
          {/* Search */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="h-10 w-64 rounded-full bg-secondary/50 border-transparent focus:bg-white focus:border-primary/20 focus:ring-2 focus:ring-primary/10 pl-9 pr-4 text-sm transition-all outline-none"
            />
          </div>

          {/* Notifications */}
          <button
            type="button"
            className="relative p-2.5 text-muted-foreground hover:text-primary rounded-full hover:bg-secondary transition-all duration-300 group"
          >
            <span className="sr-only">View notifications</span>
            <Bell className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white animate-pulse" />
          </button>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-border/60" />

          {/* Profile */}
          <div className="flex items-center gap-3 pl-2">
            <div className="hidden lg:block text-right">
              <p className="text-sm font-medium text-foreground font-display tracking-wide">
                {profile?.full_name || 'User'}
              </p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                {profile?.role || 'Couple'}
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-rose-100 to-rose-200 p-[2px] shadow-sm">
              <div className="h-full w-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-rose-600 font-serif font-semibold">
                    {profile?.full_name?.[0] || '?'}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

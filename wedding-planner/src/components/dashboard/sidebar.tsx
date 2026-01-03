'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { useWedding } from '@/contexts/wedding-context'
import {
  Heart,
  LayoutDashboard,
  Users,
  Calendar,
  Globe,
  Wallet,
  CheckSquare,
  Building2,
  Truck,
  Settings,
  LogOut,
  ChevronDown,
  Plus,
  Menu,
  X,
  Star
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { GoldSparkles } from '@/components/decorative/floral-elements'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Guests', href: '/planning/guests', icon: Users },
  { name: 'Events', href: '/planning/events', icon: Calendar },
  { name: 'Website', href: '/planning/website', icon: Globe },
  { name: 'Budget', href: '/planning/budget', icon: Wallet },
  { name: 'Tasks', href: '/planning/tasks', icon: CheckSquare },
  { name: 'Vendors', href: '/planning/vendors', icon: Building2 },
  { name: 'Logistics', href: '/planning/logistics', icon: Truck },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user, profile, signOut } = useAuth()
  const { weddings, currentWedding, selectWedding } = useWedding()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isWeddingDropdownOpen, setIsWeddingDropdownOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    window.location.href = '/'
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#2a1318] text-white/90 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/lux-pattern.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Logo */}
      <div className="flex h-20 shrink-0 items-center gap-3 px-6 border-b border-white/10 relative z-10">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/20 p-2 rounded-full group-hover:bg-primary/30 transition-colors">
            <Heart className="h-5 w-5 text-primary fill-primary" />
          </div>
          <span className="text-xl font-display tracking-wide text-white">Elite <span className="text-primary italic">Planner</span></span>
        </Link>
      </div>

      {/* Wedding Selector */}
      {weddings.length > 0 && (
        <div className="px-4 py-6 relative z-10">
          <div className="relative">
            <button
              onClick={() => setIsWeddingDropdownOpen(!isWeddingDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/5 hover:border-primary/30 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <Heart className="h-4 w-4 text-white fill-white/50" />
                </div>
                <div className="flex flex-col items-start truncate">
                  <span className="text-xs text-white/50 uppercase tracking-wider">Current Wedding</span>
                  <span className="text-sm font-medium text-white truncate">
                    {currentWedding
                      ? `${currentWedding.bride_name} & ${currentWedding.groom_name}`
                      : 'Select Wedding'}
                  </span>
                </div>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white/50 transition-transform group-hover:text-primary',
                  isWeddingDropdownOpen && 'transform rotate-180'
                )}
              />
            </button>

            <AnimatePresence>
              {isWeddingDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-[#33181f] rounded-xl shadow-2xl border border-white/10 z-50 max-h-60 overflow-y-auto backdrop-blur-xl"
                >
                  {weddings.map((wedding) => (
                    <button
                      key={wedding.id}
                      onClick={() => {
                        selectWedding(wedding.id)
                        setIsWeddingDropdownOpen(false)
                      }}
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors border-l-2',
                        wedding.id === currentWedding?.id ? 'border-primary bg-white/5' : 'border-transparent'
                      )}
                    >
                      <Heart
                        className={cn(
                          'h-4 w-4 flex-shrink-0',
                          wedding.id === currentWedding?.id
                            ? 'text-primary fill-primary'
                            : 'text-white/30'
                        )}
                      />
                      <div className="min-w-0">
                        <p className={cn("text-sm font-medium truncate",
                          wedding.id === currentWedding?.id ? 'text-primary' : 'text-white/80'
                        )}>
                          {wedding.bride_name} & {wedding.groom_name}
                        </p>
                        {wedding.wedding_date && (
                          <p className="text-xs text-white/40">
                            {new Date(wedding.wedding_date).toLocaleDateString('en-IN', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                  <Link
                    href="/my-weddings/new"
                    className="flex items-center gap-3 px-4 py-3 text-primary hover:bg-primary/10 border-t border-white/5 transition-colors"
                    onClick={() => setIsWeddingDropdownOpen(false)}
                  >
                    <div className="w-6 h-6 rounded-full border border-dashed border-primary/50 flex items-center justify-center">
                      <Plus className="h-3 w-3" />
                    </div>
                    <span className="text-sm font-medium">Create New Wedding</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 py-2 overflow-y-auto custom-scrollbar">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group',
                isActive
                  ? 'bg-primary/10 text-primary shadow-sm'
                  : 'text-white/60 hover:bg-white/5 hover:text-white hover:pl-5'
              )}
            >
              <item.icon
                className={cn('h-5 w-5 transition-colors', isActive ? 'text-primary' : 'text-white/40 group-hover:text-white/80')}
              />
              {item.name}
              {isActive && (
                <motion.div layoutId="activeNavIndicator" className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-white/10 p-4 space-y-2 relative z-10 bg-[#221015]/50 backdrop-blur-sm">
        <Link
          href="/settings"
          onClick={() => setIsMobileOpen(false)}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white transition-colors"
        >
          <Settings className="h-5 w-5 text-white/40" />
          Settings
        </Link>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:bg-white/5 hover:text-red-400 transition-colors group"
        >
          <LogOut className="h-5 w-5 text-white/40 group-hover:text-red-400" />
          Sign Out
        </button>

        {/* User info */}
        <div className="flex items-center gap-3 px-4 py-3 mt-2 bg-white/5 rounded-xl border border-white/5">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-rose-600 flex items-center justify-center ring-2 ring-white/10">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <span className="text-white font-serif font-semibold text-lg">
                {profile?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || '?'}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate font-display tracking-wide">
              {profile?.full_name || 'User'}
            </p>
            <p className="text-xs text-white/40 truncate">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-xl bg-white/80 backdrop-blur-md shadow-lg border border-primary/20 text-primary"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-80 shadow-2xl overflow-hidden"
            >
              <SidebarContent />
              <button
                onClick={() => setIsMobileOpen(false)}
                className="absolute top-4 right-4 p-2 bg-white/10 rounded-full text-white/80 hover:bg-white/20 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col shadow-2xl">
        <div className="flex grow flex-col gap-y-0 overflow-y-auto custom-scrollbar">
          <SidebarContent />
        </div>
      </div>
    </>
  )
}

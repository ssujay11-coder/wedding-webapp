'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/contexts/auth-context'
import { useWedding } from '@/contexts/wedding-context'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  Calendar,
  Wallet,
  CheckSquare,
  TrendingUp,
  ArrowRight,
  Plus,
  Heart,
  Globe,
  Clock,
  Loader2,
  MapPin,
  Star,
  Building2,
  Phone,
  Mail,
  ChevronRight,
  Sparkles,
  Check,
  AlertCircle,
  PartyPopper,
  Utensils,
  Camera,
  Music,
  Flower2,
  Gift,
  Bell,
  CalendarDays,
  Milestone,
  HeartHandshake,
  Plane,
  Table2,
  Car,
  Scale,
  Activity,
  Cloud,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

// Import new dashboard components
import { AIWidget } from '@/components/dashboard/ai-widget'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { WeatherWidget } from '@/components/dashboard/weather-widget'
import { GuestTable } from '@/components/dashboard/guest-table'
import { BudgetChart } from '@/components/dashboard/budget-chart'
import { VendorComparison } from '@/components/dashboard/vendor-comparison'
import { LogisticsManager } from '@/components/dashboard/logistics-manager'
import { SeatingChart } from '@/components/dashboard/seating-chart'

function StatCard({
  title,
  value,
  subValue,
  icon: Icon,
  color,
  href,
  trend,
}: {
  title: string
  value: string | number
  subValue?: string
  icon: React.ComponentType<{ className?: string }>
  color: 'rose' | 'blue' | 'green' | 'amber' | 'purple'
  href: string
  trend?: { value: number; positive: boolean }
}) {
  const colorClasses = {
    rose: 'bg-gradient-to-br from-rose-50 to-rose-100 text-rose-600',
    blue: 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600',
    green: 'bg-gradient-to-br from-green-50 to-green-100 text-green-600',
    amber: 'bg-gradient-to-br from-amber-50 to-amber-100 text-amber-600',
    purple: 'bg-gradient-to-br from-purple-50 to-purple-100 text-purple-600',
  }

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-rose-100 transition-all group cursor-pointer"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
            {subValue && <p className="mt-1 text-sm text-gray-500">{subValue}</p>}
            {trend && (
              <div className={cn(
                "mt-2 inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full",
                trend.positive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              )}>
                <TrendingUp className={cn("w-3 h-3", !trend.positive && "rotate-180")} />
                {trend.value}% this week
              </div>
            )}
          </div>
          <div className={cn('p-3 rounded-xl', colorClasses[color])}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm text-rose-600 font-medium group-hover:gap-2 transition-all">
          View details <ArrowRight className="h-4 w-4 ml-1" />
        </div>
      </motion.div>
    </Link>
  )
}

function CountdownTimer({ daysUntilWedding }: { daysUntilWedding: number }) {
  const [timeLeft, setTimeLeft] = useState({
    days: daysUntilWedding,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const midnight = new Date()
      midnight.setHours(24, 0, 0, 0)
      const diff = midnight.getTime() - now.getTime()

      setTimeLeft({
        days: daysUntilWedding,
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [daysUntilWedding])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden bg-gradient-to-br from-rose-500 via-rose-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('/images/pattern-gold.png')] opacity-10" />
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-400/20 rounded-full blur-2xl" />

      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-rose-200 fill-rose-200" />
          <span className="text-rose-100 text-sm font-medium">Countdown to Your Big Day</span>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[
            { value: timeLeft.days, label: 'Days' },
            { value: timeLeft.hours, label: 'Hours' },
            { value: timeLeft.minutes, label: 'Minutes' },
            { value: timeLeft.seconds, label: 'Seconds' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-3 py-4">
                <span className="text-4xl md:text-5xl font-bold tabular-nums">
                  {String(item.value).padStart(2, '0')}
                </span>
              </div>
              <span className="text-xs mt-2 block text-rose-100 uppercase tracking-wider">{item.label}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-rose-100">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm">Every moment counts!</span>
        </div>
      </div>
    </motion.div>
  )
}

function ShortlistedVenuesCard({ venues }: { venues: any[] }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-amber-500" />
          <h3 className="text-lg font-semibold text-gray-900">Shortlisted Venues</h3>
        </div>
        <Link href="/planning/venues" className="text-sm text-rose-600 hover:underline flex items-center gap-1">
          View all <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {venues.length === 0 ? (
        <div className="text-center py-8">
          <Building2 className="w-12 h-12 mx-auto text-gray-200 mb-3" />
          <p className="text-gray-500">No venues shortlisted yet</p>
          <Link href="/destinations" className="text-rose-600 text-sm mt-2 inline-flex items-center gap-1 hover:underline">
            <Plus className="w-4 h-4" /> Explore venues
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {venues.slice(0, 3).map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-16 h-12 rounded-lg overflow-hidden relative bg-gray-100">
                {venue.cover_image_url ? (
                  <Image src={venue.cover_image_url} alt={venue.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-gray-300" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{venue.name}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {venue.city}
                </p>
              </div>
              {venue.rating && (
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">{venue.rating}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

function WeddingChecklistCard({ tasks }: { tasks: any[] }) {
  const upcomingTasks = [
    { id: 1, title: 'Book mehendi artist', date: 'Due in 5 days', priority: 'high', category: 'Decor' },
    { id: 2, title: 'Finalize caterer menu', date: 'Due in 1 week', priority: 'medium', category: 'Food' },
    { id: 3, title: 'Send invitations', date: 'Due in 2 weeks', priority: 'high', category: 'Guests' },
    { id: 4, title: 'Book DJ for sangeet', date: 'Due in 3 weeks', priority: 'medium', category: 'Music' },
  ]

  const priorityColors = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-amber-100 text-amber-700',
    low: 'bg-green-100 text-green-700',
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-green-500" />
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h3>
        </div>
        <Link href="/planning/tasks" className="text-sm text-rose-600 hover:underline flex items-center gap-1">
          View all <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {upcomingTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
          >
            <button className="w-5 h-5 rounded-full border-2 border-gray-300 hover:border-rose-500 transition-colors flex-shrink-0 group-hover:border-rose-400" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900">{task.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500">{task.date}</span>
                <span className={cn("text-xs px-2 py-0.5 rounded-full", priorityColors[task.priority as keyof typeof priorityColors])}>
                  {task.priority}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Link href="/planning/tasks/new">
        <Button variant="outline" className="w-full mt-4 rounded-xl">
          <Plus className="w-4 h-4 mr-2" /> Add Task
        </Button>
      </Link>
    </div>
  )
}

function VendorCategoriesCard() {
  const categories = [
    { icon: Camera, name: 'Photography', count: 0, color: 'bg-purple-100 text-purple-600' },
    { icon: Utensils, name: 'Catering', count: 0, color: 'bg-orange-100 text-orange-600' },
    { icon: Music, name: 'DJ & Music', count: 0, color: 'bg-blue-100 text-blue-600' },
    { icon: Flower2, name: 'Decoration', count: 0, color: 'bg-pink-100 text-pink-600' },
    { icon: Gift, name: 'Invitation', count: 0, color: 'bg-green-100 text-green-600' },
    { icon: HeartHandshake, name: 'Makeup', count: 0, color: 'bg-rose-100 text-rose-600' },
  ]

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-semibold text-gray-900">Vendor Categories</h3>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {categories.map((category, index) => (
          <motion.button
            key={category.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", category.color)}>
              <category.icon className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-gray-700 text-center">{category.name}</span>
            {category.count > 0 && (
              <span className="text-xs text-gray-500">{category.count} booked</span>
            )}
          </motion.button>
        ))}
      </div>

      <Link href="/vendors">
        <Button variant="outline" className="w-full mt-4 rounded-xl">
          Browse Vendors
        </Button>
      </Link>
    </div>
  )
}

function EventTimelineCard({ events }: { events: any[] }) {
  const sampleEvents = [
    { id: 1, name: 'Mehendi', date: 'Feb 14, 2025', time: '4:00 PM', venue: 'Home', icon: Flower2 },
    { id: 2, name: 'Sangeet', date: 'Feb 15, 2025', time: '7:00 PM', venue: 'Grand Ballroom', icon: Music },
    { id: 3, name: 'Wedding', date: 'Feb 16, 2025', time: '10:00 AM', venue: 'Lake Palace', icon: Heart },
    { id: 4, name: 'Reception', date: 'Feb 16, 2025', time: '7:00 PM', venue: 'Lake Palace', icon: PartyPopper },
  ]

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">Event Timeline</h3>
        </div>
        <Link href="/planning/events" className="text-sm text-rose-600 hover:underline flex items-center gap-1">
          Manage <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-rose-200 via-rose-300 to-rose-200" />

        <div className="space-y-4">
          {sampleEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 relative"
            >
              <div className="relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br from-rose-50 to-rose-100 flex items-center justify-center text-rose-600 shadow-sm">
                <event.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 pt-1">
                <h4 className="font-medium text-gray-900">{event.name}</h4>
                <p className="text-sm text-gray-500">{event.date} • {event.time}</p>
                <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" /> {event.venue}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Link href="/planning/events/new">
        <Button variant="outline" className="w-full mt-4 rounded-xl">
          <Plus className="w-4 h-4 mr-2" /> Add Event
        </Button>
      </Link>
    </div>
  )
}

function RSVPTrackerCard({ stats }: { stats: any }) {
  const rsvpData = [
    { status: 'Confirmed', count: stats?.confirmedGuests || 0, color: 'bg-green-500' },
    { status: 'Pending', count: (stats?.totalGuests || 0) - (stats?.confirmedGuests || 0) - (stats?.declinedGuests || 0), color: 'bg-amber-500' },
    { status: 'Declined', count: stats?.declinedGuests || 0, color: 'bg-red-500' },
  ]

  const total = stats?.totalGuests || 0

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">RSVP Tracker</h3>
        </div>
        <Link href="/planning/guests" className="text-sm text-rose-600 hover:underline flex items-center gap-1">
          Manage <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Progress bar */}
      <div className="h-3 rounded-full bg-gray-100 overflow-hidden flex mb-4">
        {rsvpData.map((item, index) => (
          <motion.div
            key={item.status}
            initial={{ width: 0 }}
            animate={{ width: total > 0 ? `${(item.count / total) * 100}%` : '0%' }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className={cn("h-full", item.color)}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {rsvpData.map((item) => (
          <div key={item.status} className="text-center">
            <p className="text-2xl font-bold text-gray-900">{item.count}</p>
            <div className="flex items-center justify-center gap-1.5 mt-1">
              <div className={cn("w-2 h-2 rounded-full", item.color)} />
              <span className="text-xs text-gray-500">{item.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 rounded-xl bg-gray-50 text-center">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">{total}</span> total guests invited
        </p>
      </div>
    </div>
  )
}

function QuickAction({
  title,
  description,
  icon: Icon,
  href,
  color = 'rose',
}: {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  color?: 'rose' | 'blue' | 'green' | 'amber' | 'purple'
}) {
  const colorClasses = {
    rose: 'bg-rose-50 text-rose-600',
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    amber: 'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600',
  }

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-rose-200 hover:shadow-md transition-all cursor-pointer"
      >
        <div className={cn("p-3 rounded-xl", colorClasses[color])}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </motion.div>
    </Link>
  )
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto text-center py-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="mx-auto w-24 h-24 bg-gradient-to-br from-rose-100 to-rose-200 rounded-full flex items-center justify-center mb-6"
      >
        <Heart className="h-12 w-12 text-rose-500" />
      </motion.div>
      <h2 className="text-3xl font-serif font-bold text-gray-900 mb-3">
        Welcome to Your Wedding Planner
      </h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Start by creating your wedding. You&apos;ll be able to manage guests, build your
        wedding website, track your budget, and more.
      </p>
      <Link href="/my-weddings/new">
        <Button className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white h-14 px-10 rounded-xl shadow-lg shadow-rose-500/25 hover:shadow-xl transition-all">
          <Plus className="h-5 w-5 mr-2" />
          Create Your Wedding
        </Button>
      </Link>
    </motion.div>
  )
}

export default function DashboardPage() {
  const { isLoading: authLoading } = useAuth()
  const { currentWedding, weddingStats, weddings, isLoading: weddingLoading } = useWedding()
  const [shortlistedVenues, setShortlistedVenues] = useState<any[]>([])
  const [activeSection, setActiveSection] = useState<'overview' | 'guests' | 'budget' | 'vendors' | 'logistics' | 'seating'>('overview')

  const isLoading = authLoading || weddingLoading

  useEffect(() => {
    // Fetch shortlisted venues
    const fetchShortlisted = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('venue_shortlist')
          .select('*, venues(*)')
          .eq('user_id', user.id)
          .limit(3)
        const typedData = data as Array<{ venues: any }> | null
        setShortlistedVenues(typedData?.map(s => s.venues).filter(Boolean) || [])
      }
    }
    fetchShortlisted()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-rose-500 mx-auto mb-4" />
          <p className="text-gray-500">Loading your wedding dashboard...</p>
        </div>
      </div>
    )
  }

  if (!currentWedding || weddings.length === 0) {
    return <EmptyState />
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Calculate budget percentage
  const budgetSpentPercentage =
    weddingStats?.totalBudget && weddingStats.totalBudget > 0
      ? Math.round((weddingStats.spentBudget / weddingStats.totalBudget) * 100)
      : 0

  // Calculate task completion percentage
  const taskCompletionPercentage =
    weddingStats?.pendingTasks !== undefined && weddingStats?.completedTasks !== undefined
      ? Math.round(
          (weddingStats.completedTasks /
            (weddingStats.completedTasks + weddingStats.pendingTasks)) *
            100
        ) || 0
      : 0

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">
            {currentWedding.bride_name} & {currentWedding.groom_name}
          </h1>
          <p className="text-gray-500 mt-1 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {currentWedding.wedding_date
              ? new Date(currentWedding.wedding_date).toLocaleDateString('en-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'Wedding date not set'}
            {currentWedding.primary_city && (
              <>
                <span className="text-gray-300">•</span>
                <MapPin className="w-4 h-4" />
                {currentWedding.primary_city}
              </>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/planning/website">
            <Button variant="outline" className="rounded-xl">
              <Globe className="w-4 h-4 mr-2" /> Wedding Website
            </Button>
          </Link>
          <Link href="/my-weddings">
            <Button className="bg-rose-600 hover:bg-rose-700 rounded-xl">
              <Plus className="w-4 h-4 mr-2" /> New Event
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Countdown Timer */}
      {weddingStats?.daysUntilWedding != null && weddingStats.daysUntilWedding > 0 && (
        <CountdownTimer daysUntilWedding={weddingStats.daysUntilWedding} />
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Guests"
          value={weddingStats?.totalGuests || 0}
          subValue={`${weddingStats?.confirmedGuests || 0} confirmed`}
          icon={Users}
          color="blue"
          href="/planning/guests"
        />
        <StatCard
          title="Events"
          value={weddingStats?.eventCount || 0}
          subValue="functions planned"
          icon={Calendar}
          color="purple"
          href="/planning/events"
        />
        <StatCard
          title="Budget"
          value={formatCurrency(currentWedding.total_budget || 0)}
          subValue={`${budgetSpentPercentage}% spent`}
          icon={Wallet}
          color="green"
          href="/planning/budget"
        />
        <StatCard
          title="Tasks"
          value={`${taskCompletionPercentage}%`}
          subValue={`${weddingStats?.pendingTasks || 0} pending`}
          icon={CheckSquare}
          color="amber"
          href="/planning/tasks"
        />
      </div>

      {/* Dashboard Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex overflow-x-auto border-b border-gray-100">
          {[
            { id: 'overview', label: 'Overview', icon: Heart },
            { id: 'guests', label: 'Guests', icon: Users },
            { id: 'budget', label: 'Budget', icon: Wallet },
            { id: 'vendors', label: 'Vendors', icon: Scale },
            { id: 'logistics', label: 'Logistics', icon: Plane },
            { id: 'seating', label: 'Seating', icon: Table2 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as typeof activeSection)}
              className={cn(
                "flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap",
                activeSection === tab.id
                  ? "text-rose-600 border-b-2 border-rose-600 bg-rose-50/50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Conditional Content Based on Active Section */}
      <AnimatePresence mode="wait">
        {activeSection === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* AI Assistant Widget */}
              <AIWidget
                weddingName={`${currentWedding.bride_name} & ${currentWedding.groom_name}`}
                daysUntilWedding={weddingStats?.daysUntilWedding || 0}
                pendingPayments={2}
                pendingRsvps={weddingStats?.totalGuests ? (weddingStats.totalGuests - (weddingStats.confirmedGuests || 0)) : 0}
                overdueTasks={weddingStats?.pendingTasks || 0}
              />

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <QuickAction
                    title="Add Guests"
                    description="Import or add new guests"
                    icon={Users}
                    href="/planning/guests/add"
                    color="blue"
                  />
                  <QuickAction
                    title="Create Event"
                    description="Add mehendi, sangeet, or reception"
                    icon={Calendar}
                    href="/planning/events/new"
                    color="purple"
                  />
                  <QuickAction
                    title="Browse Venues"
                    description="Find your dream venue"
                    icon={Building2}
                    href="/destinations"
                    color="amber"
                  />
                  <QuickAction
                    title="Track Expenses"
                    description="Log payments and expenses"
                    icon={Wallet}
                    href="/planning/budget"
                    color="green"
                  />
                </div>
              </div>

              {/* Event Timeline */}
              <EventTimelineCard events={[]} />

              {/* Upcoming Tasks */}
              <WeddingChecklistCard tasks={[]} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Weather Widget for destination weddings */}
              {currentWedding.primary_city && (
                <WeatherWidget
                  city={currentWedding.primary_city}
                  weddingDate={currentWedding.wedding_date || undefined}
                />
              )}

              {/* Wedding Website Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <Globe className="h-8 w-8 mb-4 opacity-80" />
                <h3 className="text-lg font-semibold mb-2">Wedding Website</h3>
                <p className="text-rose-100 text-sm mb-4">
                  Share your love story with guests
                </p>
                {currentWedding.website_enabled ? (
                  <div className="space-y-3">
                    <div className="bg-white/20 rounded-lg px-3 py-2 text-sm backdrop-blur-sm">
                      {currentWedding.website_slug}.eliteweddings.in
                    </div>
                    <Link href="/planning/website">
                      <Button className="w-full bg-white text-rose-600 hover:bg-rose-50 rounded-xl">
                        Edit Website
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Link href="/planning/website">
                    <Button className="w-full bg-white text-rose-600 hover:bg-rose-50 rounded-xl">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Website
                    </Button>
                  </Link>
                )}
              </motion.div>

              {/* RSVP Tracker */}
              <RSVPTrackerCard stats={weddingStats} />

              {/* Activity Feed */}
              <ActivityFeed />

              {/* Shortlisted Venues */}
              <ShortlistedVenuesCard venues={shortlistedVenues} />

              {/* Vendor Categories */}
              <VendorCategoriesCard />
            </div>
          </motion.div>
        )}

        {activeSection === 'guests' && (
          <motion.div
            key="guests"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <GuestTable weddingId={currentWedding.id} />
          </motion.div>
        )}

        {activeSection === 'budget' && (
          <motion.div
            key="budget"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <BudgetChart
              totalBudget={currentWedding.total_budget || 2500000}
              spent={weddingStats?.spentBudget || 0}
            />
          </motion.div>
        )}

        {activeSection === 'vendors' && (
          <motion.div
            key="vendors"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <VendorComparison category="DJ" />
          </motion.div>
        )}

        {activeSection === 'logistics' && (
          <motion.div
            key="logistics"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <LogisticsManager
              weddingDate={currentWedding.wedding_date ? new Date(currentWedding.wedding_date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }) + '-' + new Date(new Date(currentWedding.wedding_date).getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric' }) : 'TBD'}
              venue={currentWedding.primary_city || 'Venue TBD'}
            />
          </motion.div>
        )}

        {activeSection === 'seating' && (
          <motion.div
            key="seating"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <SeatingChart
              totalGuests={weddingStats?.totalGuests || 0}
              assignedGuests={weddingStats?.confirmedGuests || 0}
              unassignedGuests={(weddingStats?.totalGuests || 0) - (weddingStats?.confirmedGuests || 0)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

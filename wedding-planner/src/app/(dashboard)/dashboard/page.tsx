'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/auth-context'
import { useWedding } from '@/contexts/wedding-context'
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
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function StatCard({
  title,
  value,
  subValue,
  icon: Icon,
  color,
  href,
}: {
  title: string
  value: string | number
  subValue?: string
  icon: React.ComponentType<{ className?: string }>
  color: 'rose' | 'blue' | 'green' | 'amber' | 'purple'
  href: string
}) {
  const colorClasses = {
    rose: 'bg-rose-50 text-rose-600',
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    amber: 'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600',
  }

  return (
    <Link
      href={href}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all group"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          {subValue && <p className="mt-1 text-sm text-gray-500">{subValue}</p>}
        </div>
        <div className={cn('p-3 rounded-xl', colorClasses[color])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm text-rose-600 font-medium group-hover:gap-2 transition-all">
        View details <ArrowRight className="h-4 w-4 ml-1" />
      </div>
    </Link>
  )
}

function QuickAction({
  title,
  description,
  icon: Icon,
  href,
}: {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  href: string
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-rose-200 hover:shadow-sm transition-all"
    >
      <div className="p-3 bg-rose-50 rounded-xl">
        <Icon className="h-5 w-5 text-rose-600" />
      </div>
      <div>
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </Link>
  )
}

function EmptyState() {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="mx-auto w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mb-6">
        <Heart className="h-10 w-10 text-rose-500" />
      </div>
      <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3">
        Welcome to Your Wedding Planner
      </h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Start by creating your wedding. You&apos;ll be able to manage guests, build your
        wedding website, track your budget, and more.
      </p>
      <Link href="/my-weddings/new">
        <Button className="bg-rose-600 hover:bg-rose-700 text-white h-12 px-8">
          <Plus className="h-5 w-5 mr-2" />
          Create Your Wedding
        </Button>
      </Link>
    </div>
  )
}

export default function DashboardPage() {
  const { isLoading: authLoading } = useAuth()
  const { currentWedding, weddingStats, weddings, isLoading: weddingLoading } = useWedding()

  const isLoading = authLoading || weddingLoading

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">
            {currentWedding.bride_name} & {currentWedding.groom_name}&apos;s Wedding
          </h1>
          <p className="text-gray-500 mt-1">
            {currentWedding.wedding_date
              ? new Date(currentWedding.wedding_date).toLocaleDateString('en-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'Wedding date not set'}
            {currentWedding.primary_city && ` • ${currentWedding.primary_city}`}
          </p>
        </div>

        {weddingStats?.daysUntilWedding != null && weddingStats.daysUntilWedding > 0 && (
          <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-rose-500 to-rose-600 rounded-xl text-white shadow-lg">
            <Clock className="h-6 w-6" />
            <div>
              <p className="text-2xl font-bold">{weddingStats.daysUntilWedding}</p>
              <p className="text-sm opacity-90">days to go</p>
            </div>
          </div>
        )}
      </div>

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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <QuickAction
                title="Add Guests"
                description="Import or add new guests"
                icon={Users}
                href="/planning/guests/add"
              />
              <QuickAction
                title="Create Event"
                description="Add mehendi, sangeet, or reception"
                icon={Calendar}
                href="/planning/events/new"
              />
              <QuickAction
                title="Edit Website"
                description="Customize your wedding website"
                icon={Globe}
                href="/planning/website"
              />
              <QuickAction
                title="Track Expenses"
                description="Log payments and expenses"
                icon={Wallet}
                href="/planning/budget"
              />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="text-center py-8 text-gray-500">
              <TrendingUp className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>Activity feed will appear here</p>
              <p className="text-sm">as you add guests, events, and make updates</p>
            </div>
          </div>
        </div>

        {/* Right Column - Wedding Website & Progress */}
        <div className="space-y-6">
          {/* Wedding Website Card */}
          <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl p-6 text-white shadow-lg">
            <Globe className="h-8 w-8 mb-4 opacity-80" />
            <h3 className="text-lg font-semibold mb-2">Wedding Website</h3>
            <p className="text-rose-100 text-sm mb-4">
              Share your love story and event details with your guests
            </p>
            {currentWedding.website_enabled ? (
              <div className="space-y-3">
                <div className="bg-white/20 rounded-lg px-3 py-2 text-sm">
                  {currentWedding.website_slug}.eliteweddings.in
                </div>
                <Link href="/planning/website">
                  <Button
                    variant="outline"
                    className="w-full bg-white text-rose-600 border-0 hover:bg-rose-50"
                  >
                    Edit Website
                  </Button>
                </Link>
              </div>
            ) : (
              <Link href="/planning/website">
                <Button
                  variant="outline"
                  className="w-full bg-white text-rose-600 border-0 hover:bg-rose-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Website
                </Button>
              </Link>
            )}
          </div>

          {/* Planning Progress */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Planning Progress</h3>

            <div className="space-y-4">
              {/* Guest List */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Guest List</span>
                  <span className="font-medium text-gray-900">
                    {weddingStats?.confirmedGuests || 0}/{weddingStats?.totalGuests || 0}
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{
                      width: `${
                        weddingStats?.totalGuests
                          ? (weddingStats.confirmedGuests / weddingStats.totalGuests) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Budget */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Budget Spent</span>
                  <span className="font-medium text-gray-900">{budgetSpentPercentage}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all',
                      budgetSpentPercentage > 90
                        ? 'bg-red-500'
                        : budgetSpentPercentage > 70
                        ? 'bg-amber-500'
                        : 'bg-green-500'
                    )}
                    style={{ width: `${Math.min(budgetSpentPercentage, 100)}%` }}
                  />
                </div>
              </div>

              {/* Tasks */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Tasks Completed</span>
                  <span className="font-medium text-gray-900">{taskCompletionPercentage}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all"
                    style={{ width: `${taskCompletionPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            <Link
              href="/planning/tasks"
              className="mt-4 flex items-center justify-center text-sm text-rose-600 font-medium hover:text-rose-700"
            >
              View all tasks <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

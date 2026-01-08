'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Plus,
  Calendar,
  CreditCard,
  Building,
  Utensils,
  Camera,
  Music,
  Flower2,
  Gift,
  Car,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface BudgetCategory {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  estimated: number
  actual: number
  paid: number
  color: string
}

interface Payment {
  id: string
  vendor: string
  amount: number
  dueDate: Date
  status: 'paid' | 'upcoming' | 'overdue'
}

interface BudgetChartProps {
  totalBudget?: number
  spent?: number
  categories?: BudgetCategory[]
  payments?: Payment[]
  familySplit?: {
    bride: number
    groom: number
    couple: number
  }
}

export function BudgetChart({
  totalBudget = 2500000,
  spent = 1850000,
  categories = [],
  payments = [],
  familySplit = { bride: 1200000, groom: 1000000, couple: 300000 },
}: BudgetChartProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'categories' | 'payments'>('overview')

  // Default categories if none provided
  const defaultCategories: BudgetCategory[] = useMemo(() => [
    { id: '1', name: 'Venue', icon: Building, estimated: 800000, actual: 750000, paid: 450000, color: 'bg-blue-500' },
    { id: '2', name: 'Catering', icon: Utensils, estimated: 500000, actual: 520000, paid: 200000, color: 'bg-orange-500' },
    { id: '3', name: 'Photography', icon: Camera, estimated: 250000, actual: 250000, paid: 75000, color: 'bg-purple-500' },
    { id: '4', name: 'Decor', icon: Flower2, estimated: 300000, actual: 280000, paid: 140000, color: 'bg-pink-500' },
    { id: '5', name: 'Entertainment', icon: Music, estimated: 150000, actual: 180000, paid: 45000, color: 'bg-cyan-500' },
    { id: '6', name: 'Makeup', icon: Sparkles, estimated: 150000, actual: 150000, paid: 75000, color: 'bg-rose-500' },
    { id: '7', name: 'Transport', icon: Car, estimated: 80000, actual: 75000, paid: 0, color: 'bg-green-500' },
    { id: '8', name: 'Gifts', icon: Gift, estimated: 50000, actual: 45000, paid: 0, color: 'bg-amber-500' },
  ], [])

  const displayCategories = categories.length > 0 ? categories : defaultCategories

  // Default payments if none provided
  const defaultPayments: Payment[] = useMemo(() => [
    { id: '1', vendor: 'Decorator - Balance', amount: 80000, dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), status: 'overdue' },
    { id: '2', vendor: 'Taj Lake Palace - 2nd Installment', amount: 250000, dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), status: 'upcoming' },
    { id: '3', vendor: 'Photographer - Advance', amount: 75000, dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), status: 'upcoming' },
    { id: '4', vendor: 'Caterer - Final', amount: 200000, dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), status: 'upcoming' },
  ], [])

  const displayPayments = payments.length > 0 ? payments : defaultPayments

  const remaining = totalBudget - spent
  const spentPercentage = Math.round((spent / totalBudget) * 100)

  const totalEstimated = displayCategories.reduce((sum, c) => sum + c.estimated, 0)
  const totalActual = displayCategories.reduce((sum, c) => sum + c.actual, 0)
  const totalPaid = displayCategories.reduce((sum, c) => sum + c.paid, 0)

  const pendingPayments = displayPayments.filter(p => p.status !== 'paid')
  const overdueAmount = displayPayments
    .filter(p => p.status === 'overdue')
    .reduce((sum, p) => sum + p.amount, 0)

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)} Cr`
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Wallet className="w-6 h-6 text-green-500" />
            <h2 className="text-xl font-semibold text-gray-900">Wedding Budget</h2>
          </div>
          <Link href="/planning/budget">
            <Button variant="outline" size="sm" className="rounded-lg">
              <Plus className="w-4 h-4 mr-2" />
              Add Expense
            </Button>
          </Link>
        </div>

        {/* Main Progress */}
        <div className="mb-6">
          <div className="flex items-end justify-between mb-2">
            <div>
              <p className="text-sm text-gray-500">Total Budget</p>
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalBudget)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Remaining</p>
              <p className={cn(
                "text-xl font-bold",
                remaining >= 0 ? "text-green-600" : "text-red-600"
              )}>
                {formatCurrency(remaining)}
              </p>
            </div>
          </div>

          <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(spentPercentage, 100)}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={cn(
                "h-full rounded-full",
                spentPercentage <= 75 ? "bg-gradient-to-r from-green-400 to-green-500" :
                spentPercentage <= 90 ? "bg-gradient-to-r from-amber-400 to-amber-500" :
                "bg-gradient-to-r from-red-400 to-red-500"
              )}
            />
          </div>

          <div className="flex items-center justify-between mt-2 text-sm">
            <span className="text-gray-500">
              <span className="font-semibold text-gray-900">{formatCurrency(spent)}</span> spent
            </span>
            <span className={cn(
              "font-medium",
              spentPercentage <= 75 ? "text-green-600" :
              spentPercentage <= 90 ? "text-amber-600" : "text-red-600"
            )}>
              {spentPercentage}%
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 rounded-xl bg-gray-50 text-center">
            <p className="text-lg font-bold text-gray-900">{formatCurrency(totalPaid)}</p>
            <p className="text-xs text-gray-500">Paid</p>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 text-center">
            <p className="text-lg font-bold text-amber-600">
              {formatCurrency(totalActual - totalPaid)}
            </p>
            <p className="text-xs text-gray-500">Pending</p>
          </div>
          {overdueAmount > 0 && (
            <div className="p-3 rounded-xl bg-red-50 text-center">
              <p className="text-lg font-bold text-red-600">{formatCurrency(overdueAmount)}</p>
              <p className="text-xs text-gray-500">Overdue</p>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        {['overview', 'categories', 'payments'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as typeof activeTab)}
            className={cn(
              "flex-1 py-3 text-sm font-medium transition-colors",
              activeTab === tab
                ? "text-rose-600 border-b-2 border-rose-600 bg-rose-50/50"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700">Family Contribution</h3>
            <div className="space-y-3">
              {[
                { label: "Bride's Family", amount: familySplit.bride, color: 'bg-pink-500' },
                { label: "Groom's Family", amount: familySplit.groom, color: 'bg-blue-500' },
                { label: "Couple", amount: familySplit.couple, color: 'bg-purple-500' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(item.amount)} ({Math.round((item.amount / totalBudget) * 100)}%)
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.amount / totalBudget) * 100}%` }}
                      className={cn("h-full rounded-full", item.color)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="space-y-3">
            {displayCategories.map((category, index) => {
              const variance = category.actual - category.estimated
              const variancePercent = Math.round((variance / category.estimated) * 100)
              const paidPercent = Math.round((category.paid / category.actual) * 100)

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", category.color.replace('bg-', 'bg-').replace('500', '100'))}>
                      <category.icon className={cn("w-5 h-5", category.color.replace('bg-', 'text-'))} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900">{category.name}</p>
                        <p className="font-semibold text-gray-900">{formatCurrency(category.actual)}</p>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Est: {formatCurrency(category.estimated)}</span>
                          {variance !== 0 && (
                            <span className={cn(
                              "inline-flex items-center gap-0.5 text-xs font-medium",
                              variance > 0 ? "text-red-600" : "text-green-600"
                            )}>
                              {variance > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                              {variance > 0 ? '+' : ''}{variancePercent}%
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">Paid: {paidPercent}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="space-y-3">
            {displayPayments.map((payment, index) => (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "p-4 rounded-xl border-l-4",
                  payment.status === 'overdue' && "bg-red-50 border-l-red-500",
                  payment.status === 'upcoming' && "bg-amber-50 border-l-amber-500",
                  payment.status === 'paid' && "bg-green-50 border-l-green-500"
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{payment.vendor}</p>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {payment.status === 'overdue'
                          ? `${Math.abs(Math.ceil((Date.now() - payment.dueDate.getTime()) / (1000 * 60 * 60 * 24)))} days overdue`
                          : `Due ${payment.dueDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}`
                        }
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{formatCurrency(payment.amount)}</p>
                    <Button
                      size="sm"
                      className={cn(
                        "mt-2 rounded-lg text-xs",
                        payment.status === 'overdue'
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-amber-600 hover:bg-amber-700"
                      )}
                    >
                      <CreditCard className="w-3 h-3 mr-1" />
                      Pay Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

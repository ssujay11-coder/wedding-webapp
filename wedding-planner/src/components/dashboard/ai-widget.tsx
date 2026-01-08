'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  Send,
  AlertCircle,
  CheckCircle2,
  Clock,
  MessageCircle,
  Wallet,
  Users,
  Calendar,
  Heart,
  Loader2,
  X,
  Maximize2,
  Minimize2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface AIWidgetProps {
  weddingName?: string
  daysUntilWedding?: number
  pendingPayments?: number
  pendingRsvps?: number
  overdueTasks?: number
  upcomingEvents?: Array<{ name: string; date: string }>
  onExpand?: () => void
}

interface Suggestion {
  id: string
  type: 'urgent' | 'warning' | 'success' | 'info'
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  action?: string
  actionHref?: string
}

export function AIWidget({
  weddingName = 'Your Wedding',
  daysUntilWedding = 0,
  pendingPayments = 0,
  pendingRsvps = 0,
  overdueTasks = 0,
  upcomingEvents = [],
  onExpand,
}: AIWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 17) setGreeting('Good afternoon')
    else setGreeting('Good evening')
  }, [])

  // Generate dynamic suggestions based on wedding state
  const suggestions: Suggestion[] = []

  if (pendingPayments > 0) {
    suggestions.push({
      id: 'payment',
      type: 'urgent',
      icon: Wallet,
      title: `Payment due soon`,
      description: `You have ${pendingPayments} pending payment${pendingPayments > 1 ? 's' : ''}`,
      action: 'View Payments',
      actionHref: '/planning/budget',
    })
  }

  if (pendingRsvps > 0) {
    suggestions.push({
      id: 'rsvp',
      type: 'warning',
      icon: Users,
      title: `${pendingRsvps} guests haven't RSVPed`,
      description: 'Send a reminder to get responses',
      action: 'Send Reminder',
      actionHref: '/planning/guests',
    })
  }

  if (overdueTasks > 0) {
    suggestions.push({
      id: 'tasks',
      type: 'urgent',
      icon: Clock,
      title: `${overdueTasks} overdue task${overdueTasks > 1 ? 's' : ''}`,
      description: 'Review and update your task list',
      action: 'View Tasks',
      actionHref: '/planning/tasks',
    })
  }

  if (upcomingEvents.length > 0) {
    suggestions.push({
      id: 'event',
      type: 'success',
      icon: Calendar,
      title: `${upcomingEvents[0].name} coming up`,
      description: `Scheduled for ${upcomingEvents[0].date}`,
      action: 'View Event',
      actionHref: '/planning/events',
    })
  }

  if (suggestions.length === 0) {
    suggestions.push({
      id: 'default',
      type: 'success',
      icon: CheckCircle2,
      title: 'Everything looks great!',
      description: 'Your wedding planning is on track',
    })
  }

  const quickActions = [
    { label: 'Write Vows', icon: Heart },
    { label: 'Vendor Qs', icon: MessageCircle },
    { label: 'Budget Help', icon: Wallet },
    { label: 'Timeline', icon: Calendar },
  ]

  const handleSend = async () => {
    if (!message.trim()) return
    setIsLoading(true)
    // Here you would integrate with your AI service
    setTimeout(() => {
      setIsLoading(false)
      setMessage('')
    }, 1000)
  }

  const typeStyles = {
    urgent: 'border-l-red-500 bg-red-50',
    warning: 'border-l-amber-500 bg-amber-50',
    success: 'border-l-green-500 bg-green-50',
    info: 'border-l-blue-500 bg-blue-50',
  }

  const iconStyles = {
    urgent: 'text-red-600',
    warning: 'text-amber-600',
    success: 'text-green-600',
    info: 'text-blue-600',
  }

  return (
    <motion.div
      layout
      className={cn(
        "bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden",
        isExpanded && "fixed inset-4 z-50 md:inset-auto md:relative"
      )}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Wedding AI Assistant</h3>
            <p className="text-xs text-gray-500">Powered by AI</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isExpanded ? (
            <Minimize2 className="w-5 h-5 text-gray-400" />
          ) : (
            <Maximize2 className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className={cn("p-4", isExpanded && "h-[calc(100%-140px)] overflow-y-auto")}>
        {/* Greeting */}
        <div className="mb-4 p-3 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl">
          <p className="text-sm text-gray-700">
            <span className="font-medium text-purple-700">{greeting}!</span>{' '}
            Here's what needs your attention:
          </p>
        </div>

        {/* Suggestions */}
        <div className="space-y-3">
          <AnimatePresence>
            {suggestions.slice(0, isExpanded ? suggestions.length : 3).map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "p-3 rounded-lg border-l-4 flex items-start gap-3",
                  typeStyles[suggestion.type]
                )}
              >
                <suggestion.icon className={cn("w-5 h-5 mt-0.5 flex-shrink-0", iconStyles[suggestion.type])} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm">{suggestion.title}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{suggestion.description}</p>
                  {suggestion.action && (
                    <a
                      href={suggestion.actionHref}
                      className="inline-flex items-center gap-1 text-xs font-medium text-purple-600 hover:text-purple-700 mt-2"
                    >
                      {suggestion.action} →
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Quick Actions */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <p className="text-xs font-medium text-gray-500 mb-2">Quick Actions</p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs font-medium text-gray-700 transition-colors"
                >
                  <action.icon className="w-3.5 h-3.5" />
                  {action.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder='Ask me anything... "Help me write welcome message"'
            className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!message.trim() || isLoading}
            className="bg-purple-600 hover:bg-purple-700 rounded-xl h-10 w-10"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

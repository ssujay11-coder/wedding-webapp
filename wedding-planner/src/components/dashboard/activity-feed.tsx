'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Wallet,
  Mail,
  CheckCircle,
  Camera,
  Calendar,
  MessageCircle,
  ChevronRight,
  Clock,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface Activity {
  id: string
  type: 'guest' | 'payment' | 'email' | 'task' | 'photo' | 'event' | 'message'
  title: string
  description?: string
  timestamp: Date
  metadata?: {
    amount?: number
    count?: number
    name?: string
  }
}

interface ActivityFeedProps {
  activities?: Activity[]
  maxItems?: number
}

export function ActivityFeed({ activities = [], maxItems = 5 }: ActivityFeedProps) {
  const [displayActivities, setDisplayActivities] = useState<Activity[]>([])

  useEffect(() => {
    // If no activities provided, use sample data
    if (activities.length === 0) {
      setDisplayActivities([
        {
          id: '1',
          type: 'guest',
          title: 'Sharma family (4 guests) confirmed attendance',
          timestamp: new Date(Date.now() - 2 * 60 * 1000),
        },
        {
          id: '2',
          type: 'payment',
          title: 'Payment recorded',
          description: 'Decorator - ₹50,000',
          timestamp: new Date(Date.now() - 60 * 60 * 1000),
        },
        {
          id: '3',
          type: 'email',
          title: 'RSVP reminder sent',
          description: 'To 45 guests',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        },
        {
          id: '4',
          type: 'task',
          title: 'Task completed',
          description: 'Finalize guest list',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
        {
          id: '5',
          type: 'photo',
          title: 'Mom added photos',
          description: '12 photos to inspiration board',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      ])
    } else {
      setDisplayActivities(activities.slice(0, maxItems))
    }
  }, [activities, maxItems])

  const getIcon = (type: Activity['type']) => {
    const icons = {
      guest: { icon: Users, color: 'text-green-600 bg-green-100' },
      payment: { icon: Wallet, color: 'text-amber-600 bg-amber-100' },
      email: { icon: Mail, color: 'text-blue-600 bg-blue-100' },
      task: { icon: CheckCircle, color: 'text-purple-600 bg-purple-100' },
      photo: { icon: Camera, color: 'text-pink-600 bg-pink-100' },
      event: { icon: Calendar, color: 'text-rose-600 bg-rose-100' },
      message: { icon: MessageCircle, color: 'text-cyan-600 bg-cyan-100' },
    }
    return icons[type]
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes} min${minutes > 1 ? 's' : ''} ago`
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    if (days === 1) return 'Yesterday'
    return `${days} days ago`
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <Link
          href="/planning/activity"
          className="text-sm text-rose-600 hover:underline flex items-center gap-1"
        >
          See All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-1">
        {displayActivities.map((activity, index) => {
          const { icon: Icon, color } = getIcon(activity.type)
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group cursor-pointer"
            >
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", color)}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 group-hover:text-rose-600 transition-colors">
                  {activity.title}
                </p>
                {activity.description && (
                  <p className="text-xs text-gray-500 mt-0.5">{activity.description}</p>
                )}
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {formatTimestamp(activity.timestamp)}
              </span>
            </motion.div>
          )
        })}
      </div>

      {displayActivities.length === 0 && (
        <div className="text-center py-8">
          <Clock className="w-12 h-12 mx-auto text-gray-200 mb-3" />
          <p className="text-gray-500">No recent activity</p>
        </div>
      )}
    </div>
  )
}

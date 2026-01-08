'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  Check,
  X,
  Clock,
  Plane,
  Car,
  Mail,
  Phone,
  MoreHorizontal,
  Plus,
  Download,
  Upload,
  Send,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface Guest {
  id: string
  name: string
  email?: string
  phone?: string
  side: 'bride' | 'groom' | 'mutual'
  category: 'family' | 'friends' | 'colleagues' | 'vip'
  rsvpStatus: 'confirmed' | 'pending' | 'declined'
  events: string[]
  travelStatus?: 'submitted' | 'pending' | 'not-needed'
  dietaryRestrictions?: string[]
  familyGroup?: string
  familyMembers?: Guest[]
}

interface GuestTableProps {
  guests?: Guest[]
  onGuestSelect?: (guest: Guest) => void
  weddingId?: string
}

export function GuestTable({ guests = [], onGuestSelect, weddingId }: GuestTableProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sideFilter, setSideFilter] = useState<'all' | 'bride' | 'groom' | 'mutual'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'confirmed' | 'pending' | 'declined'>('all')
  const [expandedFamilies, setExpandedFamilies] = useState<Set<string>>(new Set())

  // Sample data if no guests provided
  const sampleGuests: Guest[] = useMemo(() => [
    {
      id: '1',
      name: 'Sharma Family',
      side: 'bride',
      category: 'family',
      rsvpStatus: 'confirmed',
      events: ['mehendi', 'sangeet', 'wedding', 'reception'],
      travelStatus: 'submitted',
      familyGroup: 'sharma',
      familyMembers: [
        { id: '1a', name: 'Rakesh Sharma', side: 'bride', category: 'family', rsvpStatus: 'confirmed', events: ['all'] },
        { id: '1b', name: 'Sunita Sharma', side: 'bride', category: 'family', rsvpStatus: 'confirmed', events: ['all'] },
        { id: '1c', name: 'Rohit Sharma', side: 'bride', category: 'family', rsvpStatus: 'confirmed', events: ['all'] },
        { id: '1d', name: 'Neha Sharma', side: 'bride', category: 'family', rsvpStatus: 'confirmed', events: ['all'] },
      ],
    },
    {
      id: '2',
      name: 'Kapoor Family',
      side: 'groom',
      category: 'family',
      rsvpStatus: 'pending',
      events: ['sangeet', 'wedding', 'reception'],
      travelStatus: 'pending',
      familyGroup: 'kapoor',
      familyMembers: [
        { id: '2a', name: 'Vijay Kapoor', side: 'groom', category: 'family', rsvpStatus: 'confirmed', events: ['all'] },
        { id: '2b', name: 'Meera Kapoor', side: 'groom', category: 'family', rsvpStatus: 'confirmed', events: ['all'] },
        { id: '2c', name: 'Arjun Kapoor', side: 'groom', category: 'family', rsvpStatus: 'pending', events: [] },
      ],
    },
    {
      id: '3',
      name: 'Amit & Priya Desai',
      side: 'mutual',
      category: 'friends',
      rsvpStatus: 'confirmed',
      events: ['sangeet', 'wedding', 'reception'],
      travelStatus: 'submitted',
    },
    {
      id: '4',
      name: 'Dr. Rajesh Gupta',
      side: 'bride',
      category: 'vip',
      rsvpStatus: 'declined',
      events: [],
    },
  ], [])

  const displayGuests = guests.length > 0 ? guests : sampleGuests

  const filteredGuests = useMemo(() => {
    return displayGuests.filter(guest => {
      const matchesSearch = guest.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesSide = sideFilter === 'all' || guest.side === sideFilter
      const matchesStatus = statusFilter === 'all' || guest.rsvpStatus === statusFilter
      return matchesSearch && matchesSide && matchesStatus
    })
  }, [displayGuests, searchQuery, sideFilter, statusFilter])

  const stats = useMemo(() => {
    const total = displayGuests.reduce((acc, g) => acc + (g.familyMembers?.length || 1), 0)
    const confirmed = displayGuests.filter(g => g.rsvpStatus === 'confirmed')
      .reduce((acc, g) => acc + (g.familyMembers?.length || 1), 0)
    const pending = displayGuests.filter(g => g.rsvpStatus === 'pending')
      .reduce((acc, g) => acc + (g.familyMembers?.length || 1), 0)
    const declined = displayGuests.filter(g => g.rsvpStatus === 'declined')
      .reduce((acc, g) => acc + (g.familyMembers?.length || 1), 0)
    return { total, confirmed, pending, declined }
  }, [displayGuests])

  const toggleFamily = (familyId: string) => {
    const newExpanded = new Set(expandedFamilies)
    if (newExpanded.has(familyId)) {
      newExpanded.delete(familyId)
    } else {
      newExpanded.add(familyId)
    }
    setExpandedFamilies(newExpanded)
  }

  const getRsvpIcon = (status: Guest['rsvpStatus']) => {
    switch (status) {
      case 'confirmed':
        return <Check className="w-4 h-4 text-green-600" />
      case 'pending':
        return <Clock className="w-4 h-4 text-amber-500" />
      case 'declined':
        return <X className="w-4 h-4 text-red-500" />
    }
  }

  const getTravelIcon = (status?: Guest['travelStatus']) => {
    switch (status) {
      case 'submitted':
        return <Plane className="w-4 h-4 text-green-600" />
      case 'pending':
        return <Clock className="w-4 h-4 text-amber-500" />
      default:
        return <Car className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header with Stats */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-rose-500" />
            <h2 className="text-xl font-semibold text-gray-900">Guest Management</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-lg">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" size="sm" className="rounded-lg">
              <Send className="w-4 h-4 mr-2" />
              Send Invites
            </Button>
            <Link href="/planning/guests/add">
              <Button size="sm" className="bg-rose-600 hover:bg-rose-700 rounded-lg">
                <Plus className="w-4 h-4 mr-2" />
                Add Guest
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-3 rounded-xl bg-gray-50">
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs text-gray-500">Total Invited</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-green-50">
            <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
            <p className="text-xs text-gray-500">Confirmed</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-amber-50">
            <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
            <p className="text-xs text-gray-500">Pending</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-red-50">
            <p className="text-2xl font-bold text-red-600">{stats.declined}</p>
            <p className="text-xs text-gray-500">Declined</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search guests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={sideFilter}
              onChange={(e) => setSideFilter(e.target.value as typeof sideFilter)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            >
              <option value="all">All Sides</option>
              <option value="bride">Bride's Side</option>
              <option value="groom">Groom's Side</option>
              <option value="mutual">Mutual</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="declined">Declined</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Guest</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Side</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">RSVP</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Events</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Travel</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredGuests.map((guest, index) => (
              <motion.tr
                key={guest.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.02 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {guest.familyMembers && guest.familyMembers.length > 0 && (
                      <button
                        onClick={() => toggleFamily(guest.id)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        {expandedFamilies.has(guest.id) ? (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{guest.name}</p>
                      {guest.familyMembers && (
                        <p className="text-xs text-gray-500">{guest.familyMembers.length} members</p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={cn(
                    "inline-flex px-2 py-1 text-xs font-medium rounded-full",
                    guest.side === 'bride' && "bg-pink-100 text-pink-700",
                    guest.side === 'groom' && "bg-blue-100 text-blue-700",
                    guest.side === 'mutual' && "bg-purple-100 text-purple-700"
                  )}>
                    {guest.side.charAt(0).toUpperCase() + guest.side.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {getRsvpIcon(guest.rsvpStatus)}
                    <span className={cn(
                      "text-sm font-medium",
                      guest.rsvpStatus === 'confirmed' && "text-green-600",
                      guest.rsvpStatus === 'pending' && "text-amber-600",
                      guest.rsvpStatus === 'declined' && "text-red-600"
                    )}>
                      {guest.rsvpStatus.charAt(0).toUpperCase() + guest.rsvpStatus.slice(1)}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-gray-600">
                    {guest.events.length > 0 ? `${guest.events.length} events` : '-'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {getTravelIcon(guest.travelStatus)}
                    <span className="text-xs text-gray-500">
                      {guest.travelStatus === 'submitted' ? 'Done' :
                       guest.travelStatus === 'pending' ? 'Pending' : 'N/A'}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredGuests.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 mx-auto text-gray-200 mb-3" />
          <p className="text-gray-500">No guests found</p>
        </div>
      )}

      {/* Pagination */}
      <div className="p-4 border-t border-gray-100 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {filteredGuests.length} of {displayGuests.length} families
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  )
}

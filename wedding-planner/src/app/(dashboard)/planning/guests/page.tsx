'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useWedding } from '@/contexts/wedding-context'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Guest } from '@/types/database'
import {
  Users,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  MoreHorizontal,
  Mail,
  Phone,
  Check,
  X,
  Clock,
  ChevronDown,
  Loader2,
  UserPlus,
  Trash2,
  Edit,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-gray-100 text-gray-700', icon: Clock },
  invited: { label: 'Invited', color: 'bg-blue-100 text-blue-700', icon: Mail },
  confirmed: { label: 'Confirmed', color: 'bg-green-100 text-green-700', icon: Check },
  declined: { label: 'Declined', color: 'bg-red-100 text-red-700', icon: X },
  maybe: { label: 'Maybe', color: 'bg-amber-100 text-amber-700', icon: Clock },
  no_response: { label: 'No Response', color: 'bg-gray-100 text-gray-500', icon: Clock },
}

const categoryConfig = {
  family: { label: 'Family', color: 'bg-purple-100 text-purple-700' },
  close_family: { label: 'Close Family', color: 'bg-purple-200 text-purple-800' },
  friends: { label: 'Friends', color: 'bg-blue-100 text-blue-700' },
  colleagues: { label: 'Colleagues', color: 'bg-cyan-100 text-cyan-700' },
  vip: { label: 'VIP', color: 'bg-amber-100 text-amber-700' },
  vendor: { label: 'Vendor', color: 'bg-gray-100 text-gray-700' },
  other: { label: 'Other', color: 'bg-gray-100 text-gray-600' },
}

const sideConfig = {
  bride: { label: "Bride's Side", color: 'text-pink-600' },
  groom: { label: "Groom's Side", color: 'text-blue-600' },
  mutual: { label: 'Mutual', color: 'text-purple-600' },
  planner: { label: 'Planner', color: 'text-gray-600' },
}

export default function GuestsPage() {
  const { currentWedding } = useWedding()
  const [guests, setGuests] = useState<Guest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterSide, setFilterSide] = useState<string>('all')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedGuests, setSelectedGuests] = useState<string[]>([])

  const fetchGuests = useCallback(async () => {
    if (!currentWedding) return

    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('guests')
        .select('*')
        .eq('wedding_id', currentWedding.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setGuests(data || [])
    } catch (error) {
      console.error('Error fetching guests:', error)
    } finally {
      setIsLoading(false)
    }
  }, [currentWedding, supabase])

  useEffect(() => {
    fetchGuests()
  }, [fetchGuests])

  // Filter guests
  const filteredGuests = guests.filter((guest) => {
    const matchesSearch =
      searchQuery === '' ||
      `${guest.first_name} ${guest.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.phone?.includes(searchQuery)

    const matchesStatus = filterStatus === 'all' || guest.status === filterStatus
    const matchesSide = filterSide === 'all' || guest.side === filterSide
    const matchesCategory = filterCategory === 'all' || guest.category === filterCategory

    return matchesSearch && matchesStatus && matchesSide && matchesCategory
  })

  // Stats
  const stats = {
    total: guests.length,
    confirmed: guests.filter((g) => g.status === 'confirmed').length,
    pending: guests.filter((g) => g.status === 'pending' || g.status === 'invited').length,
    declined: guests.filter((g) => g.status === 'declined').length,
  }

  const handleSelectAll = () => {
    if (selectedGuests.length === filteredGuests.length) {
      setSelectedGuests([])
    } else {
      setSelectedGuests(filteredGuests.map((g) => g.id))
    }
  }

  const handleSelectGuest = (guestId: string) => {
    setSelectedGuests((prev) =>
      prev.includes(guestId) ? prev.filter((id) => id !== guestId) : [...prev, guestId]
    )
  }

  const handleDeleteSelected = async () => {
    if (!confirm(`Delete ${selectedGuests.length} guest(s)?`)) return

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from('guests')
        .delete()
        .in('id', selectedGuests)

      if (error) throw error
      setSelectedGuests([])
      fetchGuests()
    } catch (error) {
      console.error('Error deleting guests:', error)
    }
  }

  const handleUpdateStatus = async (guestId: string, status: Guest['status']) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from('guests')
        .update({ status })
        .eq('id', guestId)

      if (error) throw error
      fetchGuests()
    } catch (error) {
      console.error('Error updating guest:', error)
    }
  }

  if (!currentWedding) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Please select a wedding first</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">Guest List</h1>
          <p className="text-gray-500 mt-1">
            Manage your wedding guests and track RSVPs
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:flex">
            <Upload className="h-4 w-4 mr-2" />
            Import CSV
          </Button>
          <Button variant="outline" className="hidden sm:flex">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Link href="/planning/guests/add">
            <Button className="bg-rose-600 hover:bg-rose-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Guest
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-sm text-gray-500">Total Guests</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-sm text-gray-500">Confirmed</p>
          <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-sm text-gray-500">Declined</p>
          <p className="text-2xl font-bold text-red-600">{stats.declined}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={cn(showFilters && 'bg-gray-100')}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            <ChevronDown className={cn('h-4 w-4 ml-2 transition-transform', showFilters && 'rotate-180')} />
          </Button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm"
              >
                <option value="all">All Statuses</option>
                {Object.entries(statusConfig).map(([key, config]) => (
                  <option key={key} value={key}>{config.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Side</label>
              <select
                value={filterSide}
                onChange={(e) => setFilterSide(e.target.value)}
                className="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm"
              >
                <option value="all">All Sides</option>
                {Object.entries(sideConfig).map(([key, config]) => (
                  <option key={key} value={key}>{config.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm"
              >
                <option value="all">All Categories</option>
                {Object.entries(categoryConfig).map(([key, config]) => (
                  <option key={key} value={key}>{config.label}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedGuests.length > 0 && (
        <div className="bg-rose-50 rounded-xl p-4 flex items-center justify-between">
          <p className="text-sm text-rose-700">
            <strong>{selectedGuests.length}</strong> guest(s) selected
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setSelectedGuests([])}>
              Clear Selection
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:bg-red-50"
              onClick={handleDeleteSelected}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      )}

      {/* Guest Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
          </div>
        ) : filteredGuests.length === 0 ? (
          <div className="text-center py-12">
            <UserPlus className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No guests yet</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery || filterStatus !== 'all' || filterSide !== 'all'
                ? 'No guests match your filters'
                : 'Start by adding your first guest'}
            </p>
            {!searchQuery && filterStatus === 'all' && (
              <Link href="/planning/guests/add">
                <Button className="bg-rose-600 hover:bg-rose-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Guest
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedGuests.length === filteredGuests.length && filteredGuests.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Guest
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Contact
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Side
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredGuests.map((guest) => {
                  const status = statusConfig[guest.status]
                  const side = guest.side ? sideConfig[guest.side] : null
                  const category = guest.category ? categoryConfig[guest.category] : null

                  return (
                    <tr key={guest.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selectedGuests.includes(guest.id)}
                          onChange={() => handleSelectGuest(guest.id)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {guest.first_name} {guest.last_name}
                          </p>
                          {guest.relationship && (
                            <p className="text-sm text-gray-500">{guest.relationship}</p>
                          )}
                          {guest.has_plus_one && (
                            <p className="text-xs text-rose-600 mt-1">
                              +1: {guest.plus_one_name || 'TBD'}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <div className="space-y-1">
                          {guest.email && (
                            <div className="flex items-center text-sm text-gray-500">
                              <Mail className="h-4 w-4 mr-1" />
                              {guest.email}
                            </div>
                          )}
                          {guest.phone && (
                            <div className="flex items-center text-sm text-gray-500">
                              <Phone className="h-4 w-4 mr-1" />
                              {guest.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden sm:table-cell">
                        {side && (
                          <span className={cn('text-sm font-medium', side.color)}>
                            {side.label}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        {category && (
                          <span className={cn('px-2 py-1 rounded-full text-xs font-medium', category.color)}>
                            {category.label}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <select
                          value={guest.status}
                          onChange={(e) => handleUpdateStatus(guest.id, e.target.value as Guest['status'])}
                          className={cn(
                            'px-2 py-1 rounded-full text-xs font-medium border-0 cursor-pointer',
                            status.color
                          )}
                        >
                          {Object.entries(statusConfig).map(([key, config]) => (
                            <option key={key} value={key}>{config.label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/planning/guests/${guest.id}`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary */}
      {filteredGuests.length > 0 && (
        <p className="text-sm text-gray-500 text-center">
          Showing {filteredGuests.length} of {guests.length} guests
        </p>
      )}
    </div>
  )
}

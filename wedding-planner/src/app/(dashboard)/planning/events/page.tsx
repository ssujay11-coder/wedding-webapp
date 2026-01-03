'use client'

import { useEffect, useState, useCallback } from 'react'
import { useWedding } from '@/contexts/wedding-context'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { WeddingEvent } from '@/types/database'
import {
  Calendar,
  Plus,
  Clock,
  MapPin,
  Users,
  Edit,
  Trash2,
  Loader2,
  X,
  Save,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const eventTypes = [
  { id: 'engagement', name: 'Engagement', emoji: '💍', color: 'bg-pink-100 text-pink-700' },
  { id: 'roka', name: 'Roka', emoji: '🤝', color: 'bg-amber-100 text-amber-700' },
  { id: 'mehendi', name: 'Mehendi', emoji: '✋', color: 'bg-green-100 text-green-700' },
  { id: 'haldi', name: 'Haldi', emoji: '💛', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'sangeet', name: 'Sangeet', emoji: '💃', color: 'bg-purple-100 text-purple-700' },
  { id: 'cocktail', name: 'Cocktail', emoji: '🍸', color: 'bg-blue-100 text-blue-700' },
  { id: 'wedding', name: 'Wedding Ceremony', emoji: '💒', color: 'bg-rose-100 text-rose-700' },
  { id: 'reception', name: 'Reception', emoji: '🎉', color: 'bg-indigo-100 text-indigo-700' },
  { id: 'welcome_dinner', name: 'Welcome Dinner', emoji: '🍽️', color: 'bg-orange-100 text-orange-700' },
  { id: 'farewell_brunch', name: 'Farewell Brunch', emoji: '🥐', color: 'bg-cyan-100 text-cyan-700' },
  { id: 'other', name: 'Other', emoji: '📅', color: 'bg-gray-100 text-gray-700' },
]

export default function EventsPage() {
  const { currentWedding, refreshStats } = useWedding()

  const [events, setEvents] = useState<WeddingEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<WeddingEvent | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Form state
  const [eventName, setEventName] = useState('')
  const [eventType, setEventType] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [venueName, setVenueName] = useState('')
  const [venueAddress, setVenueAddress] = useState('')
  const [venueCity, setVenueCity] = useState('')
  const [dressCode, setDressCode] = useState('')
  const [description, setDescription] = useState('')
  const [estimatedGuests, setEstimatedGuests] = useState('')

  const fetchEvents = useCallback(async () => {
    if (!currentWedding) return

    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('wedding_events')
        .select('*')
        .eq('wedding_id', currentWedding.id)
        .order('event_date', { ascending: true })
        .order('start_time', { ascending: true })

      if (error) throw error
      setEvents(data || [])
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setIsLoading(false)
    }
  }, [currentWedding, supabase])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  const resetForm = () => {
    setEventName('')
    setEventType('')
    setEventDate('')
    setStartTime('')
    setEndTime('')
    setVenueName('')
    setVenueAddress('')
    setVenueCity('')
    setDressCode('')
    setDescription('')
    setEstimatedGuests('')
    setEditingEvent(null)
  }

  const openModal = (event?: WeddingEvent) => {
    if (event) {
      setEditingEvent(event)
      setEventName(event.name)
      setEventType(event.event_type)
      setEventDate(event.event_date)
      setStartTime(event.start_time || '')
      setEndTime(event.end_time || '')
      setVenueName(event.venue_name || '')
      setVenueAddress(event.venue_address || '')
      setVenueCity(event.venue_city || '')
      setDressCode(event.dress_code || '')
      setDescription(event.description || '')
      setEstimatedGuests(event.estimated_guests?.toString() || '')
    } else {
      resetForm()
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    resetForm()
  }

  const handleSave = async () => {
    if (!currentWedding || !eventName || !eventType || !eventDate) return

    setIsSaving(true)
    try {
      const eventData = {
        wedding_id: currentWedding.id,
        name: eventName,
        event_type: eventType,
        event_date: eventDate,
        start_time: startTime || null,
        end_time: endTime || null,
        venue_name: venueName || null,
        venue_address: venueAddress || null,
        venue_city: venueCity || null,
        dress_code: dressCode || null,
        description: description || null,
        estimated_guests: estimatedGuests ? parseInt(estimatedGuests) : null,
      }

      if (editingEvent) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error } = await (supabase as any)
          .from('wedding_events')
          .update(eventData)
          .eq('id', editingEvent.id)
        if (error) throw error
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error } = await (supabase as any)
          .from('wedding_events')
          .insert(eventData)
        if (error) throw error
      }

      await fetchEvents()
      await refreshStats()
      closeModal()
    } catch (error) {
      console.error('Error saving event:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return

    try {
      const { error } = await supabase
        .from('wedding_events')
        .delete()
        .eq('id', eventId)

      if (error) throw error
      await fetchEvents()
      await refreshStats()
    } catch (error) {
      console.error('Error deleting event:', error)
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
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
          <h1 className="text-2xl font-serif font-bold text-gray-900">Wedding Events</h1>
          <p className="text-gray-500 mt-1">
            Manage your mehendi, sangeet, wedding ceremony, and reception
          </p>
        </div>
        <Button
          onClick={() => openModal()}
          className="bg-rose-600 hover:bg-rose-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      {/* Events List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
        </div>
      ) : events.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events yet</h3>
          <p className="text-gray-500 mb-6">
            Start by adding your wedding functions like Mehendi, Sangeet, and Reception
          </p>
          <Button
            onClick={() => openModal()}
            className="bg-rose-600 hover:bg-rose-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Event
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => {
            const eventTypeConfig = eventTypes.find((t) => t.id === event.event_type) || eventTypes[eventTypes.length - 1]

            return (
              <div
                key={event.id}
                className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      'w-14 h-14 rounded-xl flex items-center justify-center text-2xl',
                      eventTypeConfig.color
                    )}>
                      {eventTypeConfig.emoji}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{event.name}</h3>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(event.event_date)}
                        </div>
                        {event.start_time && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {formatTime(event.start_time)}
                            {event.end_time && ` - ${formatTime(event.end_time)}`}
                          </div>
                        )}
                        {event.venue_name && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {event.venue_name}
                            {event.venue_city && `, ${event.venue_city}`}
                          </div>
                        )}
                        {event.estimated_guests && (
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {event.estimated_guests} guests
                          </div>
                        )}
                      </div>
                      {event.dress_code && (
                        <p className="mt-2 text-sm">
                          <span className="text-gray-500">Dress Code:</span>{' '}
                          <span className="font-medium text-gray-700">{event.dress_code}</span>
                        </p>
                      )}
                      {event.description && (
                        <p className="mt-2 text-sm text-gray-600">{event.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openModal(event)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDelete(event.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={closeModal} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingEvent ? 'Edit Event' : 'Add New Event'}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Event Type */}
              <div>
                <Label className="mb-3 block">Event Type</Label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {eventTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => {
                        setEventType(type.id)
                        if (!eventName) setEventName(type.name)
                      }}
                      className={cn(
                        'p-3 rounded-xl border-2 text-center transition-all',
                        eventType === type.id
                          ? 'border-rose-500 bg-rose-50'
                          : 'border-gray-200 hover:border-gray-300'
                      )}
                    >
                      <span className="text-xl mb-1 block">{type.emoji}</span>
                      <span className="text-xs font-medium text-gray-700">{type.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Event Name */}
              <div className="space-y-2">
                <Label htmlFor="eventName">Event Name *</Label>
                <Input
                  id="eventName"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="e.g., Mehendi Ceremony"
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eventDate">Date *</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>

              {/* Venue */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  Venue Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="venueName">Venue Name</Label>
                    <Input
                      id="venueName"
                      value={venueName}
                      onChange={(e) => setVenueName(e.target.value)}
                      placeholder="e.g., Taj Lake Palace"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="venueCity">City</Label>
                    <Input
                      id="venueCity"
                      value={venueCity}
                      onChange={(e) => setVenueCity(e.target.value)}
                      placeholder="e.g., Udaipur"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="venueAddress">Full Address</Label>
                  <Input
                    id="venueAddress"
                    value={venueAddress}
                    onChange={(e) => setVenueAddress(e.target.value)}
                    placeholder="Enter complete venue address"
                  />
                </div>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dressCode">Dress Code</Label>
                  <Input
                    id="dressCode"
                    value={dressCode}
                    onChange={(e) => setDressCode(e.target.value)}
                    placeholder="e.g., Indian Traditional"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimatedGuests">Expected Guests</Label>
                  <Input
                    id="estimatedGuests"
                    type="number"
                    value={estimatedGuests}
                    onChange={(e) => setEstimatedGuests(e.target.value)}
                    placeholder="e.g., 200"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add any additional details about this event..."
                  className="w-full h-24 rounded-lg border border-gray-200 px-3 py-2 text-sm resize-none"
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex items-center justify-end gap-3">
              <Button variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving || !eventName || !eventType || !eventDate}
                className="bg-rose-600 hover:bg-rose-700 text-white"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {editingEvent ? 'Update Event' : 'Create Event'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

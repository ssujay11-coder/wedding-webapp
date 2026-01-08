'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Plane,
  Car,
  Building,
  Clock,
  Users,
  MapPin,
  ChevronRight,
  Plus,
  AlertCircle,
  CheckCircle,
  Calendar,
  Phone,
  User,
  Send,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Arrival {
  id: string
  flightNumber: string
  from: string
  time: string
  guests: string[]
  guestCount: number
  vehicle?: string
  driver?: string
  status: 'assigned' | 'pending'
}

interface Vehicle {
  id: string
  type: string
  capacity: number
  pricePerDay: number
  count: number
  image?: string
}

interface Room {
  id: string
  type: string
  reserved: number
  assigned: number
  available: number
}

interface LogisticsManagerProps {
  arrivals?: Arrival[]
  vehicles?: Vehicle[]
  rooms?: Room[]
  weddingDate?: string
  venue?: string
}

export function LogisticsManager({
  arrivals = [],
  vehicles = [],
  rooms = [],
  weddingDate = 'Feb 13-17',
  venue = 'Taj Lake Palace',
}: LogisticsManagerProps) {
  const [activeTab, setActiveTab] = useState<'arrivals' | 'vehicles' | 'rooms'>('arrivals')

  // Sample data
  const sampleArrivals: Arrival[] = [
    {
      id: '1',
      flightNumber: 'AI 477',
      from: 'Mumbai',
      time: '09:30 AM',
      guests: ['Sharma Family'],
      guestCount: 4,
      vehicle: 'Innova',
      driver: 'Rajesh',
      status: 'assigned',
    },
    {
      id: '2',
      flightNumber: '6E 234',
      from: 'Delhi',
      time: '10:15 AM',
      guests: ['Kapoor Family'],
      guestCount: 6,
      vehicle: 'Tempo Traveller',
      driver: 'Suresh',
      status: 'assigned',
    },
    {
      id: '3',
      flightNumber: 'UK 678',
      from: 'Bangalore',
      time: '11:45 AM',
      guests: ['Desai Couple'],
      guestCount: 2,
      status: 'pending',
    },
    {
      id: '4',
      flightNumber: 'AI 891',
      from: 'Mumbai',
      time: '02:30 PM',
      guests: ['3 families'],
      guestCount: 8,
      vehicle: 'Tempo Traveller',
      status: 'assigned',
    },
    {
      id: '5',
      flightNumber: 'SG 432',
      from: 'Chennai',
      time: '05:30 PM',
      guests: ['2 families'],
      guestCount: 8,
      status: 'pending',
    },
  ]

  const sampleVehicles: Vehicle[] = [
    { id: '1', type: 'Tempo Traveller', capacity: 12, pricePerDay: 3000, count: 2 },
    { id: '2', type: 'Innova', capacity: 7, pricePerDay: 2500, count: 3 },
    { id: '3', type: 'Bus', capacity: 20, pricePerDay: 8000, count: 1 },
  ]

  const sampleRooms: Room[] = [
    { id: '1', type: 'Palace Room', reserved: 30, assigned: 28, available: 2 },
    { id: '2', type: 'Luxury Suite', reserved: 20, assigned: 18, available: 2 },
    { id: '3', type: 'Royal Suite', reserved: 10, assigned: 10, available: 0 },
  ]

  const displayArrivals = arrivals.length > 0 ? arrivals : sampleArrivals
  const displayVehicles = vehicles.length > 0 ? vehicles : sampleVehicles
  const displayRooms = rooms.length > 0 ? rooms : sampleRooms

  const totalGuests = displayArrivals.reduce((sum, a) => sum + a.guestCount, 0)
  const assignedGuests = displayArrivals.filter(a => a.status === 'assigned').reduce((sum, a) => sum + a.guestCount, 0)
  const pendingArrivals = displayArrivals.filter(a => a.status === 'pending').length

  const totalRooms = displayRooms.reduce((sum, r) => sum + r.reserved, 0)
  const assignedRooms = displayRooms.reduce((sum, r) => sum + r.assigned, 0)
  const availableRooms = displayRooms.reduce((sum, r) => sum + r.available, 0)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <Plane className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Guest Logistics</h2>
              <p className="text-sm text-gray-500">{venue} • {weddingDate}</p>
            </div>
          </div>
          <Button className="bg-rose-600 hover:bg-rose-700 rounded-lg">
            <Send className="w-4 h-4 mr-2" />
            Send Travel Form
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-3 rounded-xl bg-gray-50">
            <p className="text-2xl font-bold text-gray-900">{totalGuests}</p>
            <p className="text-xs text-gray-500">Total Arrivals</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-green-50">
            <p className="text-2xl font-bold text-green-600">{assignedGuests}</p>
            <p className="text-xs text-gray-500">Pickups Arranged</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-amber-50">
            <p className="text-2xl font-bold text-amber-600">{pendingArrivals}</p>
            <p className="text-xs text-gray-500">Pending Pickups</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-blue-50">
            <p className="text-2xl font-bold text-blue-600">{totalRooms}</p>
            <p className="text-xs text-gray-500">Rooms Blocked</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        {[
          { id: 'arrivals', label: 'Arrivals', icon: Plane },
          { id: 'vehicles', label: 'Vehicles', icon: Car },
          { id: 'rooms', label: 'Rooms', icon: Building },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "text-rose-600 border-b-2 border-rose-600 bg-rose-50/50"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'arrivals' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Arrival Schedule - Feb 13</h3>
              <Button variant="outline" size="sm" className="rounded-lg">
                <Plus className="w-4 h-4 mr-2" />
                Add Arrival
              </Button>
            </div>

            <div className="space-y-3">
              {displayArrivals.map((arrival, index) => (
                <motion.div
                  key={arrival.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "p-4 rounded-xl border-l-4",
                    arrival.status === 'assigned'
                      ? "bg-green-50 border-l-green-500"
                      : "bg-amber-50 border-l-amber-500"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-lg font-bold text-gray-900">{arrival.time}</p>
                        <p className="text-xs text-gray-500">{arrival.flightNumber}</p>
                      </div>
                      <div className="h-10 w-px bg-gray-200" />
                      <div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">From {arrival.from}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">
                            {arrival.guests.join(', ')} ({arrival.guestCount})
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      {arrival.status === 'assigned' ? (
                        <div>
                          <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                            <Car className="w-4 h-4" />
                            {arrival.vehicle}
                          </div>
                          {arrival.driver && (
                            <p className="text-xs text-gray-500 mt-1">Driver: {arrival.driver}</p>
                          )}
                        </div>
                      ) : (
                        <Button size="sm" className="bg-amber-600 hover:bg-amber-700 rounded-lg">
                          <Car className="w-4 h-4 mr-2" />
                          Assign Vehicle
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'vehicles' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 mb-4">Available Vehicles</h3>
            <div className="grid grid-cols-3 gap-4">
              {displayVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="p-4 rounded-xl border border-gray-200 hover:border-rose-200 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-3">
                    <Car className="w-6 h-6 text-gray-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900">{vehicle.type}</h4>
                  <p className="text-sm text-gray-500">{vehicle.capacity} seats</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm font-medium text-rose-600">
                      ₹{vehicle.pricePerDay.toLocaleString()}/day
                    </span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      {vehicle.count} available
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Suggestion */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-violet-50">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Plane className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">AI Allocation Suggestion</p>
                  <p className="text-xs text-gray-600">
                    Based on arrival times, I recommend: 09:30 batch → Innova #1, 10:15 batch → Tempo #1,
                    02:30 batch → Tempo #2, 04:00 batch → Bus. Total cost: ₹18,500
                  </p>
                  <Button size="sm" className="mt-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-xs">
                    Apply Suggestion
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rooms' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Room Allocation - {venue}</h3>
              <p className="text-sm text-gray-500">Check-in: Feb 13-17</p>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Room Type</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500">Reserved</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500">Assigned</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500">Available</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {displayRooms.map((room) => (
                    <tr key={room.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{room.type}</td>
                      <td className="px-4 py-3 text-center text-gray-600">{room.reserved}</td>
                      <td className="px-4 py-3 text-center text-gray-600">{room.assigned}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={cn(
                          "inline-flex px-2 py-1 rounded-full text-xs font-medium",
                          room.available > 0 ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                        )}>
                          {room.available}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-amber-50">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <span className="text-sm text-amber-800">
                  {totalRooms - assignedRooms} guests still need room assignment
                </span>
              </div>
              <Button size="sm" variant="outline" className="rounded-lg">
                Auto-Assign
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

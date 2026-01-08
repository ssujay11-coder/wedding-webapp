'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  ChevronRight,
  Plus,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  Search,
  Filter,
  Download,
  Printer,
  Move,
  Table2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface TableData {
  id: string
  name: string
  capacity: number
  assigned: number
  guests: string[]
  position: { x: number; y: number }
  type: 'vip' | 'main' | 'regular'
  status: 'full' | 'partial' | 'empty'
}

interface SeatingConflict {
  id: string
  description: string
  suggestion: string
  severity: 'high' | 'medium' | 'low'
}

interface SeatingChartProps {
  tables?: TableData[]
  totalGuests?: number
  assignedGuests?: number
  unassignedGuests?: number
  conflicts?: SeatingConflict[]
}

export function SeatingChart({
  tables = [],
  totalGuests = 400,
  assignedGuests = 355,
  unassignedGuests = 45,
  conflicts = [],
}: SeatingChartProps) {
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'visual' | 'list'>('visual')

  // Sample tables
  const sampleTables: TableData[] = [
    { id: 'vip1', name: 'VIP 1', capacity: 10, assigned: 10, guests: ["Bride's Parents", "Close Family"], position: { x: 10, y: 20 }, type: 'vip', status: 'full' },
    { id: 'vip2', name: 'VIP 2', capacity: 10, assigned: 10, guests: ["Groom's Parents", "Close Family"], position: { x: 80, y: 20 }, type: 'vip', status: 'full' },
    { id: 'main1', name: 'Main 1', capacity: 12, assigned: 12, guests: ['Wedding Party'], position: { x: 35, y: 25 }, type: 'main', status: 'full' },
    { id: 'main2', name: 'Main 2', capacity: 12, assigned: 12, guests: ['Wedding Party'], position: { x: 55, y: 25 }, type: 'main', status: 'full' },
    { id: 't1', name: 'T-1', capacity: 10, assigned: 10, guests: ['Sharma Family'], position: { x: 10, y: 50 }, type: 'regular', status: 'full' },
    { id: 't2', name: 'T-2', capacity: 10, assigned: 10, guests: ['Kapoor Family'], position: { x: 28, y: 50 }, type: 'regular', status: 'full' },
    { id: 't3', name: 'T-3', capacity: 10, assigned: 8, guests: ['College Friends'], position: { x: 46, y: 50 }, type: 'regular', status: 'partial' },
    { id: 't4', name: 'T-4', capacity: 10, assigned: 6, guests: ['Work Colleagues'], position: { x: 64, y: 50 }, type: 'regular', status: 'partial' },
    { id: 't5', name: 'T-5', capacity: 10, assigned: 2, guests: [], position: { x: 82, y: 50 }, type: 'regular', status: 'partial' },
    { id: 't6', name: 'T-6', capacity: 10, assigned: 10, guests: ['Extended Family'], position: { x: 10, y: 70 }, type: 'regular', status: 'full' },
    { id: 't7', name: 'T-7', capacity: 10, assigned: 10, guests: ['Extended Family'], position: { x: 28, y: 70 }, type: 'regular', status: 'full' },
    { id: 't8', name: 'T-8', capacity: 10, assigned: 10, guests: ['Friends Group'], position: { x: 46, y: 70 }, type: 'regular', status: 'full' },
  ]

  const sampleConflicts: SeatingConflict[] = [
    {
      id: '1',
      description: "Priya's divorced parents both assigned to VIP-1",
      suggestion: "Move father to VIP-2",
      severity: 'high',
    },
    {
      id: '2',
      description: "Too many children at Table 12 (8 kids)",
      suggestion: "Distribute across Tables 11, 12, 13",
      severity: 'medium',
    },
  ]

  const displayTables = tables.length > 0 ? tables : sampleTables
  const displayConflicts = conflicts.length > 0 ? conflicts : sampleConflicts

  const getTableColor = (table: TableData) => {
    if (table.type === 'vip') return 'bg-amber-100 border-amber-400 text-amber-800'
    if (table.type === 'main') return 'bg-rose-100 border-rose-400 text-rose-800'
    if (table.status === 'full') return 'bg-green-100 border-green-400 text-green-800'
    if (table.status === 'partial') return 'bg-blue-100 border-blue-400 text-blue-800'
    return 'bg-gray-100 border-gray-300 text-gray-600'
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Table2 className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Seating Arrangement</h2>
              <p className="text-sm text-gray-500">Reception - {totalGuests} guests</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-lg">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-lg" size="sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Auto-Arrange
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-3 rounded-xl bg-gray-50">
            <p className="text-2xl font-bold text-gray-900">{displayTables.length}</p>
            <p className="text-xs text-gray-500">Tables</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-green-50">
            <p className="text-2xl font-bold text-green-600">{assignedGuests}</p>
            <p className="text-xs text-gray-500">Assigned</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-amber-50">
            <p className="text-2xl font-bold text-amber-600">{unassignedGuests}</p>
            <p className="text-xs text-gray-500">Unassigned</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-red-50">
            <p className="text-2xl font-bold text-red-600">{displayConflicts.length}</p>
            <p className="text-xs text-gray-500">Conflicts</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex-1 relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search guests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'visual' ? 'default' : 'outline'}
              size="sm"
              className="rounded-lg"
              onClick={() => setViewMode('visual')}
            >
              Visual
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              className="rounded-lg"
              onClick={() => setViewMode('list')}
            >
              List
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {viewMode === 'visual' ? (
          <div className="relative bg-gray-50 rounded-xl p-6 min-h-[400px]">
            {/* Stage */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-8 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg text-sm font-medium shadow-lg">
              STAGE
            </div>

            {/* Tables */}
            {displayTables.map((table) => (
              <motion.div
                key={table.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedTable(selectedTable === table.id ? null : table.id)}
                className={cn(
                  "absolute w-16 h-16 rounded-xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all",
                  getTableColor(table),
                  selectedTable === table.id && "ring-2 ring-indigo-500 ring-offset-2"
                )}
                style={{
                  left: `${table.position.x}%`,
                  top: `${table.position.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <span className="text-xs font-bold">{table.name}</span>
                <span className="text-[10px]">{table.assigned}/{table.capacity}</span>
                {table.status === 'partial' && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full" />
                )}
              </motion.div>
            ))}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 flex items-center gap-4 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-amber-100 border border-amber-400" />
                <span>VIP</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-rose-100 border border-rose-400" />
                <span>Main</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-green-100 border border-green-400" />
                <span>Full</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-blue-100 border border-blue-400" />
                <span>Partial</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {displayTables.map((table) => (
              <div
                key={table.id}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold",
                    getTableColor(table)
                  )}>
                    {table.name}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{table.guests.join(', ') || 'Empty'}</p>
                    <p className="text-xs text-gray-500">{table.assigned} of {table.capacity} seats</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Move className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI Suggestions */}
      {displayConflicts.length > 0 && (
        <div className="p-6 border-t border-gray-100 bg-gradient-to-r from-purple-50 to-violet-50">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-900">AI Suggestions</h3>
          </div>
          <div className="space-y-3">
            {displayConflicts.map((conflict) => (
              <div
                key={conflict.id}
                className={cn(
                  "p-3 rounded-lg border-l-4 bg-white",
                  conflict.severity === 'high' && "border-l-red-500",
                  conflict.severity === 'medium' && "border-l-amber-500",
                  conflict.severity === 'low' && "border-l-blue-500"
                )}
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className={cn(
                    "w-4 h-4 mt-0.5",
                    conflict.severity === 'high' && "text-red-500",
                    conflict.severity === 'medium' && "text-amber-500",
                    conflict.severity === 'low' && "text-blue-500"
                  )} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{conflict.description}</p>
                    <p className="text-xs text-gray-600 mt-1">→ {conflict.suggestion}</p>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs rounded-lg">
                    Apply
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

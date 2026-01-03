'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from './auth-context'
import type { Wedding, WeddingMember } from '@/types/database'

interface WeddingWithRole extends Wedding {
  role: WeddingMember['role']
}

interface WeddingStats {
  totalGuests: number
  confirmedGuests: number
  pendingRsvps: number
  totalBudget: number
  spentBudget: number
  pendingTasks: number
  completedTasks: number
  eventCount: number
  daysUntilWedding: number | null
}

interface WeddingContextType {
  weddings: WeddingWithRole[]
  currentWedding: WeddingWithRole | null
  weddingStats: WeddingStats | null
  isLoading: boolean
  selectWedding: (weddingId: string) => void
  createWedding: (data: CreateWeddingData) => Promise<{ wedding: Wedding | null; error: Error | null }>
  updateWedding: (data: Partial<Wedding>) => Promise<{ error: Error | null }>
  refreshWeddings: () => Promise<void>
  refreshStats: () => Promise<void>
}

interface CreateWeddingData {
  brideName: string
  groomName: string
  weddingDate?: string
  primaryCity?: string
  estimatedGuests?: number
  totalBudget?: number
  destinationType?: 'local' | 'destination' | 'international'
}

const WeddingContext = createContext<WeddingContextType | undefined>(undefined)

export function WeddingProvider({ children }: { children: React.ReactNode }) {
  const { user, profile } = useAuth()
  const [weddings, setWeddings] = useState<WeddingWithRole[]>([])
  const [currentWedding, setCurrentWedding] = useState<WeddingWithRole | null>(null)
  const [weddingStats, setWeddingStats] = useState<WeddingStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch all weddings for the user
  const fetchWeddings = useCallback(async () => {
    if (!user) {
      setWeddings([])
      setCurrentWedding(null)
      setIsLoading(false)
      return
    }

    try {
      // Get weddings where user is a member
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: memberData, error: memberError } = await (supabase as any)
        .from('wedding_members')
        .select(`
          role,
          wedding:weddings(*)
        `)
        .eq('user_id', user.id)
        .eq('invitation_status', 'accepted')

      if (memberError) throw memberError

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const weddingsWithRoles: WeddingWithRole[] = (memberData || [] as any[])
        .filter((m: { wedding: unknown }) => m.wedding)
        .map((m: { wedding: unknown; role: WeddingMember['role'] }) => ({
          ...(m.wedding as Wedding),
          role: m.role,
        }))

      setWeddings(weddingsWithRoles)

      // Set current wedding (from localStorage or first wedding)
      const storedWeddingId = localStorage.getItem('currentWeddingId')
      const foundWedding = weddingsWithRoles.find((w) => w.id === storedWeddingId)

      if (foundWedding) {
        setCurrentWedding(foundWedding)
      } else if (weddingsWithRoles.length > 0) {
        setCurrentWedding(weddingsWithRoles[0])
        localStorage.setItem('currentWeddingId', weddingsWithRoles[0].id)
      }
    } catch (error) {
      console.error('Error fetching weddings:', error)
    } finally {
      setIsLoading(false)
    }
  }, [user])

  // Fetch stats for current wedding
  const fetchStats = useCallback(async () => {
    if (!currentWedding) {
      setWeddingStats(null)
      return
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sb = supabase as any

      // Fetch guests
      const { data: guests } = await sb
        .from('guests')
        .select('status')
        .eq('wedding_id', currentWedding.id)

      // Fetch budget items
      const { data: budgetItems } = await sb
        .from('budget_items')
        .select('estimated_cost, actual_cost')
        .eq('wedding_id', currentWedding.id)

      // Fetch tasks
      const { data: tasks } = await sb
        .from('tasks')
        .select('status')
        .eq('wedding_id', currentWedding.id)

      // Fetch events
      const { data: events } = await sb
        .from('wedding_events')
        .select('id')
        .eq('wedding_id', currentWedding.id)

      // Calculate stats
      const guestsArr = guests as { status: string }[] | null
      const budgetArr = budgetItems as { estimated_cost: number; actual_cost: number | null }[] | null
      const tasksArr = tasks as { status: string }[] | null
      const eventsArr = events as { id: string }[] | null

      const totalGuests = guestsArr?.length || 0
      const confirmedGuests = guestsArr?.filter((g) => g.status === 'confirmed').length || 0
      const pendingRsvps = guestsArr?.filter((g) => g.status === 'pending' || g.status === 'invited').length || 0

      const totalBudget = budgetArr?.reduce((sum, item) => sum + (item.estimated_cost || 0), 0) || 0
      const spentBudget = budgetArr?.reduce((sum, item) => sum + (item.actual_cost || 0), 0) || 0

      const pendingTasks = tasksArr?.filter((t) => t.status === 'pending' || t.status === 'in_progress').length || 0
      const completedTasks = tasksArr?.filter((t) => t.status === 'completed').length || 0

      const eventCount = eventsArr?.length || 0

      // Calculate days until wedding
      let daysUntilWedding: number | null = null
      if (currentWedding.wedding_date) {
        const weddingDate = new Date(currentWedding.wedding_date)
        const today = new Date()
        const diffTime = weddingDate.getTime() - today.getTime()
        daysUntilWedding = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      }

      setWeddingStats({
        totalGuests,
        confirmedGuests,
        pendingRsvps,
        totalBudget,
        spentBudget,
        pendingTasks,
        completedTasks,
        eventCount,
        daysUntilWedding,
      })
    } catch (error) {
      console.error('Error fetching wedding stats:', error)
    }
  }, [currentWedding])

  // Initialize
  useEffect(() => {
    fetchWeddings()
  }, [fetchWeddings])

  // Fetch stats when wedding changes
  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  // Select a wedding
  const selectWedding = (weddingId: string) => {
    const wedding = weddings.find((w) => w.id === weddingId)
    if (wedding) {
      setCurrentWedding(wedding)
      localStorage.setItem('currentWeddingId', weddingId)
    }
  }

  // Create a new wedding
  const createWedding = async (data: CreateWeddingData) => {
    if (!user) {
      return { wedding: null, error: new Error('Not authenticated') }
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sb = supabase as any

      // Generate website slug
      const websiteSlug = `${data.brideName.toLowerCase()}-${data.groomName.toLowerCase()}-${Date.now()}`
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')

      // Create the wedding
      const { data: wedding, error: weddingError } = await sb
        .from('weddings')
        .insert({
          bride_name: data.brideName,
          groom_name: data.groomName,
          wedding_date: data.weddingDate || null,
          primary_city: data.primaryCity || null,
          estimated_guests: data.estimatedGuests || null,
          total_budget: data.totalBudget || null,
          destination_type: data.destinationType || 'destination',
          website_slug: websiteSlug,
          created_by: user.id,
          planner_id: profile?.role === 'planner' ? user.id : null,
        })
        .select()
        .single()

      if (weddingError) throw weddingError

      // Add user as owner
      const { error: memberError } = await sb
        .from('wedding_members')
        .insert({
          wedding_id: wedding.id,
          user_id: user.id,
          role: 'owner',
          invitation_status: 'accepted',
        })

      if (memberError) throw memberError

      // Refresh weddings list
      await fetchWeddings()

      // Select the new wedding
      selectWedding(wedding.id)

      return { wedding, error: null }
    } catch (error) {
      console.error('Error creating wedding:', error)
      return { wedding: null, error: error as Error }
    }
  }

  // Update current wedding
  const updateWedding = async (data: Partial<Wedding>) => {
    if (!currentWedding) {
      return { error: new Error('No wedding selected') }
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from('weddings')
        .update(data)
        .eq('id', currentWedding.id)

      if (error) throw error

      await fetchWeddings()
      return { error: null }
    } catch (error) {
      return { error: error as Error }
    }
  }

  const value: WeddingContextType = {
    weddings,
    currentWedding,
    weddingStats,
    isLoading,
    selectWedding,
    createWedding,
    updateWedding,
    refreshWeddings: fetchWeddings,
    refreshStats: fetchStats,
  }

  return <WeddingContext.Provider value={value}>{children}</WeddingContext.Provider>
}

export function useWedding() {
  const context = useContext(WeddingContext)
  if (context === undefined) {
    throw new Error('useWedding must be used within a WeddingProvider')
  }
  return context
}

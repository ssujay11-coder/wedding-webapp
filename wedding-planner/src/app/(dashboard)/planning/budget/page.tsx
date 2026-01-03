'use client'

import { useEffect, useState, useCallback } from 'react'
import { useWedding } from '@/contexts/wedding-context'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { BudgetItem } from '@/types/database'
import {
  Wallet,
  Plus,
  TrendingUp,
  TrendingDown,
  PieChart,
  Edit,
  Trash2,
  Loader2,
  X,
  Save,
  IndianRupee,
  Check,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const budgetCategories = [
  { id: 'venue-catering', name: 'Venue & Catering', icon: '🏰', defaultPct: 40 },
  { id: 'photography', name: 'Photography & Video', icon: '📸', defaultPct: 12 },
  { id: 'decoration', name: 'Decoration & Flowers', icon: '🌸', defaultPct: 10 },
  { id: 'entertainment', name: 'Entertainment & Music', icon: '🎵', defaultPct: 5 },
  { id: 'attire', name: 'Attire & Jewelry', icon: '👗', defaultPct: 8 },
  { id: 'makeup', name: 'Makeup & Hair', icon: '💄', defaultPct: 3 },
  { id: 'invitations', name: 'Invitations', icon: '💌', defaultPct: 2 },
  { id: 'transportation', name: 'Transportation', icon: '🚗', defaultPct: 3 },
  { id: 'gifts', name: 'Gifts & Favors', icon: '🎁', defaultPct: 3 },
  { id: 'accommodation', name: 'Accommodation', icon: '🏨', defaultPct: 8 },
  { id: 'miscellaneous', name: 'Miscellaneous', icon: '📋', defaultPct: 6 },
]

export default function BudgetPage() {
  const { currentWedding, updateWedding, refreshStats } = useWedding()

  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<BudgetItem | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Total budget editing
  const [isEditingBudget, setIsEditingBudget] = useState(false)
  const [totalBudgetInput, setTotalBudgetInput] = useState('')

  // Form state
  const [itemName, setItemName] = useState('')
  const [itemCategory, setItemCategory] = useState('')
  const [estimatedCost, setEstimatedCost] = useState('')
  const [actualCost, setActualCost] = useState('')
  const [amountPaid, setAmountPaid] = useState('')
  const [notes, setNotes] = useState('')

  const fetchBudgetItems = useCallback(async () => {
    if (!currentWedding) return

    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('budget_items')
        .select('*')
        .eq('wedding_id', currentWedding.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setBudgetItems(data || [])
    } catch (error) {
      console.error('Error fetching budget items:', error)
    } finally {
      setIsLoading(false)
    }
  }, [currentWedding, supabase])

  useEffect(() => {
    fetchBudgetItems()
  }, [fetchBudgetItems])

  // Calculate totals
  const totalBudget = currentWedding?.total_budget || 0
  const totalEstimated = budgetItems.reduce((sum, item) => sum + (item.estimated_cost || 0), 0)
  const totalActual = budgetItems.reduce((sum, item) => sum + (item.actual_cost || 0), 0)
  const totalPaid = budgetItems.reduce((sum, item) => sum + (item.amount_paid || 0), 0)
  const remaining = totalBudget - totalActual
  const budgetUtilization = totalBudget > 0 ? (totalActual / totalBudget) * 100 : 0

  // Group by category
  const itemsByCategory = budgetCategories.map((cat) => ({
    ...cat,
    items: budgetItems.filter((item) => item.category_id === cat.id),
    total: budgetItems
      .filter((item) => item.category_id === cat.id)
      .reduce((sum, item) => sum + (item.actual_cost || item.estimated_cost || 0), 0),
  }))

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const resetForm = () => {
    setItemName('')
    setItemCategory('')
    setEstimatedCost('')
    setActualCost('')
    setAmountPaid('')
    setNotes('')
    setEditingItem(null)
  }

  const openModal = (item?: BudgetItem) => {
    if (item) {
      setEditingItem(item)
      setItemName(item.name)
      setItemCategory(item.category_id || '')
      setEstimatedCost(item.estimated_cost?.toString() || '')
      setActualCost(item.actual_cost?.toString() || '')
      setAmountPaid(item.amount_paid?.toString() || '')
      setNotes(item.notes || '')
    } else {
      resetForm()
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    resetForm()
  }

  const handleSaveBudget = async () => {
    const newBudget = parseFloat(totalBudgetInput)
    if (isNaN(newBudget)) return

    await updateWedding({ total_budget: newBudget })
    setIsEditingBudget(false)
  }

  const handleSaveItem = async () => {
    if (!currentWedding || !itemName || !estimatedCost) return

    setIsSaving(true)
    try {
      const paymentStatus: 'pending' | 'partial' | 'paid' =
        amountPaid && parseFloat(amountPaid) >= parseFloat(actualCost || estimatedCost)
          ? 'paid'
          : amountPaid && parseFloat(amountPaid) > 0
          ? 'partial'
          : 'pending'

      if (editingItem) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error } = await (supabase as any)
          .from('budget_items')
          .update({
            name: itemName,
            category_id: itemCategory || null,
            estimated_cost: parseFloat(estimatedCost),
            actual_cost: actualCost ? parseFloat(actualCost) : null,
            amount_paid: amountPaid ? parseFloat(amountPaid) : 0,
            notes: notes || null,
            payment_status: paymentStatus,
          })
          .eq('id', editingItem.id)
        if (error) throw error
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error } = await (supabase as any)
          .from('budget_items')
          .insert({
            wedding_id: currentWedding.id,
            name: itemName,
            category_id: itemCategory || null,
            estimated_cost: parseFloat(estimatedCost),
            actual_cost: actualCost ? parseFloat(actualCost) : null,
            amount_paid: amountPaid ? parseFloat(amountPaid) : 0,
            notes: notes || null,
            payment_status: paymentStatus,
          })
        if (error) throw error
      }

      await fetchBudgetItems()
      await refreshStats()
      closeModal()
    } catch (error) {
      console.error('Error saving budget item:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (itemId: string) => {
    if (!confirm('Delete this budget item?')) return

    try {
      const { error } = await supabase
        .from('budget_items')
        .delete()
        .eq('id', itemId)

      if (error) throw error
      await fetchBudgetItems()
      await refreshStats()
    } catch (error) {
      console.error('Error deleting budget item:', error)
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
          <h1 className="text-2xl font-serif font-bold text-gray-900">Budget</h1>
          <p className="text-gray-500 mt-1">Track your wedding expenses</p>
        </div>
        <Button
          onClick={() => openModal()}
          className="bg-rose-600 hover:bg-rose-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Budget */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Total Budget</p>
            <button
              onClick={() => {
                setTotalBudgetInput(totalBudget.toString())
                setIsEditingBudget(true)
              }}
              className="text-rose-600 hover:text-rose-700"
            >
              <Edit className="h-4 w-4" />
            </button>
          </div>
          {isEditingBudget ? (
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={totalBudgetInput}
                onChange={(e) => setTotalBudgetInput(e.target.value)}
                className="h-8"
              />
              <Button size="sm" onClick={handleSaveBudget}>
                <Check className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalBudget)}</p>
          )}
        </div>

        {/* Spent */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <p className="text-sm text-gray-500 mb-2">Total Spent</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalActual)}</p>
          <p className="text-sm text-gray-400 mt-1">{budgetUtilization.toFixed(1)}% of budget</p>
        </div>

        {/* Remaining */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <p className="text-sm text-gray-500 mb-2">Remaining</p>
          <p className={cn(
            'text-2xl font-bold',
            remaining >= 0 ? 'text-green-600' : 'text-red-600'
          )}>
            {formatCurrency(remaining)}
          </p>
          <div className="flex items-center gap-1 mt-1">
            {remaining >= 0 ? (
              <TrendingDown className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingUp className="h-4 w-4 text-red-500" />
            )}
            <span className="text-sm text-gray-400">
              {remaining >= 0 ? 'Under budget' : 'Over budget'}
            </span>
          </div>
        </div>

        {/* Paid */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <p className="text-sm text-gray-500 mb-2">Amount Paid</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalPaid)}</p>
          <p className="text-sm text-gray-400 mt-1">
            {formatCurrency(totalActual - totalPaid)} pending
          </p>
        </div>
      </div>

      {/* Budget Progress */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Budget Progress</h2>
        <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full transition-all duration-500',
              budgetUtilization > 100 ? 'bg-red-500' : budgetUtilization > 80 ? 'bg-amber-500' : 'bg-green-500'
            )}
            style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Category Breakdown */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Expenses by Category</h2>
          {itemsByCategory.map((category) => (
            <div key={category.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="p-4 flex items-center justify-between bg-gray-50">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <h3 className="font-medium text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.items.length} items</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{formatCurrency(category.total)}</p>
                  {totalBudget > 0 && (
                    <p className="text-sm text-gray-500">
                      {((category.total / totalBudget) * 100).toFixed(1)}% of budget
                    </p>
                  )}
                </div>
              </div>

              {category.items.length > 0 && (
                <div className="divide-y divide-gray-100">
                  {category.items.map((item) => (
                    <div key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm">
                          <span className="text-gray-500">
                            Est: {formatCurrency(item.estimated_cost)}
                          </span>
                          {item.actual_cost && (
                            <span className="text-gray-700">
                              Actual: {formatCurrency(item.actual_cost)}
                            </span>
                          )}
                          <span className={cn(
                            'px-2 py-0.5 rounded-full text-xs',
                            item.payment_status === 'paid' ? 'bg-green-100 text-green-700' :
                            item.payment_status === 'partial' ? 'bg-amber-100 text-amber-700' :
                            'bg-gray-100 text-gray-600'
                          )}>
                            {item.payment_status === 'paid' ? 'Paid' :
                             item.payment_status === 'partial' ? 'Partial' : 'Pending'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openModal(item)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {category.items.length === 0 && (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No expenses in this category yet
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={closeModal} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg m-4">
            <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingItem ? 'Edit Expense' : 'Add Expense'}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="itemName">Expense Name *</Label>
                <Input
                  id="itemName"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="e.g., Photographer Booking"
                />
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <select
                  value={itemCategory}
                  onChange={(e) => setItemCategory(e.target.value)}
                  className="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm"
                >
                  <option value="">Select category</option>
                  {budgetCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="estimatedCost">Estimated Cost *</Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="estimatedCost"
                      type="number"
                      value={estimatedCost}
                      onChange={(e) => setEstimatedCost(e.target.value)}
                      className="pl-8"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="actualCost">Actual Cost</Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="actualCost"
                      type="number"
                      value={actualCost}
                      onChange={(e) => setActualCost(e.target.value)}
                      className="pl-8"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amountPaid">Amount Paid</Label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="amountPaid"
                    type="number"
                    value={amountPaid}
                    onChange={(e) => setAmountPaid(e.target.value)}
                    className="pl-8"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional notes..."
                  className="w-full h-20 rounded-lg border border-gray-200 px-3 py-2 text-sm resize-none"
                />
              </div>
            </div>

            <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-end gap-3">
              <Button variant="outline" onClick={closeModal}>Cancel</Button>
              <Button
                onClick={handleSaveItem}
                disabled={isSaving || !itemName || !estimatedCost}
                className="bg-rose-600 hover:bg-rose-700 text-white"
              >
                {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                {editingItem ? 'Update' : 'Add'} Expense
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

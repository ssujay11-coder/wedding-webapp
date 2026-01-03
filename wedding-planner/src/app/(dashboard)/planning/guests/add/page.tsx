'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useWedding } from '@/contexts/wedding-context'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Users,
  Utensils,
  Bed,
  Car,
  Plus,
  Loader2,
  Save,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const sides = [
  { id: 'bride', label: "Bride's Side" },
  { id: 'groom', label: "Groom's Side" },
  { id: 'mutual', label: 'Mutual' },
]

const categories = [
  { id: 'close_family', label: 'Close Family' },
  { id: 'family', label: 'Family' },
  { id: 'friends', label: 'Friends' },
  { id: 'colleagues', label: 'Colleagues' },
  { id: 'vip', label: 'VIP' },
  { id: 'other', label: 'Other' },
]

const dietaryOptions = [
  'Vegetarian',
  'Vegan',
  'Jain',
  'Gluten-Free',
  'Nut Allergy',
  'Dairy-Free',
  'Halal',
  'No Restrictions',
]

export default function AddGuestPage() {
  const router = useRouter()
  const { currentWedding, refreshStats } = useWedding()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [side, setSide] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [relationship, setRelationship] = useState('')

  // Plus one
  const [hasPlusOne, setHasPlusOne] = useState(false)
  const [plusOneName, setPlusOneName] = useState('')

  // Dietary
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([])
  const [dietaryNotes, setDietaryNotes] = useState('')

  // Accommodation
  const [needsAccommodation, setNeedsAccommodation] = useState(false)
  const [accommodationNights, setAccommodationNights] = useState('')
  const [accommodationPreference, setAccommodationPreference] = useState('')

  // Transportation
  const [needsTransportation, setNeedsTransportation] = useState(false)
  const [arrivalDetails, setArrivalDetails] = useState('')

  // Notes
  const [notes, setNotes] = useState('')

  const handleDietaryToggle = (option: string) => {
    setDietaryRestrictions((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    )
  }

  const handleSubmit = async (e: React.FormEvent, addAnother: boolean = false) => {
    e.preventDefault()

    if (!currentWedding) {
      setError('No wedding selected')
      return
    }

    if (!firstName.trim()) {
      setError('First name is required')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: insertError } = await (supabase as any).from('guests').insert({
        wedding_id: currentWedding.id,
        first_name: firstName.trim(),
        last_name: lastName.trim() || null,
        email: email.trim() || null,
        phone: phone.trim() || null,
        side: side || null,
        category: category || null,
        relationship: relationship.trim() || null,
        has_plus_one: hasPlusOne,
        plus_one_name: hasPlusOne ? plusOneName.trim() || null : null,
        dietary_restrictions: dietaryRestrictions.length > 0 ? dietaryRestrictions : null,
        dietary_notes: dietaryNotes.trim() || null,
        needs_accommodation: needsAccommodation,
        accommodation_nights: needsAccommodation && accommodationNights ? parseInt(accommodationNights) : null,
        accommodation_preference: needsAccommodation ? accommodationPreference.trim() || null : null,
        needs_transportation: needsTransportation,
        arrival_details: needsTransportation ? arrivalDetails.trim() || null : null,
        notes: notes.trim() || null,
        status: 'pending',
      })

      if (insertError) throw insertError

      await refreshStats()

      if (addAnother) {
        // Reset form for adding another guest
        setFirstName('')
        setLastName('')
        setEmail('')
        setPhone('')
        setRelationship('')
        setHasPlusOne(false)
        setPlusOneName('')
        setDietaryRestrictions([])
        setDietaryNotes('')
        setNeedsAccommodation(false)
        setAccommodationNights('')
        setAccommodationPreference('')
        setNeedsTransportation(false)
        setArrivalDetails('')
        setNotes('')
        // Keep side and category for convenience
      } else {
        router.push('/planning/guests')
      }
    } catch (err) {
      console.error('Error adding guest:', err)
      setError('Failed to add guest. Please try again.')
    } finally {
      setIsLoading(false)
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
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/planning/guests"
          className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Guest List
        </Link>
        <h1 className="text-2xl font-serif font-bold text-gray-900">Add Guest</h1>
        <p className="text-gray-500 mt-1">
          Add a new guest to {currentWedding.bride_name} & {currentWedding.groom_name}&apos;s wedding
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User className="h-5 w-5 text-gray-400" />
            Basic Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                <Mail className="h-4 w-4 inline mr-1" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="guest@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">
                <Phone className="h-4 w-4 inline mr-1" />
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
              />
            </div>
          </div>
        </div>

        {/* Classification */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-gray-400" />
            Classification
          </h2>

          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">Side</Label>
              <div className="flex flex-wrap gap-2">
                {sides.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSide(s.id)}
                    className={cn(
                      'px-4 py-2 rounded-lg border text-sm font-medium transition-all',
                      side === s.id
                        ? 'border-rose-500 bg-rose-50 text-rose-700'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="mb-2 block">Category</Label>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id)}
                    className={cn(
                      'px-4 py-2 rounded-lg border text-sm font-medium transition-all',
                      category === c.id
                        ? 'border-rose-500 bg-rose-50 text-rose-700'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="relationship">Relationship</Label>
              <Input
                id="relationship"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                placeholder="e.g., Cousin, College Friend, Work Colleague"
              />
            </div>
          </div>
        </div>

        {/* Plus One */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Plus className="h-5 w-5 text-gray-400" />
              Plus One
            </h2>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hasPlusOne}
                onChange={(e) => setHasPlusOne(e.target.checked)}
                className="rounded border-gray-300 text-rose-600"
              />
              <span className="text-sm text-gray-600">Has plus one</span>
            </label>
          </div>

          {hasPlusOne && (
            <div className="space-y-2">
              <Label htmlFor="plusOneName">Plus One Name</Label>
              <Input
                id="plusOneName"
                value={plusOneName}
                onChange={(e) => setPlusOneName(e.target.value)}
                placeholder="Enter plus one's name (if known)"
              />
            </div>
          )}
        </div>

        {/* Dietary */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Utensils className="h-5 w-5 text-gray-400" />
            Dietary Requirements
          </h2>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {dietaryOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleDietaryToggle(option)}
                  className={cn(
                    'px-3 py-1.5 rounded-full border text-sm transition-all',
                    dietaryRestrictions.includes(option)
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dietaryNotes">Additional Notes</Label>
              <Input
                id="dietaryNotes"
                value={dietaryNotes}
                onChange={(e) => setDietaryNotes(e.target.value)}
                placeholder="Any specific dietary requirements or allergies"
              />
            </div>
          </div>
        </div>

        {/* Accommodation */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Bed className="h-5 w-5 text-gray-400" />
              Accommodation
            </h2>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={needsAccommodation}
                onChange={(e) => setNeedsAccommodation(e.target.checked)}
                className="rounded border-gray-300 text-rose-600"
              />
              <span className="text-sm text-gray-600">Needs accommodation</span>
            </label>
          </div>

          {needsAccommodation && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="accommodationNights">Number of Nights</Label>
                <Input
                  id="accommodationNights"
                  type="number"
                  min="1"
                  value={accommodationNights}
                  onChange={(e) => setAccommodationNights(e.target.value)}
                  placeholder="e.g., 3"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accommodationPreference">Room Preference</Label>
                <Input
                  id="accommodationPreference"
                  value={accommodationPreference}
                  onChange={(e) => setAccommodationPreference(e.target.value)}
                  placeholder="e.g., Deluxe, Suite"
                />
              </div>
            </div>
          )}
        </div>

        {/* Transportation */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Car className="h-5 w-5 text-gray-400" />
              Transportation
            </h2>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={needsTransportation}
                onChange={(e) => setNeedsTransportation(e.target.checked)}
                className="rounded border-gray-300 text-rose-600"
              />
              <span className="text-sm text-gray-600">Needs transportation</span>
            </label>
          </div>

          {needsTransportation && (
            <div className="space-y-2">
              <Label htmlFor="arrivalDetails">Arrival Details</Label>
              <Input
                id="arrivalDetails"
                value={arrivalDetails}
                onChange={(e) => setArrivalDetails(e.target.value)}
                placeholder="e.g., Flight AI-505 arriving at 2pm on Dec 15"
              />
            </div>
          )}
        </div>

        {/* Notes */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes</h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any additional notes about this guest..."
            className="w-full h-24 rounded-lg border border-gray-200 px-3 py-2 text-sm resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-4 pt-4">
          <Link href="/planning/guests">
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={(e) => handleSubmit(e, true)}
              disabled={isLoading}
            >
              <Plus className="h-4 w-4 mr-2" />
              Save & Add Another
            </Button>
            <Button
              type="submit"
              className="bg-rose-600 hover:bg-rose-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Guest
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

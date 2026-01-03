'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useWedding } from '@/contexts/wedding-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Heart,
  Calendar,
  MapPin,
  Users,
  Wallet,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Check,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const destinations = [
  { id: 'udaipur', name: 'Udaipur', emoji: '🏰' },
  { id: 'jaipur', name: 'Jaipur', emoji: '🌸' },
  { id: 'goa', name: 'Goa', emoji: '🏖️' },
  { id: 'kerala', name: 'Kerala', emoji: '🌴' },
  { id: 'mumbai', name: 'Mumbai', emoji: '🌆' },
  { id: 'delhi', name: 'Delhi NCR', emoji: '🏛️' },
  { id: 'dubai', name: 'Dubai', emoji: '✨' },
  { id: 'other', name: 'Other', emoji: '📍' },
]

const budgetRanges = [
  { id: 'budget', label: '₹10-25 Lakhs', value: 2500000, description: 'Intimate & elegant' },
  { id: 'mid', label: '₹25-50 Lakhs', value: 5000000, description: 'Classic celebration' },
  { id: 'premium', label: '₹50L-1 Cr', value: 10000000, description: 'Grand affair' },
  { id: 'luxury', label: '₹1 Cr+', value: 15000000, description: 'Luxury destination' },
]

const guestRanges = [
  { id: 'intimate', label: '50-100', value: 100, description: 'Intimate gathering' },
  { id: 'medium', label: '100-300', value: 300, description: 'Medium celebration' },
  { id: 'large', label: '300-500', value: 500, description: 'Grand wedding' },
  { id: 'mega', label: '500+', value: 750, description: 'Royal celebration' },
]

export default function NewWeddingPage() {
  const router = useRouter()
  const { createWedding } = useWedding()

  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [brideName, setBrideName] = useState('')
  const [groomName, setGroomName] = useState('')
  const [weddingDate, setWeddingDate] = useState('')
  const [destination, setDestination] = useState('')
  const [customDestination, setCustomDestination] = useState('')
  const [guestCount, setGuestCount] = useState('')
  const [budget, setBudget] = useState('')

  const totalSteps = 4

  const canProceed = () => {
    switch (step) {
      case 1:
        return brideName.trim() && groomName.trim()
      case 2:
        return weddingDate || true // Date is optional
      case 3:
        return destination
      case 4:
        return true // Budget and guests are optional
      default:
        return false
    }
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)

    const selectedBudget = budgetRanges.find((b) => b.id === budget)
    const selectedGuests = guestRanges.find((g) => g.id === guestCount)

    const { wedding, error: createError } = await createWedding({
      brideName,
      groomName,
      weddingDate: weddingDate || undefined,
      primaryCity: destination === 'other' ? customDestination : destinations.find(d => d.id === destination)?.name,
      estimatedGuests: selectedGuests?.value,
      totalBudget: selectedBudget?.value,
      destinationType: destination === 'dubai' ? 'international' : 'destination',
    })

    if (createError) {
      setError(createError.message)
      setIsLoading(false)
    } else if (wedding) {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart className="h-8 w-8 text-rose-500 fill-current" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">
            Create Your Wedding
          </h1>
          <p className="text-gray-500 mt-2">
            Let&apos;s set up your wedding planning dashboard
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all',
                  s < step
                    ? 'bg-rose-500 text-white'
                    : s === step
                    ? 'bg-rose-100 text-rose-600 ring-2 ring-rose-500'
                    : 'bg-gray-100 text-gray-400'
                )}
              >
                {s < step ? <Check className="h-5 w-5" /> : s}
              </div>
              {s < 4 && (
                <div
                  className={cn(
                    'w-12 h-1 mx-1',
                    s < step ? 'bg-rose-500' : 'bg-gray-200'
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Step 1: Names */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Sparkles className="h-12 w-12 text-rose-400 mx-auto mb-3" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Who&apos;s getting married?
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="brideName">Bride&apos;s Name</Label>
                  <Input
                    id="brideName"
                    placeholder="Enter bride's name"
                    value={brideName}
                    onChange={(e) => setBrideName(e.target.value)}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="groomName">Groom&apos;s Name</Label>
                  <Input
                    id="groomName"
                    placeholder="Enter groom's name"
                    value={groomName}
                    onChange={(e) => setGroomName(e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Date */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Calendar className="h-12 w-12 text-rose-400 mx-auto mb-3" />
                <h2 className="text-xl font-semibold text-gray-900">
                  When&apos;s the big day?
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Don&apos;t worry, you can always change this later
                </p>
              </div>

              <div className="max-w-xs mx-auto space-y-2">
                <Label htmlFor="weddingDate">Wedding Date</Label>
                <Input
                  id="weddingDate"
                  type="date"
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                  className="h-12"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <button
                onClick={() => setWeddingDate('')}
                className="w-full text-center text-sm text-gray-500 hover:text-gray-700"
              >
                Skip for now, I&apos;ll decide later
              </button>
            </div>
          )}

          {/* Step 3: Destination */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <MapPin className="h-12 w-12 text-rose-400 mx-auto mb-3" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Where will you celebrate?
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {destinations.map((dest) => (
                  <button
                    key={dest.id}
                    onClick={() => setDestination(dest.id)}
                    className={cn(
                      'p-4 rounded-xl border-2 text-center transition-all hover:border-rose-300',
                      destination === dest.id
                        ? 'border-rose-500 bg-rose-50'
                        : 'border-gray-200'
                    )}
                  >
                    <span className="text-2xl mb-2 block">{dest.emoji}</span>
                    <span className="text-sm font-medium text-gray-900">{dest.name}</span>
                  </button>
                ))}
              </div>

              {destination === 'other' && (
                <div className="max-w-xs mx-auto space-y-2">
                  <Label htmlFor="customDestination">City/Location</Label>
                  <Input
                    id="customDestination"
                    placeholder="Enter your destination"
                    value={customDestination}
                    onChange={(e) => setCustomDestination(e.target.value)}
                    className="h-12"
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 4: Guests & Budget */}
          {step === 4 && (
            <div className="space-y-8">
              <div className="text-center mb-6">
                <Users className="h-12 w-12 text-rose-400 mx-auto mb-3" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Let&apos;s plan the details
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  These help us personalize your experience
                </p>
              </div>

              {/* Guest Count */}
              <div>
                <Label className="text-base mb-3 block">Expected Guests</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {guestRanges.map((range) => (
                    <button
                      key={range.id}
                      onClick={() => setGuestCount(range.id)}
                      className={cn(
                        'p-4 rounded-xl border-2 text-center transition-all hover:border-rose-300',
                        guestCount === range.id
                          ? 'border-rose-500 bg-rose-50'
                          : 'border-gray-200'
                      )}
                    >
                      <span className="text-lg font-semibold text-gray-900 block">
                        {range.label}
                      </span>
                      <span className="text-xs text-gray-500">{range.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <Label className="text-base mb-3 block">
                  <Wallet className="h-4 w-4 inline mr-2" />
                  Estimated Budget
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {budgetRanges.map((range) => (
                    <button
                      key={range.id}
                      onClick={() => setBudget(range.id)}
                      className={cn(
                        'p-4 rounded-xl border-2 text-center transition-all hover:border-rose-300',
                        budget === range.id
                          ? 'border-rose-500 bg-rose-50'
                          : 'border-gray-200'
                      )}
                    >
                      <span className="text-sm font-semibold text-gray-900 block">
                        {range.label}
                      </span>
                      <span className="text-xs text-gray-500">{range.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            {step > 1 ? (
              <Button variant="outline" onClick={handleBack} className="h-12">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            ) : (
              <div />
            )}

            {step < totalSteps ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="h-12 bg-rose-600 hover:bg-rose-700 text-white"
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isLoading || !canProceed()}
                className="h-12 bg-rose-600 hover:bg-rose-700 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Heart className="h-4 w-4 mr-2" />
                    Create Wedding
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

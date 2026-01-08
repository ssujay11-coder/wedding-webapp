'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Scale,
  Star,
  Check,
  X,
  ChevronDown,
  Phone,
  Mail,
  Globe,
  Instagram,
  MapPin,
  Wallet,
  Clock,
  Award,
  Sparkles,
  Music,
  Camera,
  Flower2,
  Utensils,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface Vendor {
  id: string
  name: string
  category: string
  image?: string
  rating: number
  reviews: number
  price: number
  experience: string
  style?: string
  equipment?: string
  backup?: boolean
  travel?: string
  features?: string[]
  specializations?: string[]
}

interface VendorComparisonProps {
  category?: string
  vendors?: Vendor[]
  onSelect?: (vendor: Vendor) => void
}

export function VendorComparison({ category = 'DJ', vendors = [], onSelect }: VendorComparisonProps) {
  const [selectedVendors, setSelectedVendors] = useState<Set<string>>(new Set())

  // Sample vendors if none provided
  const sampleVendors: Vendor[] = [
    {
      id: '1',
      name: 'DJ Suketu',
      category: 'DJ',
      rating: 4.9,
      reviews: 312,
      price: 300000,
      experience: '20 years',
      style: 'Bollywood + EDM',
      equipment: 'Included',
      backup: true,
      travel: 'Included',
      features: ['Celebrity events', 'Custom mashups', 'LED setup'],
      specializations: ['Sangeet', 'Reception', 'Cocktail'],
    },
    {
      id: '2',
      name: 'DJ Aqeel',
      category: 'DJ',
      rating: 4.5,
      reviews: 245,
      price: 250000,
      experience: '18 years',
      style: 'Bollywood',
      equipment: 'Included',
      backup: false,
      travel: 'Extra ₹25K',
      features: ['Club experience', 'Sound design'],
      specializations: ['Sangeet', 'Reception'],
    },
    {
      id: '3',
      name: 'DJ NYK',
      category: 'DJ',
      rating: 4.6,
      reviews: 178,
      price: 180000,
      experience: '12 years',
      style: 'EDM + House',
      equipment: 'Extra ₹30K',
      backup: true,
      travel: 'Included',
      features: ['International style', 'Pyro effects'],
      specializations: ['After party', 'Cocktail'],
    },
  ]

  const displayVendors = vendors.length > 0 ? vendors : sampleVendors

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const toggleVendor = (vendorId: string) => {
    const newSelected = new Set(selectedVendors)
    if (newSelected.has(vendorId)) {
      newSelected.delete(vendorId)
    } else {
      newSelected.add(vendorId)
    }
    setSelectedVendors(newSelected)
  }

  const getCategoryIcon = (cat: string) => {
    const icons: Record<string, React.ComponentType<{ className?: string }>> = {
      DJ: Music,
      Photography: Camera,
      Decoration: Flower2,
      Catering: Utensils,
    }
    return icons[cat] || Sparkles
  }

  const CategoryIcon = getCategoryIcon(category)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <Scale className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Compare {category}s</h2>
              <p className="text-sm text-gray-500">{displayVendors.length} shortlisted</p>
            </div>
          </div>
          {selectedVendors.size > 0 && (
            <Button className="bg-rose-600 hover:bg-rose-700 rounded-lg">
              Book Selected ({selectedVendors.size})
            </Button>
          )}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="p-4 text-left text-sm font-semibold text-gray-500 min-w-[150px]">Criteria</th>
              {displayVendors.map((vendor) => (
                <th key={vendor.id} className="p-4 text-center min-w-[180px]">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center mb-2 overflow-hidden">
                      {vendor.image ? (
                        <Image src={vendor.image} alt={vendor.name} width={64} height={64} className="object-cover" />
                      ) : (
                        <CategoryIcon className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <p className="font-semibold text-gray-900">{vendor.name}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="text-sm font-medium">{vendor.rating}</span>
                      <span className="text-xs text-gray-400">({vendor.reviews})</span>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Price */}
            <tr className="border-b border-gray-50 hover:bg-gray-50">
              <td className="p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Wallet className="w-4 h-4 text-gray-400" />
                  Price
                </div>
              </td>
              {displayVendors.map((vendor) => (
                <td key={vendor.id} className="p-4 text-center">
                  <p className="font-bold text-lg text-gray-900">{formatCurrency(vendor.price)}</p>
                </td>
              ))}
            </tr>

            {/* Experience */}
            <tr className="border-b border-gray-50 hover:bg-gray-50">
              <td className="p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Clock className="w-4 h-4 text-gray-400" />
                  Experience
                </div>
              </td>
              {displayVendors.map((vendor) => (
                <td key={vendor.id} className="p-4 text-center">
                  <p className="text-gray-900">{vendor.experience}</p>
                </td>
              ))}
            </tr>

            {/* Style */}
            {displayVendors.some(v => v.style) && (
              <tr className="border-b border-gray-50 hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Sparkles className="w-4 h-4 text-gray-400" />
                    Style
                  </div>
                </td>
                {displayVendors.map((vendor) => (
                  <td key={vendor.id} className="p-4 text-center">
                    <p className="text-gray-900">{vendor.style || '-'}</p>
                  </td>
                ))}
              </tr>
            )}

            {/* Equipment */}
            {displayVendors.some(v => v.equipment) && (
              <tr className="border-b border-gray-50 hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Award className="w-4 h-4 text-gray-400" />
                    Equipment
                  </div>
                </td>
                {displayVendors.map((vendor) => (
                  <td key={vendor.id} className="p-4 text-center">
                    <span className={cn(
                      "inline-flex px-2 py-1 rounded-full text-xs font-medium",
                      vendor.equipment === 'Included'
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    )}>
                      {vendor.equipment || '-'}
                    </span>
                  </td>
                ))}
              </tr>
            )}

            {/* Backup */}
            <tr className="border-b border-gray-50 hover:bg-gray-50">
              <td className="p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  Backup {category}
                </div>
              </td>
              {displayVendors.map((vendor) => (
                <td key={vendor.id} className="p-4 text-center">
                  {vendor.backup ? (
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-red-500 mx-auto" />
                  )}
                </td>
              ))}
            </tr>

            {/* Travel */}
            <tr className="border-b border-gray-50 hover:bg-gray-50">
              <td className="p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  Travel
                </div>
              </td>
              {displayVendors.map((vendor) => (
                <td key={vendor.id} className="p-4 text-center">
                  <span className={cn(
                    "inline-flex px-2 py-1 rounded-full text-xs font-medium",
                    vendor.travel === 'Included'
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  )}>
                    {vendor.travel || '-'}
                  </span>
                </td>
              ))}
            </tr>

            {/* Actions */}
            <tr className="bg-gray-50">
              <td className="p-4 font-medium text-gray-700">Select</td>
              {displayVendors.map((vendor) => (
                <td key={vendor.id} className="p-4 text-center">
                  <Button
                    variant={selectedVendors.has(vendor.id) ? "default" : "outline"}
                    className={cn(
                      "rounded-lg",
                      selectedVendors.has(vendor.id) && "bg-rose-600 hover:bg-rose-700"
                    )}
                    onClick={() => toggleVendor(vendor.id)}
                  >
                    {selectedVendors.has(vendor.id) ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Selected
                      </>
                    ) : (
                      'Select'
                    )}
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* AI Recommendation */}
      <div className="p-6 border-t border-gray-100 bg-gradient-to-r from-purple-50 to-violet-50">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-1">AI Recommendation</p>
            <p className="text-sm text-gray-600">
              "{displayVendors[0]?.name} is premium but brings celebrity experience and complete package.
              {displayVendors[2]?.name} offers best value for a younger crowd with modern music style."
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

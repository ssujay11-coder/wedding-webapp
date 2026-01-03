'use client'

import { useEffect, useState, useCallback } from 'react'
import { useWedding } from '@/contexts/wedding-context'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { WeddingWebsite } from '@/types/database'
import {
  Globe,
  Palette,
  Eye,
  Save,
  ExternalLink,
  Image,
  Heart,
  Calendar,
  MapPin,
  MessageSquare,
  Camera,
  Gift,
  HelpCircle,
  Loader2,
  Check,
  Copy,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const templates = [
  { id: 'classic', name: 'Classic', description: 'Timeless elegance with serif fonts' },
  { id: 'modern', name: 'Modern', description: 'Clean lines and minimalist design' },
  { id: 'traditional', name: 'Traditional', description: 'Rich colors and ornate details' },
  { id: 'royal', name: 'Royal', description: 'Grand and luxurious styling' },
  { id: 'garden', name: 'Garden', description: 'Soft florals and natural tones' },
  { id: 'beach', name: 'Beach', description: 'Light and airy coastal vibes' },
]

const colorPalettes = [
  { id: 'rose-gold', primary: '#d4af37', secondary: '#221015', name: 'Rose Gold' },
  { id: 'blush', primary: '#e8b4b8', secondary: '#4a4a4a', name: 'Blush' },
  { id: 'sage', primary: '#9caf88', secondary: '#3d4a3c', name: 'Sage Green' },
  { id: 'navy', primary: '#1e3a5f', secondary: '#c9b037', name: 'Navy & Gold' },
  { id: 'burgundy', primary: '#722f37', secondary: '#f5e6d3', name: 'Burgundy' },
  { id: 'lavender', primary: '#967bb6', secondary: '#f5f0fa', name: 'Lavender' },
]

const sections = [
  { id: 'hero', name: 'Hero', icon: Sparkles, description: 'Cover image and countdown' },
  { id: 'couple', name: 'Our Story', icon: Heart, description: 'About the couple' },
  { id: 'events', name: 'Events', icon: Calendar, description: 'Wedding schedule' },
  { id: 'venue', name: 'Venue', icon: MapPin, description: 'Location details and maps' },
  { id: 'rsvp', name: 'RSVP', icon: MessageSquare, description: 'Guest response form' },
  { id: 'gallery', name: 'Gallery', icon: Camera, description: 'Photo collection' },
  { id: 'registry', name: 'Registry', icon: Gift, description: 'Gift registry links' },
  { id: 'faq', name: 'FAQ', icon: HelpCircle, description: 'Common questions' },
]

export default function WebsitePage() {
  const { currentWedding, updateWedding } = useWedding()

  const [website, setWebsite] = useState<WeddingWebsite | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [copied, setCopied] = useState(false)

  // Form state
  const [template, setTemplate] = useState('classic')
  const [colorPalette, setColorPalette] = useState('rose-gold')
  const [heroTitle, setHeroTitle] = useState('')
  const [heroSubtitle, setHeroSubtitle] = useState('')
  const [howWeMet, setHowWeMet] = useState('')
  const [proposalStory, setProposalStory] = useState('')
  const [travelInfo, setTravelInfo] = useState('')
  const [enabledSections, setEnabledSections] = useState<Record<string, boolean>>({
    hero: true,
    couple: true,
    events: true,
    venue: true,
    rsvp: true,
    gallery: true,
    registry: false,
    faq: true,
  })
  const [isPublished, setIsPublished] = useState(false)

  const fetchWebsite = useCallback(async () => {
    if (!currentWedding) return

    setIsLoading(true)
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .from('wedding_websites')
        .select('*')
        .eq('wedding_id', currentWedding.id)
        .single()

      if (error && error.code !== 'PGRST116') throw error

      if (data) {
        setWebsite(data as WeddingWebsite)
        setTemplate(data.template)
        setColorPalette(colorPalettes.find(p => p.primary === data.primary_color)?.id || 'rose-gold')
        setHeroTitle(data.hero_title || '')
        setHeroSubtitle(data.hero_subtitle || '')
        setHowWeMet(data.how_we_met || '')
        setProposalStory(data.proposal_story || '')
        setTravelInfo(data.travel_info || '')
        setIsPublished(data.is_published)
        if (data.sections_config) {
          setEnabledSections(data.sections_config as Record<string, boolean>)
        }
      }
    } catch (error) {
      console.error('Error fetching website:', error)
    } finally {
      setIsLoading(false)
    }
  }, [currentWedding])

  useEffect(() => {
    fetchWebsite()
  }, [fetchWebsite])

  const handleSave = async () => {
    if (!currentWedding) return

    setIsSaving(true)
    try {
      const selectedPalette = colorPalettes.find(p => p.id === colorPalette) || colorPalettes[0]

      const websiteData = {
        wedding_id: currentWedding.id,
        subdomain: currentWedding.website_slug || `${currentWedding.bride_name.toLowerCase()}-${currentWedding.groom_name.toLowerCase()}`.replace(/[^a-z0-9]/g, '-'),
        template,
        primary_color: selectedPalette.primary,
        secondary_color: selectedPalette.secondary,
        hero_title: heroTitle || `${currentWedding.bride_name} & ${currentWedding.groom_name}`,
        hero_subtitle: heroSubtitle,
        bride_full_name: currentWedding.bride_name,
        groom_full_name: currentWedding.groom_name,
        how_we_met: howWeMet,
        proposal_story: proposalStory,
        travel_info: travelInfo,
        sections_config: enabledSections,
        is_published: isPublished,
      }

      if (website) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error } = await (supabase as any)
          .from('wedding_websites')
          .update(websiteData)
          .eq('id', website.id)
        if (error) throw error
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error } = await (supabase as any)
          .from('wedding_websites')
          .insert(websiteData)
        if (error) throw error
      }

      // Update wedding to enable website
      await updateWedding({ website_enabled: true })
      await fetchWebsite()
    } catch (error) {
      console.error('Error saving website:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleToggleSection = (sectionId: string) => {
    setEnabledSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  const handleCopyUrl = () => {
    const url = `${website?.subdomain || currentWedding?.website_slug}.eliteweddings.in`
    navigator.clipboard.writeText(`https://${url}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!currentWedding) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Please select a wedding first</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
      </div>
    )
  }

  const websiteUrl = `${website?.subdomain || currentWedding.website_slug}.eliteweddings.in`

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">Wedding Website</h1>
          <p className="text-gray-500 mt-1">
            Create a beautiful website to share with your guests
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleCopyUrl}>
            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? 'Copied!' : 'Copy URL'}
          </Button>
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-rose-600 hover:bg-rose-700 text-white"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Changes
          </Button>
        </div>
      </div>

      {/* Website URL */}
      <div className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-rose-100 text-sm mb-1">Your Wedding Website</p>
            <p className="text-xl font-semibold">{websiteUrl}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={cn(
                'w-3 h-3 rounded-full',
                isPublished ? 'bg-green-400' : 'bg-amber-400'
              )} />
              <span className="text-sm">{isPublished ? 'Published' : 'Draft'}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-white text-rose-600 border-0 hover:bg-rose-50"
              onClick={() => window.open(`https://${websiteUrl}`, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Visit
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Template Selection */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Palette className="h-5 w-5 text-gray-400" />
              Design Template
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemplate(t.id)}
                  className={cn(
                    'p-4 rounded-xl border-2 text-left transition-all',
                    template === t.id
                      ? 'border-rose-500 bg-rose-50'
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                >
                  <p className="font-medium text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{t.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Color Palette */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Color Palette</h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {colorPalettes.map((palette) => (
                <button
                  key={palette.id}
                  onClick={() => setColorPalette(palette.id)}
                  className={cn(
                    'p-3 rounded-xl border-2 text-center transition-all',
                    colorPalette === palette.id
                      ? 'border-gray-900'
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                >
                  <div className="flex justify-center gap-1 mb-2">
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: palette.primary }}
                    />
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: palette.secondary }}
                    />
                  </div>
                  <p className="text-xs font-medium text-gray-700">{palette.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Hero Section */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Image className="h-5 w-5 text-gray-400" />
              Hero Section
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="heroTitle">Title</Label>
                <Input
                  id="heroTitle"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  placeholder={`${currentWedding.bride_name} & ${currentWedding.groom_name}`}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroSubtitle">Subtitle</Label>
                <Input
                  id="heroSubtitle"
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  placeholder="We're getting married!"
                />
              </div>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                <Image className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">Click to upload hero image</p>
                <p className="text-xs text-gray-400 mt-1">Recommended: 1920x1080px</p>
              </div>
            </div>
          </div>

          {/* Our Story */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Heart className="h-5 w-5 text-gray-400" />
              Our Story
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="howWeMet">How We Met</Label>
                <textarea
                  id="howWeMet"
                  value={howWeMet}
                  onChange={(e) => setHowWeMet(e.target.value)}
                  placeholder="Share how you two first met..."
                  className="w-full h-32 rounded-lg border border-gray-200 px-3 py-2 text-sm resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="proposalStory">The Proposal</Label>
                <textarea
                  id="proposalStory"
                  value={proposalStory}
                  onChange={(e) => setProposalStory(e.target.value)}
                  placeholder="Tell the story of your proposal..."
                  className="w-full h-32 rounded-lg border border-gray-200 px-3 py-2 text-sm resize-none"
                />
              </div>
            </div>
          </div>

          {/* Travel Info */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-400" />
              Travel & Accommodation
            </h2>
            <div className="space-y-2">
              <Label htmlFor="travelInfo">Travel Information</Label>
              <textarea
                id="travelInfo"
                value={travelInfo}
                onChange={(e) => setTravelInfo(e.target.value)}
                placeholder="Share travel tips, accommodation options, and local information for your guests..."
                className="w-full h-32 rounded-lg border border-gray-200 px-3 py-2 text-sm resize-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Sections Toggle */}
        <div className="space-y-6">
          {/* Publish Toggle */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">Publish Website</h3>
                <p className="text-sm text-gray-500 mt-1">Make your website visible to guests</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
              </label>
            </div>
          </div>

          {/* Sections */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Website Sections</h3>
            <div className="space-y-3">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <section.icon className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900">{section.name}</p>
                      <p className="text-xs text-gray-500">{section.description}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enabledSections[section.id] ?? true}
                      onChange={() => handleToggleSection(section.id)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-rose-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-rose-50 rounded-xl p-6">
            <h3 className="font-semibold text-rose-900 mb-2">Tips</h3>
            <ul className="space-y-2 text-sm text-rose-700">
              <li>• Add high-quality photos for the best experience</li>
              <li>• Keep your story personal and heartfelt</li>
              <li>• Include detailed travel info for destination weddings</li>
              <li>• Test your RSVP form before publishing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

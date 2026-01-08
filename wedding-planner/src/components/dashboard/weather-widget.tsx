'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSun,
  Wind,
  Droplets,
  ChevronRight,
  MapPin,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface WeatherDay {
  date: string
  day: string
  temp: number
  condition: 'sunny' | 'cloudy' | 'partly-cloudy' | 'rainy' | 'windy'
  humidity?: number
}

interface WeatherWidgetProps {
  city?: string
  weddingDate?: string
  className?: string
}

export function WeatherWidget({ city = 'Udaipur', weddingDate, className }: WeatherWidgetProps) {
  const [forecast, setForecast] = useState<WeatherDay[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching weather data
    // In production, you would call a real weather API
    const fetchWeather = async () => {
      setIsLoading(true)

      // Simulated weather data
      const mockForecast: WeatherDay[] = [
        { date: 'Feb 13', day: 'Thu', temp: 28, condition: 'sunny', humidity: 35 },
        { date: 'Feb 14', day: 'Fri', temp: 29, condition: 'sunny', humidity: 32 },
        { date: 'Feb 15', day: 'Sat', temp: 27, condition: 'partly-cloudy', humidity: 40 },
        { date: 'Feb 16', day: 'Sun', temp: 28, condition: 'sunny', humidity: 38 },
      ]

      setTimeout(() => {
        setForecast(mockForecast)
        setIsLoading(false)
      }, 500)
    }

    fetchWeather()
  }, [city, weddingDate])

  const getWeatherIcon = (condition: WeatherDay['condition']) => {
    const icons = {
      sunny: Sun,
      cloudy: Cloud,
      'partly-cloudy': CloudSun,
      rainy: CloudRain,
      windy: Wind,
    }
    return icons[condition]
  }

  const getWeatherColor = (condition: WeatherDay['condition']) => {
    const colors = {
      sunny: 'text-amber-500',
      cloudy: 'text-gray-500',
      'partly-cloudy': 'text-blue-400',
      rainy: 'text-blue-600',
      windy: 'text-cyan-500',
    }
    return colors[condition]
  }

  const isGoodWeather = forecast.every(day =>
    day.condition === 'sunny' || day.condition === 'partly-cloudy'
  )

  if (isLoading) {
    return (
      <div className={cn("bg-white rounded-2xl p-6 shadow-sm border border-gray-100", className)}>
        <div className="animate-pulse space-y-4">
          <div className="h-5 bg-gray-200 rounded w-1/2" />
          <div className="grid grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="h-10 w-10 mx-auto bg-gray-200 rounded-lg" />
                <div className="h-4 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("bg-white rounded-2xl p-6 shadow-sm border border-gray-100", className)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sun className="w-5 h-5 text-amber-500" />
          <h3 className="text-lg font-semibold text-gray-900">{city} Weather</h3>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <MapPin className="w-4 h-4" />
          <span>Wedding Week</span>
        </div>
      </div>

      {/* Forecast Grid */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {forecast.map((day, index) => {
          const Icon = getWeatherIcon(day.condition)
          return (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <p className="text-xs font-medium text-gray-500 mb-1">{day.day}</p>
              <p className="text-xs text-gray-400 mb-2">{day.date}</p>
              <Icon className={cn("w-8 h-8 mx-auto mb-1", getWeatherColor(day.condition))} />
              <p className="text-lg font-bold text-gray-900">{day.temp}°</p>
              {day.humidity && (
                <div className="flex items-center justify-center gap-1 mt-1 text-xs text-gray-400">
                  <Droplets className="w-3 h-3" />
                  <span>{day.humidity}%</span>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Weather Status */}
      <div className={cn(
        "flex items-center gap-2 p-3 rounded-xl text-sm",
        isGoodWeather ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
      )}>
        {isGoodWeather ? (
          <>
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>Great weather predicted for your wedding week!</span>
          </>
        ) : (
          <>
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>Some weather variation expected. Have a backup plan ready.</span>
          </>
        )}
      </div>
    </motion.div>
  )
}

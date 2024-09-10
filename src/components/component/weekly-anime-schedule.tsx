'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const api = "https://aniweebu-api.onrender.com"
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

interface AnimeSchedule {
  id: string
  time: string
  name: string
  jname: string
  airingTimestamp: number
  secondsUntilAiring: number
  episode: number
}

export function WeeklyAnimeSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [scheduleData, setScheduleData] = useState<AnimeSchedule[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSchedule = async (date: Date) => {
    setIsLoading(true)
    setError(null)
    try {
      const formattedDate = date.toISOString().split('T')[0]
      const resp = await fetch(`${api}/anime/schedule?date=${formattedDate}`)
      
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`)
      }

      const data = await resp.json()
      if (Array.isArray(data.scheduledAnimes) && data.scheduledAnimes.length > 0) {
        // Sort by time
        const sortedSchedule = data.scheduledAnimes.sort((a: AnimeSchedule, b: AnimeSchedule) => {
          return timeToMinutes(a.time) - timeToMinutes(b.time)
        })
        setScheduleData(sortedSchedule)
      } else {
        setScheduleData([])
      }
    } catch (error) {
      setError("Error fetching schedule. Please try again later.")
      console.error("Error fetching schedule:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSchedule(currentDate)
  }, [currentDate])

  const goToPreviousDay = () => {
    setCurrentDate(new Date(currentDate.getTime() - 24 * 60 * 60 * 1000))
  }

  const goToNextDay = () => {
    setCurrentDate(new Date(currentDate.getTime() + 24 * 60 * 60 * 1000))
  }

  const formatAiringTime = (time: string) => {
    return `${time}`
  }

  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }

  const getOrderedDays = () => {
    const todayIndex = currentDate.getDay()
    const orderedDays = [...daysOfWeek.slice(todayIndex), ...daysOfWeek.slice(0, todayIndex)]
    return orderedDays
  }

  const getDateForDay = (offset: number) => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + offset)
    return newDate
  }

  return (
    <div className="bg-gray-900 text-white p-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <button onClick={goToPreviousDay} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700" aria-label="Previous day">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex space-x-2 overflow-x-auto">
          {getOrderedDays().map((day, index) => {
            const date = getDateForDay(index)
            const isCurrentDay = date.toDateString() === currentDate.toDateString()
            return (
              <button
                key={day}
                className={`flex-shrink-0 w-24 p-2 rounded-lg ${
                  isCurrentDay ? 'bg-pink-500' : 'bg-gray-800'
                } hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-pink-500`}
                onClick={() => setCurrentDate(date)}
                aria-pressed={isCurrentDay}
              >
                <div className="font-bold">{day}</div>
                <div className="text-sm text-gray-400">
                  {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </button>
            )
          })}
        </div>
        <button onClick={goToNextDay} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700" aria-label="Next day">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      <h2 className="text-xl font-bold mb-4">
        Anime Schedule for {currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </h2>
      {isLoading ? (
        <div className="text-center" aria-live="polite">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-center" aria-live="assertive">{error}</div>
      ) : scheduleData.length === 0 ? (
        <div className="text-center" aria-live="polite">No scheduled animes found for this day.</div>
      ) : (
        <ul className="space-y-4" role="list">
          {scheduleData.map((anime, index) => (
            <li key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-gray-500" aria-label="Airing time">
                  {formatAiringTime(anime.time)}
                </span>
                <span>{anime.name}</span>
              </div>
              <span className="text-sm text-gray-500">Episode {anime.episode}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

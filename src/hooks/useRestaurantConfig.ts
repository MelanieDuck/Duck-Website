import { useState, useEffect } from 'react'
import type { RestaurantConfig } from '@/types'

interface UseRestaurantConfigResult {
  config: RestaurantConfig | null
  loading: boolean
  error: string | null
}

export function useRestaurantConfig(): UseRestaurantConfigResult {
  const [config, setConfig] = useState<RestaurantConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/restaurant-config.json')
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load config: ${res.status}`)
        return res.json()
      })
      .then((data: RestaurantConfig) => {
        setConfig(data)
        // Update page title dynamically
        document.title = `${data.name} – ${data.tagline}`
      })
      .catch((err: Error) => {
        setError(err.message)
        console.error('Restaurant config load error:', err)
      })
      .finally(() => setLoading(false))
  }, [])

  return { config, loading, error }
}

import { useState, useEffect, useCallback, useRef } from 'react'

export function useHeroSlider(total: number, intervalMs = 4500) {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
  }, [])

  const startTimer = useCallback(() => {
    stopTimer()
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total)
    }, intervalMs)
  }, [total, intervalMs, stopTimer])

  useEffect(() => {
    startTimer()
    return stopTimer
  }, [startTimer, stopTimer])

  const goTo = useCallback(
    (index: number) => {
      setCurrent(index)
      startTimer()
    },
    [startTimer],
  )

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + total) % total)
    startTimer()
  }, [total, startTimer])

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % total)
    startTimer()
  }, [total, startTimer])

  return { current, goTo, prev, next, stopTimer, startTimer }
}

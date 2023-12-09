'use client'

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'

export default function Home() {
  const [suggestions, setSuggestions] = useState<string | null>(null)
  const timer = useRef<NodeJS.Timeout | null>(null)

  const handleInputValue = useCallback((e: FormEvent<HTMLDivElement>) => {
    if (timer.current) {
      clearTimeout(timer.current)
    }

    if ((e.nativeEvent as InputEvent).data && e.currentTarget.textContent) {
      timer.current = setTimeout(() => {
        setSuggestions('suggestions')
      }, 1000)
    } else {
      setSuggestions(null)
    }
  }, [])

  const resetSuggestions = () => {
    setSuggestions(null)
  }

  useEffect(() => {
    if (suggestions) {
      addEventListener('keydown', resetSuggestions)
      addEventListener('click', resetSuggestions)
    }

    return () => {
      removeEventListener('keydown', resetSuggestions)
      removeEventListener('click', resetSuggestions)
    }
  }, [suggestions])

  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center">
      <div
        className="w-96 h-48 outline p-4"
        contentEditable
        onInput={handleInputValue}
        role="textbox"
      >
        {suggestions && <span className="text-gray-400">{suggestions}</span>}
      </div>
    </main>
  )
}

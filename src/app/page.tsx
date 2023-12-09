'use client'

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import fetchSuggestions from './openai'

export default function Home() {
  const [suggestions, setSuggestions] = useState<string | null>(null)
  const timer = useRef<NodeJS.Timeout | null>(null)

  const handleInputValue = useCallback((e: FormEvent<HTMLDivElement>) => {
    if (timer.current) {
      clearTimeout(timer.current)
    }

    if ((e.nativeEvent as InputEvent).data && e.currentTarget.textContent) {
      const text = e.currentTarget.textContent

      timer.current = setTimeout(async () => {
        try {
          const response = await fetchSuggestions(text)
          setSuggestions(response)
        } catch (error) {
          //　何もしない
        }
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
    <main className="min-h-[100dvh] flex flex-col items-center justify-center">
      <div
        contentEditable
        role="textbox"
        aria-label="プロフィールを入力"
        onInput={handleInputValue}
        className="w-96 h-48 outline p-4 mt-4"
      >
        {suggestions && <span className="text-gray-400">{suggestions}</span>}
      </div>
    </main>
  )
}

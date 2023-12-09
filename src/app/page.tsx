'use client'

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import fetchSuggestions from './openai'

export default function Home() {
  const [suggestions, setSuggestions] = useState<string | null>(null)
  const timer = useRef<NodeJS.Timeout | null>(null)

  const resetSuggestions = () => {
    setSuggestions(null)
  }

  const caretToLast = (element: HTMLElement) => {
    const sel = window.getSelection()
    const range = document.createRange()
    const textLength = element.firstChild?.textContent?.length || 0

    range.setStart(element?.firstChild as Node, textLength)
    range.collapse(true)

    if (sel) {
      sel.removeAllRanges()
      sel.addRange(range)
    }
  }

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
      resetSuggestions()
    }
  }, [])

  const commitSuggestions = () => {
    const textarea = document.getElementById('textbox')

    if (textarea?.firstChild) {
      textarea.firstChild.textContent = textarea.innerText
      caretToLast(textarea)
    }
  }

  const handleSuggestions = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      commitSuggestions()
    }

    resetSuggestions()
  }

  useEffect(() => {
    if (suggestions) {
      addEventListener('keydown', handleSuggestions)
      addEventListener('click', resetSuggestions)
    }

    return () => {
      removeEventListener('keydown', handleSuggestions)
      removeEventListener('click', resetSuggestions)
    }
  }, [suggestions])

  return (
    <main className="min-h-[100dvh] flex flex-col items-center justify-center">
      <div
        contentEditable
        suppressContentEditableWarning={true}
        id="textbox"
        role="textbox"
        aria-label="プロフィールを入力"
        onInput={handleInputValue}
        className="w-96 h-48 outline p-4 mt-4"
      >
        <span className="text-gray-400" aria-live="polite">
          {suggestions}
        </span>
      </div>
    </main>
  )
}

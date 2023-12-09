'use client'

import { FormEvent, useCallback, useRef, useState } from 'react'

export default function Home() {
  const [value, setValue] = useState('')
  const timer = useRef<NodeJS.Timeout | null>(null)

  const handleInputValue = useCallback((e: FormEvent<HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value)

    if (timer.current) {
      clearTimeout(timer.current)
    }

    if ((e.nativeEvent as InputEvent).data) {
      timer.current = setTimeout(() => {
        console.log('fetch')
      }, 1000)
    }
  }, [])

  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center">
      <textarea
        cols={50}
        rows={10}
        value={value}
        onInput={handleInputValue}
        className="outline p-4"
      />
    </main>
  )
}

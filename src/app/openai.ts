'use server'

import OpenAI from 'openai'

const fetchSuggestions = async (query: string) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'gpt-3.5-turbo',
  })

  return chatCompletion.choices[0].message?.content
}

export default fetchSuggestions

'use server'

import OpenAI from 'openai'

const fetchSuggestions = async (text: string) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: `自分自身の自己紹介を書きたいです。「${text}」に続く文節を考えてください。`,
      },
      {
        role: 'user',
        content: `「${text}」は省略し、続きの文節のみを短く完結に返却してください。日本語のみで生成してください。`,
      },
    ],
    model: 'gpt-3.5-turbo',
  })

  const message = chatCompletion.choices[0].message?.content

  if (message && message.startsWith(text)) {
    return message.slice(text.length)
  }

  return message
}

export default fetchSuggestions

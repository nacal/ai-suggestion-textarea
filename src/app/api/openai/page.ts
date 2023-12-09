import OpenAI from 'openai'
import type { NextApiRequest, NextApiResponse } from 'next'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const generateSuggestion = async () => {
  // const chatCompletion = await openai.chat.completions.create({
  //   messages: [{ role: 'user', content: 'Say this is a test' }],
  //   model: 'gpt-3.5-turbo',
  // })
  // return chatCompletion.choices[0].message?.content
  return 'hoge'
}

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req)

  const response = await generateSuggestion()

  return response
}

export default POST

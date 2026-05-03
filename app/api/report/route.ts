import { NextRequest, NextResponse } from 'next/server'
import { getOpenAI, buildSystemPrompt, buildUserPrompt } from '@/lib/openai'
import { FormData } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const formData: FormData = body.formData

    if (!formData) {
      return NextResponse.json({ error: '입력 데이터가 없습니다.' }, { status: 400 })
    }

    const stream = await getOpenAI().chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: buildSystemPrompt() },
        { role: 'user', content: buildUserPrompt(formData) },
      ],
      max_tokens: 2000,
      temperature: 0.8,
      stream: true,
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || ''
          if (text) {
            controller.enqueue(encoder.encode(text))
          }
        }
        controller.close()
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    })
  } catch (error) {
    console.error('GPT API Error:', error)
    return NextResponse.json(
      { error: '리포트 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

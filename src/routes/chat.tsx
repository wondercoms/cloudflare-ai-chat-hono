import { Hono } from 'hono'
import { streamText } from 'hono/streaming'
import type { HonoEnv } from '../types'
import { escapeHtml } from '../lib/utils'

const app = new Hono<HonoEnv>()

app.post('/', async (c) => {
  const { message } = await c.req.parseBody()

  if (typeof message !== 'string' || !message.trim()) {
    return c.html(<div class="text-red-500">メッセージを入力してください</div>)
  }

  const timestamp = Date.now()

  return streamText(c, async (stream) => {
    // ユーザーのメッセージを表示
    await stream.write(`
      <div class="mb-4">
        <div class="flex justify-end">
          <div class="chat-bubble chat-bubble-user">
            ${escapeHtml(message)}
          </div>
        </div>
      </div>
    `)

    // AIの応答を開始
    await stream.write(`
      <div class="mb-4">
        <div class="flex justify-start">
          <div class="chat-bubble chat-bubble-ai">
            <span id="ai-response-${timestamp}">`)

    try {
      // Workers AI でテキスト生成（ストリーミング）
      const aiStream = await c.env.AI.run(
        '@cf/meta/llama-3.1-8b-instruct',
        {
          messages: [
            {
              role: 'system',
              content: 'あなたは親切なAIアシスタントです。日本語で簡潔に回答してください。'
            },
            { role: 'user', content: message }
          ],
          stream: true,
        }
      )

      // ストリーミングレスポンスを処理
      const reader = (aiStream as ReadableStream).getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const text = decoder.decode(value)
        const lines = text.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue
            try {
              const parsed = JSON.parse(data)
              if (parsed.response) {
                await stream.write(escapeHtml(parsed.response))
              }
            } catch {
              // JSONパースエラーは無視
            }
          }
        }
      }
    } catch (error) {
      console.error('AI Error:', error)
      await stream.write('エラーが発生しました。')
    }

    // AIの応答を閉じる
    await stream.write(`
            </span>
          </div>
        </div>
      </div>
    `)
  })
})

export default app

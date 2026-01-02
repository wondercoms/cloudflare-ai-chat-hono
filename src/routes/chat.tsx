import { Hono } from 'hono'
import type { HonoEnv } from '../types'

const app = new Hono<HonoEnv>()

app.post('/', async (c) => {
  const { message } = await c.req.parseBody()

  if (typeof message !== 'string' || !message.trim()) {
    return c.html(<div class="text-red-500">メッセージを入力してください</div>)
  }

  try {
    // Workers AI でテキスト生成（非ストリーミング）
    const result = await c.env.AI.run(
      '@cf/meta/llama-3.1-8b-instruct' as keyof AiModels,
      {
        messages: [
          { role: 'user', content: message }
        ],
      }
    )

    const response = (result as { response?: string }).response ?? 'エラーが発生しました'

    return c.html(
      <div>
        <div class="mb-4">
          <div class="flex justify-end">
            <div class="chat-bubble chat-bubble-user">
              {message}
            </div>
          </div>
        </div>
        <div class="mb-4">
          <div class="flex justify-start">
            <div class="chat-bubble chat-bubble-ai">
              {response}
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('AI Error:', error)
    return c.html(
      <div>
        <div class="mb-4">
          <div class="flex justify-end">
            <div class="chat-bubble chat-bubble-user">
              {message}
            </div>
          </div>
        </div>
        <div class="mb-4">
          <div class="flex justify-start">
            <div class="chat-bubble chat-bubble-ai text-red-500">
              エラーが発生しました
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default app

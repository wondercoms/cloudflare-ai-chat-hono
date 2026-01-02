import { Hono } from 'hono'
import type { HonoEnv } from './types'
import { homeRoutes, chatRoutes } from './routes'

const app = new Hono<HonoEnv>()

// エラーハンドリング
app.onError((err, c) => {
  console.error('Error:', err)
  return c.html(
    <div class="text-red-500 p-4">エラーが発生しました: {err.message}</div>,
    500
  )
})

// ルートのマウント
app.route('/', homeRoutes)
app.route('/chat', chatRoutes)

export default app

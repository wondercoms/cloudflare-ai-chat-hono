import { Hono } from 'hono'
import type { HonoEnv } from '../types'
import { ChatPage } from '../views/chat-page'

const app = new Hono<HonoEnv>()

app.get('/', (c) => {
  return c.html(<ChatPage />)
})

export default app

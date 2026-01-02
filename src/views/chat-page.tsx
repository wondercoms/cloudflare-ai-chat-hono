import type { FC } from 'hono/jsx'
import { Layout } from './layout'

export const ChatPage: FC = () => {
  return (
    <Layout title="Workers AI Chat">
      <div class="container mx-auto max-w-2xl p-4">
        <h1 class="text-2xl font-bold text-center mb-6">Workers AI Chat</h1>

        {/* チャット履歴 */}
        <div
          id="chat-history"
          class="bg-white rounded-lg shadow p-4 mb-4 h-96 overflow-y-auto"
        >
          <p class="text-gray-500 text-center">メッセージを入力してください</p>
        </div>

        {/* 入力フォーム */}
        <form
          hx-post="/chat"
          hx-target="#chat-history"
          hx-swap="beforeend"
          hx-on--after-request="this.reset(); document.getElementById('chat-history').scrollTop = document.getElementById('chat-history').scrollHeight;"
          class="flex gap-2"
        >
          <input
            type="text"
            name="message"
            placeholder="メッセージを入力..."
            required
            autocomplete="off"
            class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            送信
          </button>
        </form>
      </div>
    </Layout>
  )
}

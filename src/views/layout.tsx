import type { FC, PropsWithChildren } from 'hono/jsx'

type LayoutProps = PropsWithChildren<{
  title?: string
}>

export const Layout: FC<LayoutProps> = ({ children, title = 'Workers AI Chat' }) => {
  return (
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link rel="stylesheet" href="/static/styles.css" />
        <script src="/static/htmx.min.js"></script>
      </head>
      <body class="bg-gray-100 min-h-screen">
        {children}
      </body>
    </html>
  )
}

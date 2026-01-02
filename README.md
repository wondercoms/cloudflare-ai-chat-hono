# Workers AI Chat

Cloudflare Workers AI を使用したチャットアプリケーションです。Hono + htmx + Tailwind CSS で構築されています。

## 必要な環境

- Node.js 18以上
- Cloudflare アカウント

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Cloudflare にログイン

```bash
npx wrangler login
```

ブラウザが開くので、Cloudflare アカウントで認証してください。

## 開発

### ローカル開発サーバーの起動

Workers AI を使用するため、Wrangler のローカルサーバーを使用します：

```bash
npm run build && npm run preview
```

http://localhost:8788 でアクセスできます。

### Vite 開発サーバー（AI機能なし）

UI の開発のみの場合：

```bash
npm run dev
```

http://localhost:5173 でアクセスできます。
（注意：Workers AI は動作しません）

## デプロイ

Cloudflare Pages にデプロイ：

```bash
npm run deploy
```

## スクリプト一覧

| コマンド | 説明 |
|---------|------|
| `npm run dev` | Vite 開発サーバー起動 |
| `npm run build` | プロダクションビルド |
| `npm run build:css` | Tailwind CSS ビルド |
| `npm run preview` | Wrangler ローカルサーバー起動 |
| `npm run deploy` | Cloudflare Pages にデプロイ |
| `npm run cf-typegen` | Cloudflare 型定義の生成 |

## プロジェクト構成

```
workers-ai-chat/
├── src/
│   ├── index.tsx          # エントリーポイント
│   ├── types.ts           # 型定義
│   ├── routes/
│   │   ├── index.ts       # ルートエクスポート
│   │   ├── home.tsx       # トップページ
│   │   └── chat.tsx       # チャットAPI
│   ├── views/
│   │   ├── layout.tsx     # 共通レイアウト
│   │   └── chat-page.tsx  # チャットページUI
│   ├── lib/
│   │   └── utils.ts       # ユーティリティ関数
│   └── styles/
│       └── globals.css    # Tailwind CSS
├── public/
│   └── static/            # 静的ファイル
├── wrangler.jsonc         # Cloudflare 設定
├── vite.config.ts         # Vite 設定
├── tailwind.config.js     # Tailwind 設定
└── package.json
```

## 技術スタック

- [Hono](https://hono.dev/) - Web フレームワーク
- [htmx](https://htmx.org/) - HTML拡張
- [Tailwind CSS](https://tailwindcss.com/) - CSSフレームワーク
- [Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/) - AI モデル
- [Cloudflare Pages](https://pages.cloudflare.com/) - ホスティング

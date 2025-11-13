# senjin 実装ガイド（フロント先行版）

## 🚀 タスク1: Next.jsプロジェクト初期化とGit設定

### ステップ1: プロジェクト作成

ターミナルで以下を実行：

```bash
# senjinディレクトリに移動
cd /Users/saway/ZEAMI/senjin

# Next.jsプロジェクト作成
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"

# 質問に以下のように答える：
# ✔ Would you like to use ESLint? → Yes
# ✔ Would you like to use Turbopack? → No
# ✔ Would you like to customize the import alias? → No (already set to @/*)
```

### ステップ2: 依存関係インストール

```bash
# 必要なパッケージをインストール
pnpm install framer-motion zustand zod @supabase/supabase-js @supabase/ssr

# 開発用パッケージ
pnpm install -D prettier eslint-config-prettier

# shadcn/ui初期化
npx shadcn@latest init

# shadcn/uiの質問に答える：
# ✔ Which style would you like to use? → New York
# ✔ Which color would you like to use as base color? → Neutral
# ✔ Do you want to use CSS variables for colors? → Yes
```

### ステップ3: 必要なshadcn/uiコンポーネントをインストール

```bash
# よく使うコンポーネントを一括インストール
npx shadcn@latest add button card input textarea dialog avatar
```

### ステップ4: Gitリポジトリ初期化

```bash
# Gitリポジトリ初期化
git init

# .gitignoreは自動生成されているので確認
cat .gitignore

# 最初のコミット
git add .
git commit -m "feat: initial Next.js project setup"

# GitHubに新しいリポジトリを作成（ブラウザで）
# https://github.com/new
# リポジトリ名: senjin
# Private or Public: お好みで

# GitHubリポジトリと連携
git branch -M main
git remote add origin https://github.com/[あなたのGitHubユーザー名]/senjin.git
git push -u origin main
```

### ステップ5: 開発サーバー起動確認

```bash
# 開発サーバー起動
pnpm dev

# http://localhost:3000 をブラウザで開く
# Next.jsのデフォルトページが表示されればOK！
```

---

## 🎨 タスク2: デザインシステム構築

### ステップ1: Tailwind Config設定

`tailwind.config.ts` を以下のように編集：

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // senjinのカラーパレット
        primary: {
          DEFAULT: '#4A5568',
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#F6AD55',
          foreground: '#2D3748',
        },
        background: {
          DEFAULT: '#FFFBF0',
          card: '#FFFFFF',
        },
        // カテゴリーカラー
        category: {
          path: '#667EEA',
          job: '#F6AD55',
          hunting: '#48BB78',
          desperate: '#FC8181',
        },
      },
      fontFamily: {
        sans: ['"M PLUS Rounded 1c"', '"Noto Sans JP"', 'sans-serif'],
      },
      fontSize: {
        'catchphrase': ['18px', { lineHeight: '1.6', fontWeight: '600' }],
        'story': ['17px', { lineHeight: '2.0', fontWeight: '400' }],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

### ステップ2: グローバルCSS設定

`src/app/globals.css` を編集：

```css
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;500;700;800&family=Noto+Sans+JP:wght@400;500;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 45 100% 97%; /* #FFFBF0 */
    --foreground: 217 33% 17%; /* #2D3748 */

    --card: 0 0% 100%;
    --card-foreground: 217 33% 17%;

    --popover: 0 0% 100%;
    --popover-foreground: 217 33% 17%;

    --primary: 215 25% 27%; /* #4A5568 */
    --primary-foreground: 0 0% 100%;

    --secondary: 215 20% 65%;
    --secondary-foreground: 0 0% 0%;

    --muted: 210 40% 96%;
    --muted-foreground: 215 16% 47%;

    --accent: 28 93% 66%; /* #F6AD55 */
    --accent-foreground: 217 33% 17%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 98%;

    --border: 214 32% 91%;
    --input: 214 32% 91%;
    --ring: 215 25% 27%;

    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

### ステップ3: 動作確認

```bash
# 開発サーバーが起動していることを確認
# http://localhost:3000 をブラウザでリロード
# 背景色が #FFFBF0 (温かみのあるオフホワイト) になっていればOK
```

---

## 🧩 タスク3: 基本コンポーネント作成

### ステップ1: ディレクトリ作成

```bash
mkdir -p src/components/common
mkdir -p src/components/category
mkdir -p src/components/story
mkdir -p src/components/comment
mkdir -p src/lib/data
```

### ステップ2: Headerコンポーネント作成

`src/components/common/Header.tsx`:

```tsx
'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">senjin</span>
        </Link>

        <Button variant="outline" asChild>
          <Link href="/login">ログイン</Link>
        </Button>
      </div>
    </header>
  )
}
```

### ステップ3: モックデータ作成

`src/lib/data/mock.ts`:

```typescript
export type Category = {
  id: string
  name: string
  slug: string
  emoji: string
  description: string
  color: string
}

export type Story = {
  id: string
  categoryId: string
  catchphrase: string
  senjinName: string
  senjinAge: number
  senjinRole: string
  storyContext: string
  storyEmotion: string
  storyDecision: string
  finalMessage: string
  viewCount: number
  archiveCount: number
  commentCount: number
}

export const categories: Category[] = [
  {
    id: '1',
    name: '進路に悩む',
    slug: 'career-path',
    emoji: '🎓',
    description: '進路選択で悩んでいる人へ',
    color: 'category-path',
  },
  {
    id: '2',
    name: '転職・退職に悩む',
    slug: 'job-change',
    emoji: '💼',
    description: '転職や退職を考えている人へ',
    color: 'category-job',
  },
  {
    id: '3',
    name: '就活に悩む',
    slug: 'job-hunting',
    emoji: '👔',
    description: '就職活動で悩んでいる人へ',
    color: 'category-hunting',
  },
  {
    id: '4',
    name: 'もう詰んだ…',
    slug: 'desperate',
    emoji: '🌧️',
    description: '困難な状況に直面している人へ',
    color: 'category-desperate',
  },
]

export const stories: Story[] = [
  {
    id: '1',
    categoryId: '1',
    catchphrase: '美大に行くか、就職するか。親との対立を乗り越えて見つけた答え',
    senjinName: 'デザイナー・田中さん',
    senjinAge: 18,
    senjinRole: 'UXデザイナー（大手IT企業）',
    storyContext: '高3の秋、美大進学を希望していたが、親は安定した企業への就職を望んでいた。周りの友人は次々と進路を決めていく中、一人だけ取り残された気分だった。',
    storyEmotion: '不安と焦り。親との口論も増え、毎晩泣いていた。でも、絵を描いている時だけは心が落ち着いた。',
    storyDecision: '先生に相談したことがきっかけ。「好きなことで生きていける保証はないけど、好きじゃないことで一生を過ごすのは辛いよ」という言葉が背中を押してくれた。',
    finalMessage: '悩んでいる時間も、あなたの人生の一部。焦らなくていい。あなたの心が本当に望むものは何か、静かに耳を傾けてみて。',
    viewCount: 456,
    archiveCount: 45,
    commentCount: 12,
  },
  {
    id: '2',
    categoryId: '1',
    catchphrase: '理系から文系へ。周りの反対を押し切って進んだ道',
    senjinName: 'ライター・佐藤さん',
    senjinAge: 19,
    senjinRole: 'フリーランスライター',
    storyContext: '理系学部に在籍していたが、文章を書くことに情熱を感じ、文系への転部を決意。教授や友人からは「もったいない」と言われた。',
    storyEmotion: '孤独感と自己否定。本当にこの道でいいのか、毎日自問自答していた。',
    storyDecision: '自分の書いた文章で誰かが笑顔になった瞬間を見て、「これだ」と確信した。',
    finalMessage: '周りの期待に応えることも大切。でも、自分の心に嘘をつくことの方が、もっと辛い。',
    viewCount: 234,
    archiveCount: 28,
    commentCount: 8,
  },
  {
    id: '3',
    categoryId: '2',
    catchphrase: '5年勤めた会社を辞めた日。後悔と安堵が入り混じった複雑な気持ち',
    senjinName: 'エンジニア・鈴木さん',
    senjinAge: 28,
    senjinRole: 'フリーランスエンジニア',
    storyContext: '新卒で入社した会社で5年間勤務。仕事は安定していたが、毎朝起きるのが辛くなっていた。',
    storyEmotion: '罪悪感と恐怖。辞めることは「逃げ」なのではないかと悩んだ。',
    storyDecision: '体調を崩したことがきっかけ。自分の健康より大切な仕事はないと気づいた。',
    finalMessage: '辞めることは逃げじゃない。次の一歩を踏み出すための勇気だよ。',
    viewCount: 789,
    archiveCount: 92,
    commentCount: 34,
  },
]
```

---

## 🏠 タスク4: トップページ実装

### ステップ1: トップページコンポーネント

`src/app/page.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { categories } from '@/lib/data/mock'
import { Header } from '@/components/common/Header'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="container py-12 md:py-20">
        {/* ロゴとメインメッセージ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            senjin
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            あなたの悩みを<br className="md:hidden" />選んでください
          </p>
        </motion.div>

        {/* カテゴリーカード */}
        <div className="max-w-md mx-auto space-y-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link
                href={`/categories/${category.slug}`}
                className="block"
              >
                <div className="bg-card rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-border">
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl">{category.emoji}</span>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}
```

### ステップ2: 動作確認

```bash
# http://localhost:3000 をブラウザで開く
# 4つのカテゴリーカードが順番にアニメーションで表示されることを確認
# カードにホバーすると浮き上がることを確認
```

---

## 📱 次のステップ

ここまで完成したら、次は**タスク5: 先人の声一覧ページ**に進みます。

一覧ページの実装手順は次のメッセージで送ります！

---

**進捗の報告**

完成したタスクは私に報告してください：
- 「タスク1完了しました！」
- 「トップページができました！スクリーンショット見ますか？」

エラーが出たら、エラーメッセージをそのまま教えてください。一緒に解決しましょう！

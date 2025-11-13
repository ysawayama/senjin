'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Header } from '@/components/common/Header'
import { StoryCard } from '@/components/story/StoryCard'
import { getCategoryBySlug, getStoriesByCategory } from '@/lib/data/mock'
import { Button } from '@/components/ui/button'

export default function CategoryPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const category = getCategoryBySlug(slug)

  if (!category) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto max-w-3xl px-4 py-12">
          <p className="text-center text-muted-foreground">
            カテゴリーが見つかりませんでした
          </p>
        </main>
      </div>
    )
  }

  const stories = getStoriesByCategory(category.id)

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto max-w-3xl px-4 py-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            戻る
          </Button>

          <div className="text-center">
            <div className="mb-2 text-5xl">{category.emoji}</div>
            <h1 className="mb-2 text-3xl font-bold text-primary">
              {category.name}
            </h1>
            <p className="text-muted-foreground">{category.description}</p>
          </div>
        </div>

        {/* メッセージ */}
        <div className="mb-8 text-center">
          <p className="text-lg text-foreground">
            先輩たちの声
          </p>
          <p className="text-sm text-muted-foreground">
            あなたに届きますように
          </p>
        </div>

        {/* ストーリーリスト */}
        <div className="space-y-4">
          {stories.length === 0 ? (
            <p className="text-center text-muted-foreground">
              まだ先人の声が登録されていません
            </p>
          ) : (
            stories.map((story, index) => (
              <StoryCard key={story.id} story={story} index={index} />
            ))
          )}
        </div>
      </main>
    </div>
  )
}

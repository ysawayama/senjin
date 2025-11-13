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

      <main className="content-spacing">
        {/* ヘッダー */}
        <div className="container mx-auto max-w-4xl px-6">
          <Button
            variant="ghost"
            size="sm"
            className="mb-8 hover:translate-x-[-4px] transition-transform"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            戻る
          </Button>

          <div className="mb-16 text-center">
            <h1 className="text-section-title mb-6">
              {category.name}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {category.description}
            </p>
          </div>

          {/* セクション区切り */}
          <div className="mb-16 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* メッセージ */}
        <div className="container mx-auto mb-12 max-w-4xl px-6 text-center">
          <p className="text-xl font-medium tracking-tight text-foreground md:text-2xl">
            先輩たちの声
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            あなたに届きますように
          </p>
        </div>

        {/* ストーリーリスト */}
        <div className="container mx-auto max-w-3xl px-6">
          <div className="space-y-8">
            {stories.length === 0 ? (
              <p className="py-12 text-center text-muted-foreground">
                まだ先人の声が登録されていません
              </p>
            ) : (
              stories.map((story, index) => (
                <StoryCard key={story.id} story={story} index={index} />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

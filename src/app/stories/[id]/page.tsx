'use client'

import { useParams, useRouter } from 'next/navigation'
import { Header } from '@/components/common/Header'
import { StorySwiper } from '@/components/story/StorySwiper'
import { getStoryById } from '@/lib/data/mock'

export default function StoryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const story = getStoryById(id)

  if (!story) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto max-w-3xl px-4 py-12">
          <p className="text-center text-muted-foreground">
            先人の声が見つかりませんでした
          </p>
        </main>
      </div>
    )
  }

  const handleComplete = () => {
    router.back()
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <StorySwiper story={story} onComplete={handleComplete} />
      </main>
    </div>
  )
}

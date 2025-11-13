'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MessageCircle, Bookmark } from 'lucide-react'
import type { Story } from '@/lib/data/mock'

type StoryCardProps = {
  story: Story
  index: number
}

export function StoryCard({ story, index }: StoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link href={`/stories/${story.id}`} className="block">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
          {/* 先人情報 */}
          <div className="mb-3 flex items-center space-x-2">
            <span className="text-sm font-medium text-primary">
              {story.senjinName}
            </span>
            <span className="text-xs text-muted-foreground">
              {story.senjinAge}歳
            </span>
          </div>

          {/* キャッチコピー */}
          <h3 className="mb-4 text-catchphrase text-foreground">
            {story.catchphrase}
          </h3>

          {/* 統計情報 */}
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>{story.commentCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Bookmark className="h-4 w-4" />
              <span>{story.archiveCount}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

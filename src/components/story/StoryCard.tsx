'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MessageCircle, Bookmark, ArrowRight } from 'lucide-react'
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
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/stories/${story.id}`} className="group block">
        <motion.div
          whileHover={{ scale: 1.005 }}
          className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-foreground hover:shadow-xl"
        >
          {/* 先人情報 */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-semibold text-foreground">
                {story.senjinName}
              </span>
              <span className="text-xs text-muted-foreground">
                {story.senjinAge}歳
              </span>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
          </div>

          {/* キャッチコピー */}
          <h3 className="mb-6 text-catchphrase leading-snug text-foreground transition-colors duration-300 group-hover:text-primary">
            {story.catchphrase}
          </h3>

          {/* 統計情報 */}
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span className="font-medium">{story.commentCount}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Bookmark className="h-4 w-4" />
              <span className="font-medium">{story.archiveCount}</span>
            </div>
          </div>

          {/* ボトムライン */}
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
        </motion.div>
      </Link>
    </motion.div>
  )
}

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { Story } from '@/lib/data/mock'

type StorySwiperProps = {
  story: Story
  onComplete: () => void
}

export function StorySwiper({ story, onComplete }: StorySwiperProps) {
  const [currentPage, setCurrentPage] = useState(0)

  // ページ構成
  const pages = [
    {
      type: 'intro',
      content: {
        name: story.senjinName,
        age: story.senjinAge,
        role: story.senjinRole,
        catchphrase: story.catchphrase,
      },
    },
    {
      type: 'context',
      title: 'あの時、こんな状況でした',
      content: story.storyContext,
    },
    {
      type: 'emotion',
      title: 'あの時の気持ち',
      content: story.storyEmotion,
    },
    {
      type: 'decision',
      title: '転機が訪れた',
      content: story.storyDecision,
    },
    {
      type: 'final',
      title: '',
      content: story.finalMessage,
      name: story.senjinName,
    },
    {
      type: 'action',
      content: null,
    },
  ]

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1)
    } else {
      onComplete()
    }
  }

  const currentPageData = pages[currentPage]

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* ページインジケーター */}
      <div className="flex justify-center space-x-2 py-4">
        {pages.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === currentPage
                ? 'bg-accent'
                : index < currentPage
                ? 'bg-muted'
                : 'bg-muted-foreground/20'
            }`}
          />
        ))}
      </div>

      {/* ページコンテンツ */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex h-full items-center justify-center px-6"
          >
            {/* 導入ページ */}
            {currentPageData.type === 'intro' && (
              <div className="max-w-md text-center">
                <p className="mb-2 text-sm font-medium text-primary">
                  {currentPageData.content.name}
                </p>
                <p className="mb-6 text-xs text-muted-foreground">
                  {currentPageData.content.age}歳 ・{' '}
                  {currentPageData.content.role}
                </p>
                <h2 className="text-catchphrase mb-8 text-foreground">
                  {currentPageData.content.catchphrase}
                </h2>
              </div>
            )}

            {/* 本文ページ */}
            {(currentPageData.type === 'context' ||
              currentPageData.type === 'emotion' ||
              currentPageData.type === 'decision') && (
              <div className="max-w-md">
                <h3 className="mb-6 text-center text-lg font-bold text-primary">
                  {currentPageData.title}
                </h3>
                <p className="text-story whitespace-pre-wrap text-foreground">
                  {currentPageData.content}
                </p>
              </div>
            )}

            {/* ひとことページ */}
            {currentPageData.type === 'final' && (
              <div className="max-w-md text-center">
                <p className="text-story mb-8 whitespace-pre-wrap text-foreground">
                  {currentPageData.content}
                </p>
                <p className="text-sm text-muted-foreground">
                  ─ {currentPageData.name}より
                </p>
              </div>
            )}

            {/* アクションページ */}
            {currentPageData.type === 'action' && (
              <div className="max-w-md text-center">
                <p className="mb-8 text-lg text-foreground">
                  この声は、あなたの
                  <br />
                  心に響きましたか？
                </p>
                <div className="space-y-4">
                  <button className="w-full rounded-xl bg-accent px-6 py-4 font-semibold text-accent-foreground transition-all hover:opacity-90">
                    📖 勇気ブックに保存
                  </button>
                  <button className="w-full rounded-xl border border-border bg-card px-6 py-4 font-semibold text-foreground transition-all hover:bg-muted">
                    💬 コメントを残す
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 次へボタン */}
      <div className="flex justify-center pb-8">
        <button
          onClick={handleNext}
          className="flex flex-col items-center space-y-1 text-muted-foreground transition-colors hover:text-primary"
          aria-label="次のページへ"
        >
          <ChevronDown className="h-6 w-6 animate-bounce" />
          <span className="text-xs">
            {currentPage < pages.length - 1 ? '次へ' : '完了'}
          </span>
        </button>
      </div>
    </div>
  )
}

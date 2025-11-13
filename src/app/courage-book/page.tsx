'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Trash2 } from 'lucide-react'
import { Header } from '@/components/common/Header'
import { getCourageBookWithStory } from '@/lib/data/mock'
import { Button } from '@/components/ui/button'

export default function CourageBookPage() {
  // モックユーザーIDでデータ取得
  const [savedStories, setSavedStories] = useState(
    getCourageBookWithStory('mock-user-1')
  )

  const handleDelete = (bookId: string) => {
    setSavedStories((prev) => prev.filter((book) => book.id !== bookId))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container py-8 md:py-12">
        {/* ヘッダー */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            戻る
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-2">
              <BookOpen className="w-8 h-8 text-accent mr-2" />
              <h1 className="text-3xl md:text-4xl font-bold text-primary">
                勇気ブック
              </h1>
            </div>
            <p className="text-muted-foreground">
              あなたが保存した先輩たちの声
            </p>
          </motion.div>
        </div>

        {/* 勇気ブック一覧 */}
        {savedStories.length === 0 ? (
          // 空の状態
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <BookOpen className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              まだ保存されている声はありません
            </p>
            <Button asChild>
              <Link href="/">先輩たちの声を探す</Link>
            </Button>
          </motion.div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-4">
            <AnimatePresence mode="popLayout">
              {savedStories.map((book, index) => {
                const story = book.story
                if (!story) return null

                return (
                  <motion.div
                    key={book.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.3,
                    }}
                    className="relative group"
                  >
                    {/* メインカード */}
                    <Link
                      href={`/stories/${story.id}`}
                      className="block bg-card rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-border"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <BookOpen className="w-5 h-5 text-accent" />
                          <span className="text-sm font-medium text-accent">
                            保存済み
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(book.createdAt)}
                        </span>
                      </div>

                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-primary mb-2 leading-relaxed">
                          {story.finalMessage}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="text-sm text-muted-foreground">
                          ─ {story.senjinName}
                        </div>
                      </div>
                    </Link>

                    {/* 削除ボタン */}
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.preventDefault()
                        handleDelete(book.id)
                      }}
                      className="absolute top-4 right-4 bg-destructive/10 hover:bg-destructive/20 text-destructive p-2 rounded-lg transition-colors z-10"
                      aria-label="削除"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}

        {/* 統計情報 */}
        {savedStories.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12 text-sm text-muted-foreground"
          >
            合計 {savedStories.length} 件の声を保存しています
          </motion.div>
        )}
      </main>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Send, Lightbulb } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

type CommentModalProps = {
  isOpen: boolean
  onClose: () => void
  storyId: string
  senjinName: string
}

export function CommentModal({
  isOpen,
  onClose,
  storyId,
  senjinName,
}: CommentModalProps) {
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const maxLength = 200
  const remainingChars = maxLength - comment.length

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (comment.trim().length === 0) return
    if (comment.length > maxLength) return

    setIsSubmitting(true)

    // TODO: 実際のAPI接続時にSupabaseに保存
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSubmitted(true)
    setIsSubmitting(false)

    // 成功メッセージを表示してからモーダルを閉じる
    setTimeout(() => {
      setComment('')
      setSubmitted(false)
      onClose()
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                {senjinName}の声へのコメント
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Textarea
                  placeholder="あなたの感想や励ましの言葉を入力してください..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  maxLength={maxLength}
                  rows={6}
                  className="resize-none"
                  disabled={isSubmitting}
                />
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span
                    className={`${
                      remainingChars < 20
                        ? 'text-destructive'
                        : 'text-muted-foreground'
                    }`}
                  >
                    残り {remainingChars} 文字
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-2 rounded-lg bg-muted p-3">
                <Lightbulb className="h-5 w-5 flex-shrink-0 text-accent" />
                <p className="text-sm text-muted-foreground">
                  ポジティブで思いやりのあるコメントをお願いします。
                  <br />
                  誰かの勇気になる言葉を届けましょう。
                </p>
              </div>

              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  キャンセル
                </Button>
                <Button
                  type="submit"
                  disabled={
                    isSubmitting || comment.trim().length === 0 || comment.length > maxLength
                  }
                  className="flex-1"
                >
                  {isSubmitting ? (
                    '投稿中...'
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      投稿する
                    </>
                  )}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-8 text-center"
          >
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <Send className="h-8 w-8 text-accent" />
              </div>
            </div>
            <h3 className="mb-2 text-xl font-bold text-primary">
              コメントを投稿しました！
            </h3>
            <p className="text-sm text-muted-foreground">
              あなたの言葉が誰かの勇気になります
            </p>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  )
}

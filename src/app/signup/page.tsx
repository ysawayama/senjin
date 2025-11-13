'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Mail, Lock, User } from 'lucide-react'
import { Header } from '@/components/common/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('パスワードが一致しません')
      return
    }

    if (password.length < 8) {
      alert('パスワードは8文字以上で設定してください')
      return
    }

    setIsLoading(true)

    // TODO: 実際のAPI接続時にSupabase Authを使用
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    // モックサインアップ成功後、トップページへ
    router.push('/')
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container py-8 md:py-12">
        <div className="mx-auto max-w-md">
          <Link
            href="/"
            className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            戻る
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-bold text-primary">
                新規登録
              </h1>
              <p className="text-muted-foreground">
                アカウントを作成して
                <br />
                先輩たちの声を受け取りましょう
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-md">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-foreground"
                  >
                    お名前（ニックネーム）
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="山田太郎"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    メールアドレス
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-foreground"
                  >
                    パスワード
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                      disabled={isLoading}
                      minLength={8}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    8文字以上で設定してください
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-foreground"
                  >
                    パスワード（確認）
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10"
                      required
                      disabled={isLoading}
                      minLength={8}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? '登録中...' : 'アカウント作成'}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">
                  すでにアカウントをお持ちの方は
                </span>{' '}
                <Link
                  href="/login"
                  className="font-medium text-accent hover:underline"
                >
                  ログイン
                </Link>
              </div>
            </div>

            <div className="mt-6 text-center text-xs text-muted-foreground">
              登録することで、
              <Link href="/terms" className="hover:underline">
                利用規約
              </Link>
              と
              <Link href="/privacy" className="hover:underline">
                プライバシーポリシー
              </Link>
              に同意したものとみなされます
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

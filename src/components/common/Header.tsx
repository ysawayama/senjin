'use client'

import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">senjin</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Link
            href="/courage-book"
            className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">勇気ブック</span>
          </Link>

          <Button variant="outline" asChild>
            <Link href="/login">ログイン</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

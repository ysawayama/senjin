'use client'

import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center space-x-2">
          <span className="text-2xl font-bold tracking-tight transition-colors duration-300 group-hover:text-primary">
            senjin
          </span>
        </Link>

        <div className="flex items-center space-x-6">
          <Link
            href="/courage-book"
            className="flex items-center space-x-2 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">勇気ブック</span>
          </Link>

          <Button
            variant="outline"
            asChild
            className="rounded-full border-foreground/20 hover:border-foreground hover:bg-foreground hover:text-background"
          >
            <Link href="/login">ログイン</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

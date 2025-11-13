'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { Category } from '@/lib/data/mock'

type CategoryCardProps = {
  category: Category
  index: number
}

export function CategoryCard({ category, index }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`} className="group block">
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-foreground hover:shadow-lg"
      >
        <div className="relative p-8">
          {/* 番号 */}
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-sm font-medium text-muted-foreground">
              {String(index + 1).padStart(2, '0')}
            </span>
            <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
          </div>

          {/* コンテンツ */}
          <h3 className="mb-3 text-2xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
            {category.name}
          </h3>
          <p className="text-base leading-relaxed text-muted-foreground">
            {category.description}
          </p>

          {/* ボトムライン */}
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
        </div>
      </motion.div>
    </Link>
  )
}
